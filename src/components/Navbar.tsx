import React, { useState } from 'react';
import { Eye, Heart, Activity, Wind, Dumbbell, Utensils, Search, Bot, BookOpen, Sparkles, Trophy, Volume2 } from 'lucide-react';
import { OrganId, OrganSystem } from '../types';

interface NavbarProps {
  organSystems: Record<string, OrganSystem>;
  activeOrganId: OrganId;
  onSelectOrgan: (organId: OrganId) => void;
  activeTab: 'explorer' | 'lab' | 'quiz';
  onSelectTab: (tab: 'explorer' | 'lab' | 'quiz') => void;
  onOpenAiTutor: () => void;
  onSearchSelectPart: (organId: OrganId, partId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  organSystems,
  activeOrganId,
  onSelectOrgan,
  activeTab,
  onSelectTab,
  onOpenAiTutor,
  onSearchSelectPart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Search filter across all organ parts
  const searchResults = searchQuery.trim()
    ? (Object.values(organSystems) as OrganSystem[]).flatMap((system: OrganSystem) =>
        system.parts
          .filter(
            (part) =>
              part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              part.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              part.functionSummary.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((part) => ({ systemId: system.id, part }))
      )
    : [];

  const organIcons: Record<OrganId, React.ReactNode> = {
    eye: <Eye className="w-4 h-4 text-emerald-400" />,
    brain: <Activity className="w-4 h-4 text-purple-400" />,
    heart: <Heart className="w-4 h-4 text-rose-500" />,
    lungs: <Wind className="w-4 h-4 text-cyan-400" />,
    skeleton: <Dumbbell className="w-4 h-4 text-amber-400" />,
    digestive: <Utensils className="w-4 h-4 text-emerald-400" />,
    ear: <Volume2 className="w-4 h-4 text-rose-400" />
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Main Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              🧬
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                Human Body Fundamentals
              </h1>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block -mt-0.5">
                Interactive Anatomy Explorer
              </span>
            </div>
          </div>

          {/* BioBot Mobile Quick Launcher Button */}
          <button
            onClick={onOpenAiTutor}
            className="md:hidden p-2 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-900/40"
          >
            <Bot className="w-4 h-4" /> AI Tutor
          </button>
        </div>

        {/* View Mode Tabs (Explorer, Interactive Lab, Quiz Master) */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1 text-xs">
          <button
            onClick={() => onSelectTab('explorer')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'explorer'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Explorer
          </button>

          <button
            onClick={() => onSelectTab('lab')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'lab'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Lab Simulations
          </button>

          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-purple-400" /> Quiz Master
          </button>
        </div>

        {/* Search Bar & BioBot Launcher */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-60">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search part e.g. Retina, Cornea..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Search Dropdown Results */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-10 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 max-h-60 overflow-y-auto space-y-1">
                {searchResults.map(({ systemId, part }) => (
                  <button
                    key={part.id}
                    onClick={() => {
                      onSearchSelectPart(systemId as OrganId, part.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white">{part.name}</div>
                      <div className="text-[10px] text-slate-400">{part.category}</div>
                    </div>
                    <span className="text-[10px] text-cyan-400 uppercase font-semibold">{systemId}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop AI BioBot Launcher Button */}
          <button
            onClick={onOpenAiTutor}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-1.5 px-3.5 rounded-xl text-xs shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]"
          >
            <Bot className="w-4 h-4" /> Ask BioBot
          </button>
        </div>
      </div>

      {/* Sub-Bar: Organ System Selector Pills */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2 whitespace-nowrap">
            Body Systems:
          </span>
          {(Object.values(organSystems) as OrganSystem[]).map((sys) => {
            const isActive = activeOrganId === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => onSelectOrgan(sys.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-800 border-slate-700 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {organIcons[sys.id]}
                <span>{sys.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
