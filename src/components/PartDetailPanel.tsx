import React, { useState } from 'react';
import { Volume2, BookOpen, Stethoscope, Lightbulb, X, GraduationCap, Microscope, Dna, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { AnatomicalPart } from '../types';

interface PartDetailPanelProps {
  part: AnatomicalPart | null;
  onClose: () => void;
}

export const PartDetailPanel: React.FC<PartDetailPanelProps> = ({ part, onClose }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeEssayTab, setActiveEssayTab] = useState<'overview' | 'anatomy' | 'physiology' | 'clinical'>('overview');
  const [isEssayExpanded, setIsEssayExpanded] = useState(true);

  if (!part) return null;

  const handleSpeakPronunciation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(part.name);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100 max-h-[85vh] overflow-y-auto">
      <div className="flex items-start justify-between border-b border-slate-800 pb-3">
        <div>
          <span
            className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border mb-1 inline-block"
            style={{ color: part.color, borderColor: `${part.color}40`, backgroundColor: `${part.color}15` }}
          >
            {part.category}
          </span>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">{part.name}</h2>
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
          aria-label="Close anatomy details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Key Primary Function
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">{part.functionSummary}</p>
      </div>

      {part.essay && (
        <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Academic Comprehensive Essay</h3>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
                <button
                  onClick={() => setActiveEssayTab('overview')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${activeEssayTab === 'overview' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <BookOpen className="w-3 h-3" /> Overview
                </button>
                <button
                  onClick={() => setActiveEssayTab('anatomy')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${activeEssayTab === 'anatomy' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Microscope className="w-3 h-3" /> Micro-Anatomy
                </button>
                <button
                  onClick={() => setActiveEssayTab('physiology')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${activeEssayTab === 'physiology' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Dna className="w-3 h-3" /> Physiology
                </button>
                <button
                  onClick={() => setActiveEssayTab('clinical')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${activeEssayTab === 'clinical' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Activity className="w-3 h-3" /> Clinical
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-normal space-y-2">
                {activeEssayTab === 'overview' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1">Chapter 1: Structural Overview & Biological Role</h4>
                    <p className="leading-relaxed">{part.essay.overview}</p>
                  </div>
                )}
                {activeEssayTab === 'anatomy' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1">Chapter 2: Microscopic & Histological Architecture</h4>
                    <p className="leading-relaxed">{part.essay.anatomyAndHistology}</p>
                  </div>
                )}
                {activeEssayTab === 'physiology' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1">Chapter 3: Biophysical Mechanisms & Dynamics</h4>
                    <p className="leading-relaxed">{part.essay.physiologyAndMechanisms}</p>
                  </div>
                )}
                {activeEssayTab === 'clinical' && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-1">Chapter 4: Pathology & Clinical Medicine</h4>
                    <p className="leading-relaxed">{part.essay.clinicalSignificance}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {part.clinicalNote && (
        <div className="bg-rose-950/30 border border-rose-500/20 rounded-xl p-3.5">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5" /> Medical & Clinical Context
          </h3>
          <p className="text-xs text-rose-200/90">{part.clinicalNote}</p>
        </div>
      )}

      <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-3.5">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" /> Fast Bio Fact
        </h3>
        <p className="text-xs text-cyan-200/90">{part.funFact}</p>
      </div>
    </div>
  );
};
