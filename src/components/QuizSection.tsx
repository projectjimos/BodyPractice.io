import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, ArrowRight, Trophy } from 'lucide-react';
import { OrganSystem } from '../types';
import { QUIZ_BANKS } from '../data/quizBanks';

interface QuizSectionProps {
  organSystem: OrganSystem;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ organSystem }) => {
  const activeQuiz = QUIZ_BANKS[organSystem.id];
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = activeQuiz[currentQuestionIdx];

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  useEffect(() => {
    resetQuiz();
  }, [organSystem.id]);

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

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" /> 100-Question Anatomy Mastery Bank
          </span>
          <h2 className="text-2xl font-bold text-white mt-0.5">Test Your Knowledge: {organSystem.title}</h2>
          <p className="text-xs text-slate-400 mt-1">
            100 fixed questions built from the site's medically audited learning content. No AI generation.
          </p>
        </div>

        <button
          onClick={resetQuiz}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Restart 100 Questions
        </button>
      </div>

      {quizCompleted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-amber-400 shadow-xl">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-3xl font-extrabold text-white">Quiz Completed!</h3>
          <p className="text-sm text-slate-300">
            You scored <strong className="text-purple-400 text-lg">{score}</strong> out of <strong className="text-white text-lg">{activeQuiz.length}</strong> questions correct.
          </p>

          <div className="w-full max-w-xs bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-1000"
              style={{ width: `${(score / activeQuiz.length) * 100}%` }}
            />
          </div>

          <button
            onClick={resetQuiz}
            className="mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Retake 100 Questions
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-5">
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

          <h3 className="text-lg font-bold text-white leading-snug">{currentQuestion.question}</h3>

          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, idx) => {
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

          {isAnswerSubmitted && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2 animate-fadeIn">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-400" /> Explanation:
              </div>
              <p className="leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}

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
