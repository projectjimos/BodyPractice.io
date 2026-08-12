import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnatomicalPart } from '../../types';

interface BrainDiagramProps {
  parts: AnatomicalPart[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  activeActivity?: string | null; // e.g., 'vision', 'music', 'decision', 'balance'
}

export const BrainDiagram: React.FC<BrainDiagramProps> = ({
  parts,
  selectedPartId,
  onSelectPart,
  activeActivity
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'anatomical' | 'vascular' | 'callouts'>('anatomical');

  // Map activities to brain region highlights
  const isActivityActive = (partId: string) => {
    if (!activeActivity) return false;
    switch (activeActivity) {
      case 'decision': return partId === 'frontal-lobe';
      case 'touch': return partId === 'parietal-lobe';
      case 'vision': return partId === 'occipital-lobe';
      case 'music': return partId === 'temporal-lobe' || partId === 'parietal-lobe';
      case 'balance': return partId === 'cerebellum';
      case 'memory': return partId === 'hippocampus' || partId === 'temporal-lobe';
      case 'breathing': return partId === 'brainstem';
      default: return false;
    }
  };

  const isSelected = (id: string) => selectedPartId === id || isActivityActive(id);

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-slate-950 rounded-2xl border border-slate-800/80 p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
      {/* HUD Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
          <span className="font-mono text-slate-200 font-medium uppercase tracking-wider text-[11px]">
            Cerebral Lateral Section
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-950/80 p-0.5 rounded-md border border-slate-800 text-[11px]">
          <button
            onClick={() => setViewMode('anatomical')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'anatomical' ? 'bg-pink-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Anatomy
          </button>
          <button
            onClick={() => setViewMode('vascular')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'vascular' ? 'bg-rose-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Circle of Willis
          </button>
          <button
            onClick={() => setViewMode('callouts')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'callouts' ? 'bg-purple-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Callouts
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 600 420"
        className="w-full h-full select-none overflow-visible pt-6"
      >
        <defs>
          <filter id="brainGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Neural Signal Pulsing Effects when an activity is running */}
        {activeActivity && (
          <g>
            <circle cx="300" cy="220" r="120" fill="none" stroke="#38BDF8" strokeWidth="1" className="animate-ping opacity-30" />
            <circle cx="300" cy="220" r="160" fill="none" stroke="#A855F7" strokeWidth="1" className="animate-ping opacity-20" />
          </g>
        )}

        {/* --- FRONTAL LOBE (Executive Center & Motor Cortex) --- */}
        <motion.path
          d="M 120 220 C 100 150, 160 70, 270 65 C 300 110, 270 200, 230 250 C 180 260, 130 250, 120 220 Z"
          fill={isSelected('frontal-lobe') ? '#EC4899' : '#BE185D'}
          fillOpacity={isSelected('frontal-lobe') ? 0.95 : 0.75}
          stroke={isSelected('frontal-lobe') ? '#F472B6' : '#9D174D'}
          strokeWidth={isSelected('frontal-lobe') ? "4" : "2"}
          className="cursor-pointer transition-all duration-300 hover:fill-pink-500 hover:fill-opacity-90"
          filter={isSelected('frontal-lobe') ? "url(#brainGlow)" : undefined}
          onClick={() => onSelectPart('frontal-lobe')}
          onMouseEnter={() => setHoveredId('frontal-lobe')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- PARIETAL LOBE (Somatosensory Cortex) --- */}
        <motion.path
          d="M 270 65 C 360 60, 430 95, 440 165 C 380 185, 290 165, 270 65 Z"
          fill={isSelected('parietal-lobe') ? '#3B82F6' : '#1D4ED8'}
          fillOpacity={isSelected('parietal-lobe') ? 0.95 : 0.75}
          stroke={isSelected('parietal-lobe') ? '#60A5FA' : '#1E40AF'}
          strokeWidth={isSelected('parietal-lobe') ? "4" : "2"}
          className="cursor-pointer transition-all duration-300 hover:fill-blue-500 hover:fill-opacity-90"
          filter={isSelected('parietal-lobe') ? "url(#brainGlow)" : undefined}
          onClick={() => onSelectPart('parietal-lobe')}
          onMouseEnter={() => setHoveredId('parietal-lobe')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- OCCIPITAL LOBE (Primary Visual Cortex V1) --- */}
        <motion.path
          d="M 440 165 C 500 195, 490 265, 430 265 C 400 235, 410 185, 440 165 Z"
          fill={isSelected('occipital-lobe') ? '#10B981' : '#047857'}
          fillOpacity={isSelected('occipital-lobe') ? 0.95 : 0.75}
          stroke={isSelected('occipital-lobe') ? '#34D399' : '#065F46'}
          strokeWidth={isSelected('occipital-lobe') ? "4" : "2"}
          className="cursor-pointer transition-all duration-300 hover:fill-emerald-500 hover:fill-opacity-90"
          filter={isSelected('occipital-lobe') ? "url(#brainGlow)" : undefined}
          onClick={() => onSelectPart('occipital-lobe')}
          onMouseEnter={() => setHoveredId('occipital-lobe')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- TEMPORAL LOBE (Auditory, Language & Memory) --- */}
        <motion.path
          d="M 230 250 C 270 195, 390 195, 430 265 C 360 285, 250 295, 230 250 Z"
          fill={isSelected('temporal-lobe') ? '#F59E0B' : '#B45309'}
          fillOpacity={isSelected('temporal-lobe') ? 0.95 : 0.75}
          stroke={isSelected('temporal-lobe') ? '#FBBF24' : '#92400E'}
          strokeWidth={isSelected('temporal-lobe') ? "4" : "2"}
          className="cursor-pointer transition-all duration-300 hover:fill-amber-500 hover:fill-opacity-90"
          filter={isSelected('temporal-lobe') ? "url(#brainGlow)" : undefined}
          onClick={() => onSelectPart('temporal-lobe')}
          onMouseEnter={() => setHoveredId('temporal-lobe')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- GYRI & SULCI ANATOMICAL FOLD LINES --- */}
        <g stroke="#F8FAFC" strokeWidth="1.5" fill="none" opacity="0.3" className="pointer-events-none">
          {/* Central Sulcus */}
          <path d="M 270 65 Q 260 120 250 170" stroke="#FFF" strokeWidth="2.5" />
          {/* Lateral Sulcus / Sylvian Fissure */}
          <path d="M 180 230 Q 270 200 390 200" stroke="#FFF" strokeWidth="2.5" />
          {/* Cortical Gyri Wrinkles */}
          <path d="M 150 170 Q 180 140 210 180" />
          <path d="M 180 110 Q 220 130 250 100" />
          <path d="M 290 85 Q 330 115 370 75" />
          <path d="M 340 135 Q 390 115 410 145" />
          <path d="M 260 255 Q 310 235 360 265" />
          <path d="M 440 210 Q 470 230 450 250" />
        </g>

        {/* --- INTERNAL MIDLINE STRUCTURES: CORPUS CALLOSUM & VENTRICLES --- */}
        <g className="pointer-events-none" opacity="0.8">
          {/* Corpus Callosum Arch */}
          <path d="M 230 180 C 250 140, 330 140, 350 180 C 330 160, 250 160, 230 180 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
          {/* Lateral Ventricle Cavity */}
          <path d="M 240 185 Q 280 165 330 185" stroke="#38BDF8" strokeWidth="3" fill="none" />
        </g>

        {/* --- CEREBELLUM (Purkinje Layer & Arbor Vitae) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('cerebellum')}
          onMouseEnter={() => setHoveredId('cerebellum')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 370 285 C 440 275, 475 345, 415 365 C 365 365, 355 315, 370 285 Z"
            fill={isSelected('cerebellum') ? '#8B5CF6' : '#6D28D9'}
            fillOpacity={isSelected('cerebellum') ? 0.95 : 0.75}
            stroke={isSelected('cerebellum') ? '#A78BFA' : '#5B21B6'}
            strokeWidth={isSelected('cerebellum') ? "4" : "2"}
            filter={isSelected('cerebellum') ? "url(#brainGlow)" : undefined}
          />
          {/* Arbor Vitae ("Tree of Life") White Matter Branches */}
          <path d="M 375 320 C 395 310, 420 315, 440 305 M 400 320 L 425 335 M 390 330 L 410 350" stroke="#EDE9FE" strokeWidth="2" fill="none" opacity="0.8" />
        </g>

        {/* --- BRAINSTEM (Midbrain, Pons & Medulla) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('brainstem')}
          onMouseEnter={() => setHoveredId('brainstem')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Midbrain / Pons / Medulla Contour */}
          <path
            d="M 310 295 C 335 295, 345 310, 345 380 L 310 380 C 295 345, 295 315, 310 295 Z"
            fill={isSelected('brainstem') ? '#EF4444' : '#B91C1C'}
            stroke={isSelected('brainstem') ? '#FCA5A5' : '#991B1B'}
            strokeWidth={isSelected('brainstem') ? "4" : "2"}
            filter={isSelected('brainstem') ? "url(#brainGlow)" : undefined}
          />
          {/* Pons Bulge */}
          <path d="M 300 320 Q 288 335 300 350" fill="#DC2626" stroke="#EF4444" strokeWidth="1" />
        </g>

        {/* --- HIPPOCAMPUS (Limbic Seahorse Structure) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('hippocampus')}
          onMouseEnter={() => setHoveredId('hippocampus')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 280 225 C 320 215, 330 245, 310 255 C 290 265, 270 235, 280 225 Z"
            fill={isSelected('hippocampus') ? '#06B6D4' : '#0891B2'}
            stroke="#67E8F9"
            strokeWidth={isSelected('hippocampus') ? "3" : "1.5"}
          />
        </g>

        {/* --- CIRCLE OF WILLIS VASCULAR OVERLAY (Basilar Artery) --- */}
        {viewMode === 'vascular' && (
          <g className="pointer-events-none" opacity="0.95">
            {/* Basilar Artery */}
            <path d="M 310 380 L 310 320 L 300 280" stroke="#FF0055" strokeWidth="3" fill="none" />
            {/* Middle Cerebral Artery (MCA) */}
            <path d="M 300 280 Q 250 250 180 230" stroke="#FF0055" strokeWidth="2.5" fill="none" />
            {/* Anterior Cerebral Artery (ACA) */}
            <path d="M 300 280 Q 220 180 170 120" stroke="#FF0055" strokeWidth="2.5" fill="none" />
            {/* Posterior Cerebral Artery (PCA) */}
            <path d="M 300 280 Q 380 260 440 220" stroke="#FF0055" strokeWidth="2.5" fill="none" />
          </g>
        )}

        {/* --- CLINICAL CALLOUT LINES --- */}
        {(viewMode === 'callouts' || selectedPartId) && (
          <g className="pointer-events-none text-[10px] font-mono" opacity="0.85">
            <line x1="180" y1="120" x2="100" y2="80" stroke="#EC4899" strokeWidth="1" strokeDasharray="3 3" />
            <text x="95" y="75" textAnchor="end" fill="#F472B6">Frontal Lobe</text>

            <line x1="330" y1="100" x2="380" y2="35" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
            <text x="385" y="30" textAnchor="start" fill="#60A5FA">Parietal Lobe</text>

            <line x1="450" y1="210" x2="520" y2="180" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
            <text x="525" y="175" textAnchor="start" fill="#34D399">Occipital Lobe (V1)</text>

            <line x1="310" y1="270" x2="180" y2="320" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
            <text x="175" y="325" textAnchor="end" fill="#FBBF24">Temporal Lobe</text>

            <line x1="420" y1="330" x2="510" y2="350" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />
            <text x="515" y="355" textAnchor="start" fill="#C084FC">Cerebellum</text>
          </g>
        )}

        {/* --- INTERACTIVE PINS --- */}
        {parts.map((part) => {
          if (!part.svgCoords) return null;
          const active = isSelected(part.id) || hoveredId === part.id;

          return (
            <g
              key={part.id}
              transform={`translate(${part.svgCoords.x}, ${part.svgCoords.y})`}
              className="cursor-pointer group/pin"
              onClick={() => onSelectPart(part.id)}
              onMouseEnter={() => setHoveredId(part.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {active && (
                <circle
                  r="14"
                  fill="none"
                  stroke={part.color}
                  strokeWidth="2"
                  className="animate-ping opacity-75"
                />
              )}
              <circle
                r={active ? "8" : "5"}
                fill={part.color}
                stroke="#0F172A"
                strokeWidth="2"
              />
              {active && (
                <g transform="translate(0, -18)">
                  <rect
                    x="-50"
                    y="-14"
                    width="100"
                    height="20"
                    rx="6"
                    fill="#0F172A"
                    stroke={part.color}
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {part.name.split(' ')[0]}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* --- SCALE & COMPASS --- */}
        <g transform="translate(15, 385)" className="pointer-events-none text-[10px] font-mono" fill="#94A3B8">
          <line x1="0" y1="0" x2="50" y2="0" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#64748B" strokeWidth="2" />
          <line x1="50" y1="-4" x2="50" y2="4" stroke="#64748B" strokeWidth="2" />
          <text x="25" y="-6" textAnchor="middle" fill="#CBD5E1" fontSize="9">15 cm</text>
        </g>

        {/* Anatomical Compass (Rostral/Anterior vs Caudal/Posterior) */}
        <g transform="translate(560, 385)" className="pointer-events-none text-[9px] font-mono" fill="#94A3B8">
          <text x="0" y="-12" textAnchor="middle" fill="#38BDF8">Sup</text>
          <text x="0" y="16" textAnchor="middle" fill="#94A3B8">Inf</text>
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#475569" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Active Neural Task Badge */}
      {activeActivity && (
        <div className="absolute bottom-2 left-3 right-3 bg-purple-950/90 border border-purple-500/40 text-purple-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>Active Cortical Signal: <span className="text-white capitalize">{activeActivity}</span></span>
          </div>
          <span className="text-purple-300 font-mono text-[11px]">86 Billion Neurons</span>
        </div>
      )}
    </div>
  );
};
