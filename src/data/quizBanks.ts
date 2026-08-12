import { ORGAN_SYSTEMS } from './auditedOrganData';
import { AnatomicalPart, OrganId, OrganSystem, QuizQuestion } from '../types';

type FieldConfig = {
  label: string;
  getValue: (part: AnatomicalPart) => string | undefined;
};

const FIELD_CONFIGS: FieldConfig[] = [
  { label: 'primary function', getValue: (part) => part.functionSummary },
  { label: 'anatomical description', getValue: (part) => part.description },
  { label: 'structural overview', getValue: (part) => part.essay?.overview },
  { label: 'micro-anatomy description', getValue: (part) => part.essay?.anatomyAndHistology },
  { label: 'physiology explanation', getValue: (part) => part.essay?.physiologyAndMechanisms },
  { label: 'clinical significance statement', getValue: (part) => part.essay?.clinicalSignificance },
  { label: 'clinical note', getValue: (part) => part.clinicalNote },
  { label: 'biology fact', getValue: (part) => part.funFact },
];

const INVERSE_PROMPTS = [
  (label: string, value: string) => `Which structure is best identified by this ${label}: “${value}”?`,
  (label: string, value: string) => `A student reads this ${label}. Which structure does it describe? “${value}”`,
  (label: string, value: string) => `Which anatomical label best matches this ${label}: “${value}”?`,
];

const DIRECT_PROMPTS = [
  (label: string, name: string) => `Which ${label} best matches ${name}?`,
  (label: string, name: string) => `What is the correct ${label} for ${name}?`,
  (label: string, name: string) => `Which statement accurately gives the ${label} of ${name}?`,
];

function excerpt(text: string | undefined, maxLength = 220): string {
  if (!text) return '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;

  const sentenceEnd = cleaned.slice(0, maxLength).search(/[.!?](?=\s|$)/);
  if (sentenceEnd > 70) return cleaned.slice(0, sentenceEnd + 1);
  return `${cleaned.slice(0, maxLength - 1).trimEnd()}…`;
}

function stableHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const cleaned = value.trim();
    const key = cleaned.toLowerCase();
    if (!cleaned || seen.has(key)) continue;
    seen.add(key);
    result.push(cleaned);
  }

  return result;
}

function buildOptions(correct: string, distractors: string[], seed: string) {
  const wrongPool = uniqueStrings(distractors).filter(
    (item) => item.toLowerCase() !== correct.toLowerCase(),
  );
  if (wrongPool.length < 3) return null;

  const offset = stableHash(seed) % wrongPool.length;
  const selectedWrong: string[] = [];
  for (let i = 0; selectedWrong.length < 3 && i < wrongPool.length * 2; i += 1) {
    const candidate = wrongPool[(offset + i) % wrongPool.length];
    if (!selectedWrong.includes(candidate)) selectedWrong.push(candidate);
  }
  if (selectedWrong.length < 3) return null;

  const correctAnswerIndex = stableHash(`${seed}-answer`) % 4;
  const options = [...selectedWrong];
  options.splice(correctAnswerIndex, 0, correct);

  return { options, correctAnswerIndex };
}

function makeQuestion(
  question: string,
  correct: string,
  distractors: string[],
  explanation: string,
  seed: string,
): Omit<QuizQuestion, 'id'> | null {
  const optionSet = buildOptions(correct, distractors, seed);
  if (!optionSet) return null;
  return {
    question,
    options: optionSet.options,
    correctAnswerIndex: optionSet.correctAnswerIndex,
    explanation,
  };
}

function buildQuestionBank(system: OrganSystem, allSystems: OrganSystem[]): QuizQuestion[] {
  const candidates: Omit<QuizQuestion, 'id'>[] = [];
  const seenQuestions = new Set<string>();
  const parts = system.parts;

  const add = (question: Omit<QuizQuestion, 'id'> | null) => {
    if (!question) return;
    const key = question.question.replace(/\s+/g, ' ').trim().toLowerCase();
    if (seenQuestions.has(key)) return;
    seenQuestions.add(key);
    candidates.push(question);
  };

  for (let variant = 0; variant < INVERSE_PROMPTS.length; variant += 1) {
    for (const field of FIELD_CONFIGS) {
      for (const part of parts) {
        const value = excerpt(field.getValue(part));
        if (!value) continue;

        add(
          makeQuestion(
            INVERSE_PROMPTS[variant](field.label, value),
            part.name,
            parts.filter((other) => other.id !== part.id).map((other) => other.name),
            `This ${field.label} matches ${part.name}. ${value}`,
            `${system.id}-${variant}-${field.label}-${part.id}-inverse`,
          ),
        );
      }

      for (const part of parts) {
        const value = excerpt(field.getValue(part));
        if (!value) continue;

        const distractors = parts
          .filter((other) => other.id !== part.id)
          .map((other) => excerpt(field.getValue(other)))
          .filter(Boolean);

        add(
          makeQuestion(
            DIRECT_PROMPTS[variant](field.label, part.name),
            value,
            distractors,
            `${part.name}: ${value}`,
            `${system.id}-${variant}-${field.label}-${part.id}-direct`,
          ),
        );
      }
    }
  }

  // System-level fallback questions ensure every bank reaches 100 even if a future
  // system contains very few structures or sparse reference fields.
  const otherSystems = allSystems.filter((other) => other.id !== system.id);
  for (let round = 0; candidates.length < 100 && round < 8; round += 1) {
    system.keyFunctions.forEach((keyFunction, index) => {
      const distractors = otherSystems.flatMap((other) => other.keyFunctions);
      add(
        makeQuestion(
          `Which function is associated with ${system.title}? (${round + 1}.${index + 1})`,
          keyFunction,
          distractors,
          `${system.title} includes this key function: ${keyFunction}`,
          `${system.id}-system-function-${round}-${index}`,
        ),
      );

      add(
        makeQuestion(
          `Which body system is most directly associated with this listed function: “${keyFunction}”? (${round + 1}.${index + 1})`,
          system.title,
          otherSystems.map((other) => other.title),
          `The listed function belongs to ${system.title}.`,
          `${system.id}-system-inverse-${round}-${index}`,
        ),
      );
    });
  }

  if (candidates.length < 100) {
    throw new Error(
      `Unable to build 100 quiz questions for ${system.id}; generated ${candidates.length}.`,
    );
  }

  return candidates.slice(0, 100).map((question, index) => ({
    ...question,
    id: `q-${system.id}-${String(index + 1).padStart(3, '0')}`,
  }));
}

const systems = Object.values(ORGAN_SYSTEMS) as OrganSystem[];

export const QUIZ_BANKS = Object.fromEntries(
  systems.map((system) => [system.id, buildQuestionBank(system, systems)]),
) as Record<OrganId, QuizQuestion[]>;
