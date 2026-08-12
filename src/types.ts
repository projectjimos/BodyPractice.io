export type OrganId = 'eye' | 'brain' | 'heart' | 'lungs' | 'skeleton' | 'digestive' | 'ear';

export type EducationDepth = 'elementary' | 'middle' | 'highschool' | 'college';

export interface EssayData {
  overview: string;
  anatomyAndHistology: string;
  physiologyAndMechanisms: string;
  clinicalSignificance: string;
}

export interface AnatomicalPart {
  id: string;
  name: string;
  pronunciation: string;
  category: string;
  description: string;
  functionSummary: string;
  analogy: string;
  clinicalNote?: string;
  funFact: string;
  svgCoords?: { x: number; y: number };
  color: string;
  essay: EssayData;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  funFact?: string;
}

export interface OrganSystem {
  id: OrganId;
  title: string;
  systemName: string;
  subtitle: string;
  accentColor: string;
  bgGradient: string;
  description: string;
  keyFunctions: string[];
  parts: AnatomicalPart[];
  defaultQuiz: QuizQuestion[];
  labControls: {
    title: string;
    description: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AnalogyItem {
  title: string;
  analogy: string;
  whyItWorks: string;
}
