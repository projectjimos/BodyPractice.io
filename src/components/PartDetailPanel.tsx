import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Stethoscope, Lightbulb, X, MessageSquare, RefreshCw, GraduationCap, Microscope, Dna, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { AnatomicalPart, AnalogyItem } from '../types';

interface PartDetailPanelProps {
  part: AnatomicalPart | null;
  onClose: () => void;
  onAskBioBot: (question: string) => void;
}

export const PartDetailPanel: React.FC<PartDetailPanelProps> = ({
  part,
  onClose,
  onAskBioBot,
}) => {
  const [analogies, setAnalogies] = useState<AnalogyItem[] | null>(null);
  const [isLoadingAnalogy, setIsLoadingAnalogy] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeEssayTab, setActiveEssayTab] = useState<'overview' | 'anatomy' | 'physiology' | 'clinical'>('overview');
  const [isEssayExpanded, setIsEssayExpanded] = useState(true);

  if (!part) return null;

  // Speak medical term pronunciation via Web Speech API
  const handleSpeakPronunciation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(part.name);
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Fetch AI generated analogies
  const handleGenerateAnalogy = async () => {
    setIsLoadingAnalogy(true);
    try {
      const res = await fetch('/api/explain/analogy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structureName: part.name,
          functionDescription: part.functionSummary
        })
      });
      const data = await res.json();
      if (data.analogies) {
        setAnalogies(data.analogies);
      }
    } catch (err) {
      console.error('Failed to generate analogy', err);
    } finally {
      setIsLoadingAnalogy(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100 max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-800 pb-3">
        <div>
          <span 
            className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border mb-1 inline-block"
            style={{ color: part.color, borderColor: `${part.color}40`, backgroundColor: `${part.color}15` }}
          >
            {part.category}
          </span>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {part.name}
          </h2>
          {/* Pronunciation */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-400 font-mono">
              Pronounced: <strong className="text-cyan-400">"{part.pronunciation}"</strong>
            </span>
            <button
              onClick={handleSpeakPronunciation}
              className={`p-1 rounded-full transition-all ${
                isPlayingAudio ? 'bg-cyan-500 text-white animate-pulse' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Listen to pronunciation"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Function Summary */}
      <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Key Primary Function
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {part.functionSummary}
        </p>
      </div>

      {/* COMPREHENSIVE ACADEMIC ESSAY MODULE */}
      {part.essay && (
        <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Academic Comprehensive Essay
                </h3>
                <span className="text-[10px] text-indigo-300 font-mono">Textbook-Grade Deep Dive</span>
              </div>
            </div>

            <button
              onClick={() => setIsEssayExpanded(!isEssayExpanded)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg"
            >
              {isEssayExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {isEssayExpanded ? 'Collapse Essay' : 'Read Essay'}
            </button>
          </div>

          {isEssayExpanded && (
            <div className="flex flex-col gap-3">
              {/* Essay Chapter Navigation Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
                <button
                  onClick={() => setActiveEssayTab('overview')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeEssayTab === 'overview'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3 h-3" /> Overview
                </button>

                <button
                  onClick={() => setActiveEssayTab('anatomy')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeEssayTab === 'anatomy'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Microscope className="w-3 h-3" /> Micro-Anatomy
                </button>

                <button
                  onClick={() => setActiveEssayTab('physiology')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeEssayTab === 'physiology'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Dna className="w-3 h-3" /> Physiology
                </button>

                <button
                  onClick={() => setActiveEssayTab('clinical')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeEssayTab === 'clinical'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Activity className="w-3 h-3" /> Clinical
                </button>
              </div>

              {/* Active Chapter Content Box */}
              <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-normal space-y-2">
                {activeEssayTab === 'overview' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                      Chapter 1: Structural Overview & Biological Role
                    </h4>
                    <p className="leading-relaxed">{part.essay.overview}</p>
                  </div>
                )}

                {activeEssayTab === 'anatomy' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                      Chapter 2: Microscopic & Histological Architecture
                    </h4>
                    <p className="leading-relaxed">{part.essay.anatomyAndHistology}</p>
                  </div>
                )}

                {activeEssayTab === 'physiology' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                      Chapter 3: Biophysical Mechanisms & Dynamics
                    </h4>
                    <p className="leading-relaxed">{part.essay.physiologyAndMechanisms}</p>
                  </div>
                )}

                {activeEssayTab === 'clinical' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                      Chapter 4: Pathology & Clinical Medicine
                    </h4>
                    <p className="leading-relaxed">{part.essay.clinicalSignificance}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Real-World Analogy */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-3.5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Everyday Real-World Analogy
          </h3>
          <button
            onClick={handleGenerateAnalogy}
            disabled={isLoadingAnalogy}
            className="text-[11px] text-amber-300 hover:text-amber-100 flex items-center gap-1 underline underline-offset-2 disabled:opacity-50"
          >
            {isLoadingAnalogy ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {analogies ? 'More AI Analogies' : 'AI Analogy Generator'}
          </button>
        </div>
        <p className="text-xs text-amber-100/90 italic">
          "{part.analogy}"
        </p>

        {/* AI Generated Analogies Expansion */}
        {analogies && (
          <div className="mt-3 space-y-2 border-t border-amber-500/20 pt-2.5">
            <span className="text-[11px] font-semibold text-amber-300">More AI Comparisons:</span>
            {analogies.map((item, idx) => (
              <div key={idx} className="bg-slate-950/70 p-2 rounded border border-amber-500/20 text-xs">
                <div className="font-semibold text-amber-200">{item.title}</div>
                <div className="text-slate-300 mt-0.5">{item.analogy}</div>
                <div className="text-[10px] text-amber-400/80 mt-1">Why it works: {item.whyItWorks}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clinical Note if exists */}
      {part.clinicalNote && (
        <div className="bg-rose-950/30 border border-rose-500/20 rounded-xl p-3.5">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5" /> Medical & Clinical Context
          </h3>
          <p className="text-xs text-rose-200/90">
            {part.clinicalNote}
          </p>
        </div>
      )}

      {/* Fun Fact */}
      <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-3.5">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" /> Fast Bio Fact
        </h3>
        <p className="text-xs text-cyan-200/90">
          {part.funFact}
        </p>
      </div>

      {/* Quick Action Button to Ask BioBot */}
      <button
        onClick={() => onAskBioBot(`Can you explain how the ${part.name} works in detail and why it is essential for survival?`)}
        className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.01]"
      >
        <MessageSquare className="w-4 h-4" /> Ask BioBot AI Tutor About {part.name}
      </button>
    </div>
  );
};
