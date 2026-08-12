import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, HelpCircle, Sparkles, RefreshCw, ArrowRight, Trophy } from 'lucide-react';
import { OrganSystem, QuizQuestion } from '../types';

interface QuizSectionProps {
  organSystem: OrganSystem;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ organSystem }) => {
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>(organSystem.defaultQuiz);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Custom AI Quiz Generation states
  const [customTopic, setCustomTopic] = useState('');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const currentQuestion = activeQuiz[currentQuestionIdx];

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < activeQuiz.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setActiveQuiz(organSystem.defaultQuiz);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleGenerateCustomQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setIsGeneratingQuiz(true);
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: customTopic, difficulty: 'Medium' })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setActiveQuiz(data.questions);
        setCurrentQuestionIdx(0);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setScore(0);
        setQuizCompleted(false);
      }
    } catch (err) {
      console.error('Failed to generate AI quiz', err);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" /> Anatomy Mastery Quiz
          </span>
          <h2 className="text-2xl font-bold text-white mt-0.5">
            Test Your Knowledge: {organSystem.title}
          </h2>
        </div>

        {/* Custom AI Quiz Form */}
        <form onSubmit={handleGenerateCustomQuiz} className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder={`e.g. "Brain Synapses" or "${organSystem.title}"`}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-full md:w-56"
          />
          <button
            type="submit"
            disabled={isGeneratingQuiz || !customTopic.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all"
          >
            {isGeneratingQuiz ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            AI Quiz
          </button>
        </form>
      </div>

      {/* QUIZ COMPLETED VIEW */}
      {quizCompleted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-amber-400 shadow-xl">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-3xl font-extrabold text-white">Quiz Completed!</h3>
          <p className="text-sm text-slate-300">
            You scored <strong className="text-purple-400 text-lg">{score}</strong> out of <strong className="text-white text-lg">{activeQuiz.length}</strong> questions correct!
          </p>

          <div className="w-full max-w-xs bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-1000"
              style={{ width: `${(score / activeQuiz.length) * 100}%` }}
            />
          </div>

          <button
            onClick={handleResetQuiz}
            className="mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Retake Quiz or Reset
          </button>
        </div>
      ) : (
        /* ACTIVE QUESTION CARD */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Question {currentQuestionIdx + 1} of {activeQuiz.length}</span>
            <span>Score: <strong className="text-purple-400">{score}</strong></span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-purple-500 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-lg font-bold text-white leading-snug">
            {currentQuestion?.question}
          </h3>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {currentQuestion?.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;

              let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-100';
                }
              } else if (isSelected) {
                optionStyle = 'bg-purple-900/60 border-purple-500 text-white font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </span>

                  {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Submit */}
          {isAnswerSubmitted && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2 animate-fadeIn">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-400" /> Explanation:
              </div>
              <p className="leading-relaxed">{currentQuestion.explanation}</p>
              {currentQuestion.funFact && (
                <p className="text-cyan-300 italic pt-1 border-t border-slate-800">
                  💡 Bio Fact: {currentQuestion.funFact}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-lg transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-lg flex items-center gap-2 transition-all"
              >
                {currentQuestionIdx + 1 === activeQuiz.length ? 'Finish Quiz' : 'Next Question'} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
