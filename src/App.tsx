import React, { useState } from 'react';
import { ORGAN_SYSTEMS } from './data/auditedOrganData';
import { OrganId } from './types';
import { Navbar } from './components/Navbar';
import { EyeDiagram } from './components/Diagrams/EyeDiagram';
import { BrainDiagram } from './components/Diagrams/BrainDiagram';
import { HeartDiagram } from './components/Diagrams/HeartDiagram';
import { LungsDiagram } from './components/Diagrams/LungsDiagram';
import { SkeletonDiagram } from './components/Diagrams/SkeletonDiagram';
import { DigestiveDiagram } from './components/Diagrams/DigestiveDiagram';
import { EarDiagram } from './components/Diagrams/EarDiagram';
import { PartDetailPanel } from './components/PartDetailPanel';
import { InteractiveLab } from './components/InteractiveLab';
import { QuizSection } from './components/QuizSection';
import { AiTutorModal } from './components/AiTutorModal';
import { BookOpen, Sparkles, Trophy, Info, Bot } from 'lucide-react';

export default function App() {
  const [activeOrganId, setActiveOrganId] = useState<OrganId>('eye');
  const [activeTab, setActiveTab] = useState<'explorer' | 'lab' | 'quiz'>('explorer');
  const [selectedPartId, setSelectedPartId] = useState<string | null>('cornea');

  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [tutorInitialPrompt, setTutorInitialPrompt] = useState<string | undefined>(undefined);

  const activeOrgan = ORGAN_SYSTEMS[activeOrganId];
  const selectedPart = activeOrgan?.parts.find((p) => p.id === selectedPartId) || null;

  const handleSelectOrgan = (organId: OrganId) => {
    setActiveOrganId(organId);
    const firstPart = ORGAN_SYSTEMS[organId]?.parts[0]?.id || null;
    setSelectedPartId(firstPart);
  };

  const handleSearchSelectPart = (organId: OrganId, partId: string) => {
    setActiveOrganId(organId);
    setSelectedPartId(partId);
    setActiveTab('explorer');
  };

  const handleAskBioBot = (question: string) => {
    setTutorInitialPrompt(question);
    setIsAiTutorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar
        organSystems={ORGAN_SYSTEMS}
        activeOrganId={activeOrganId}
        onSelectOrgan={handleSelectOrgan}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAiTutor={() => {
          setTutorInitialPrompt(undefined);
          setIsAiTutorOpen(true);
        }}
        onSearchSelectPart={handleSearchSelectPart}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        <div className={`rounded-2xl p-6 border border-slate-800 bg-gradient-to-r ${activeOrgan.bgGradient} relative overflow-hidden shadow-2xl`}>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span
                className="text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border mb-2 inline-block"
                style={{ color: activeOrgan.accentColor, borderColor: `${activeOrgan.accentColor}40`, backgroundColor: `${activeOrgan.accentColor}15` }}
              >
                {activeOrgan.systemName}
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {activeOrgan.title}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
                {activeOrgan.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('lab')}
                className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Open Lab Simulation
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Trophy className="w-3.5 h-3.5 text-purple-400" /> Take Quiz
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Interactive Anatomical Diagram
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Click hotspots to inspect structures
                  </span>
                </div>

                {activeOrganId === 'eye' && (
                  <EyeDiagram
                    parts={activeOrgan.parts}
                    selectedPartId={selectedPartId}
                    onSelectPart={setSelectedPartId}
                  />
                )}

                {activeOrganId === 'brain' && (
                  <BrainDiagram
                    parts={activeOrgan.parts}
                    selectedPartId={selectedPartId}
                    onSelectPart={setSelectedPartId}
                  />
                )}

                {activeOrganId === 'heart' && (
                  <HeartDiagram
                    parts={activeOrgan.parts}
                    selectedPartId={selectedPartId}
                    onSelectPart={setSelectedPartId}
                  />
                )}

                {activeOrganId === 'lungs' && (
                  <LungsDiagram
                    parts={activeOrgan.parts}
                    selectedPartId={selectedPartId}
                    onSelectPart={setSelectedPartId}
                  />
                )}

                {activeOrganId === 'skeleton' && (
                  <SkeletonDiagram
                    parts={activeOrgan.parts}
                    selectedPartId={selectedPartId}
                    onSelectPart={setSelectedPartId}
                  />
                )}

                {activeOrganId === 'digestive' && (
                  <DigestiveDiagram
                    parts={activeOrgan.parts}
                    selectedPartId={selectedPartId}
                    onSelectPart={setSelectedPartId}
                  />
                )}

                {activeOrganId === 'ear' && (
                  <EarDiagram
                    parts={activeOrgan.parts}
                    selectedPartId={selectedPartId}
                    onSelectPart={setSelectedPartId}
                  />
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Anatomical Structures ({activeOrgan.parts.length}):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {activeOrgan.parts.map((part) => {
                    const isSelected = selectedPartId === part.id;
                    return (
                      <button
                        key={part.id}
                        onClick={() => setSelectedPartId(part.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-slate-800 border-cyan-500 text-white shadow-lg'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: part.color }}
                          />
                          <span className="truncate">{part.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              {selectedPart ? (
                <PartDetailPanel
                  part={selectedPart}
                  onClose={() => setSelectedPartId(null)}
                  onAskBioBot={handleAskBioBot}
                />
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
                  <Info className="w-8 h-8 mb-2 text-slate-600" />
                  <p className="text-sm font-semibold">Select any part from the diagram or list to inspect its anatomy, pronunciation, and analogies.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'lab' && (
          <InteractiveLab
            organSystem={activeOrgan}
            onSelectPart={setSelectedPartId}
            selectedPartId={selectedPartId}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection organSystem={activeOrgan} />
        )}
      </main>

      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        initialPrompt={tutorInitialPrompt}
        organContext={activeOrgan.title}
      />

      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BodyPractice.io — Interactive Anatomy & Biology Explorer for Students</span>
          <button
            onClick={() => handleAskBioBot("What is the most complex human organ and why?")}
            className="text-purple-400 hover:underline flex items-center gap-1"
          >
            <Bot className="w-3.5 h-3.5" /> Ask BioBot
          </button>
        </div>
      </footer>
    </div>
  );
}
