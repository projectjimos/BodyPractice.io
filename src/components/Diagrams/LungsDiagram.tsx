import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnatomicalPart } from '../../types';

interface LungsDiagramProps {
  parts: AnatomicalPart[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  isInhaling?: boolean;
}

export const LungsDiagram: React.FC<LungsDiagramProps> = ({
  parts,
  selectedPartId,
  onSelectPart,
  isInhaling = true
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'anatomical' | 'vascular' | 'callouts'>('anatomical');

  const isSelected = (id: string) => selectedPartId === id;

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-slate-950 rounded-2xl border border-slate-800/80 p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
      {/* HUD Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-slate-200 font-medium uppercase tracking-wider text-[11px]">
            Thoracic Respiratory Cross-Section
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-950/80 p-0.5 rounded-md border border-slate-800 text-[11px]">
          <button
            onClick={() => setViewMode('anatomical')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'anatomical' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Anatomy
          </button>
          <button
            onClick={() => setViewMode('vascular')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'vascular' ? 'bg-rose-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Pulmo-Vascular
          </button>
          <button
            onClick={() => setViewMode('callouts')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'callouts' ? 'bg-purple-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Callouts
          </button>
        </div>
      </div>

      <svg viewBox="0 0 520 420" className="w-full h-full select-none overflow-visible pt-6">
        <defs>
          {/* Lung Parenchyma Gradient */}
          <radialGradient id="lungTissue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.95" />
          </radialGradient>

          <filter id="lungsGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- TRACHEA (C-Shaped Cartilage Rings) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('trachea')}
          onMouseEnter={() => setHoveredId('trachea')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 245 50 L 245 170 M 275 50 L 275 170"
            stroke={isSelected('trachea') ? '#38BDF8' : '#0284C7'}
            strokeWidth="3"
            fill="none"
          />
          <rect
            x="245"
            y="50"
            width="30"
            height="120"
            fill="#0369A1"
            fillOpacity="0.5"
            rx="4"
          />
          {/* Cartilage C-Rings */}
          {[65, 85, 105, 125, 145, 160].map((y) => (
            <line
              key={y}
              x1="245"
              y1={y}
              x2="275"
              y2={y}
              strokeBAE6FD=""
              stroke="#BAE6FD"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* --- BRONCHI & BRONCHIOLE ARBORIZATION --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('bronchi')}
          onMouseEnter={() => setHoveredId('bronchi')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Carina Bifurcation at T4 */}
          <path d="M 260 170 Q 210 190 160 220" stroke="#38BDF8" strokeWidth="13" fill="none" strokeLinecap="round" />
          <path d="M 260 170 Q 310 190 360 220" stroke="#38BDF8" strokeWidth="13" fill="none" strokeLinecap="round" />

          {/* Secondary & Tertiary Bronchiole Branches */}
          <path d="M 160 220 Q 130 240 110 280" stroke="#7DD3FC" strokeWidth="7" fill="none" />
          <path d="M 160 220 Q 180 250 190 295" stroke="#7DD3FC" strokeWidth="7" fill="none" />
          <path d="M 160 220 Q 140 210 120 180" stroke="#7DD3FC" strokeWidth="6" fill="none" />

          <path d="M 360 220 Q 390 240 410 280" stroke="#7DD3FC" strokeWidth="7" fill="none" />
          <path d="M 360 220 Q 340 250 330 295" stroke="#7DD3FC" strokeWidth="7" fill="none" />
          <path d="M 360 220 Q 380 210 400 180" stroke="#7DD3FC" strokeWidth="6" fill="none" />
        </g>

        {/* --- PULMONARY CIRCULATION NETWORK (In Vascular Mode) --- */}
        {viewMode === 'vascular' && (
          <g className="pointer-events-none opacity-90">
            {/* Blue Pulmonary Arteries (carrying deox blood to lungs) */}
            <path d="M 260 190 Q 190 210 130 250" stroke="#2563EB" strokeWidth="4" fill="none" />
            <path d="M 260 190 Q 330 210 390 250" stroke="#2563EB" strokeWidth="4" fill="none" />
            {/* Red Pulmonary Veins (returning ox blood to heart) */}
            <path d="M 260 205 Q 180 230 140 270" stroke="#EF4444" strokeWidth="4" fill="none" />
            <path d="M 260 205 Q 340 230 380 270" stroke="#EF4444" strokeWidth="4" fill="none" />
          </g>
        )}

        {/* --- LUNG LOBES WITH RESPIRATORY EXPANSION --- */}
        {/* Right Lung (Viewer Left - 3 Lobes: Superior, Middle, Inferior) */}
        <motion.g
          animate={{ scale: isInhaling ? 1.05 : 0.96 }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          style={{ transformOrigin: "170px 250px" }}
          className="cursor-pointer"
          onClick={() => onSelectPart('lungs')}
          onMouseEnter={() => setHoveredId('lungs')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 240 170 C 130 150, 75 230, 95 330 C 150 350, 230 340, 240 270 Z"
            fill="url(#lungTissue)"
            stroke={isSelected('lungs') ? '#38BDF8' : '#0284C7'}
            strokeWidth="3.5"
            filter={isSelected('lungs') ? "url(#lungsGlow)" : undefined}
          />
          {/* Horizontal Fissure */}
          <path d="M 100 230 L 235 230" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Oblique Fissure */}
          <path d="M 140 170 L 110 310" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="4 2" />
        </motion.g>

        {/* Left Lung (Viewer Right - 2 Lobes: Superior & Inferior + Cardiac Notch) */}
        <motion.g
          animate={{ scale: isInhaling ? 1.05 : 0.96 }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          style={{ transformOrigin: "350px 250px" }}
          className="cursor-pointer"
          onClick={() => onSelectPart('lungs')}
          onMouseEnter={() => setHoveredId('lungs')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 280 170 C 390 150, 445 230, 425 330 C 370 350, 310 340, 290 300 C 275 280, 280 220, 280 170 Z"
            fill="url(#lungTissue)"
            stroke={isSelected('lungs') ? '#38BDF8' : '#0284C7'}
            strokeWidth="3.5"
            filter={isSelected('lungs') ? "url(#lungsGlow)" : undefined}
          />
          {/* Left Oblique Fissure */}
          <path d="M 380 170 L 330 320" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="4 2" />
        </motion.g>

        {/* --- MICROSCOPIC ALVEOLI SAC ZOOM INSET --- */}
        <g
          transform="translate(425, 305)"
          className="cursor-pointer group/alv"
          onClick={() => onSelectPart('alveoli')}
          onMouseEnter={() => setHoveredId('alveoli')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <circle cx="0" cy="0" r="32" fill="#0F172A" stroke="#22D3EE" strokeWidth="2.5" />
          {/* Alveolar Acinus Clusters */}
          <circle cx="-10" cy="-10" r="11" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="11" cy="-8" r="10" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="-2" cy="11" r="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Pulmonary Capillary Mesh (Deox Blue -> Ox Red transition) */}
          <path d="M -28 -5 Q 0 -20 28 -5" stroke="#EF4444" strokeWidth="2.5" fill="none" />
          <path d="M -28 12 Q 0 28 28 12" stroke="#3B82F6" strokeWidth="2.5" fill="none" />
          <text x="0" y="30" textAnchor="middle" fill="#22D3EE" fontSize="8" fontFamily="monospace">Alveolar Capillary</text>
        </g>

        {/* --- DIAPHRAGM DOME MUSCLE --- */}
        <motion.path
          d="M 70 360 C 200 315, 320 315, 450 360 C 450 380, 70 380, 70 360 Z"
          fill={isSelected('diaphragm') ? '#F59E0B' : '#D97706'}
          stroke={isSelected('diaphragm') ? '#FCD34D' : '#B45309'}
          strokeWidth={isSelected('diaphragm') ? "4" : "2"}
          animate={{
            y: isInhaling ? 18 : 0, // Contracts and flattens down on inhale
          }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="cursor-pointer"
          onClick={() => onSelectPart('diaphragm')}
          onMouseEnter={() => setHoveredId('diaphragm')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- CLINICAL CALLOUT LINES --- */}
        {(viewMode === 'callouts' || selectedPartId) && (
          <g className="pointer-events-none text-[10px] font-mono" opacity="0.85">
            <line x1="260" y1="110" x2="160" y2="70" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <text x="155" y="65" textAnchor="end" fill="#7DD3FC">Trachea (Cartilage Rings)</text>

            <line x1="160" y1="220" x2="80" y2="200" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="3 3" />
            <text x="75" y="195" textAnchor="end" fill="#BAE6FD">Primary Bronchi / Carina</text>

            <line x1="380" y1="230" x2="470" y2="180" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <text x="475" y="175" textAnchor="start" fill="#7DD3FC">Left Lung (2 Lobes)</text>

            <line x1="260" y1="355" x2="160" y2="390" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
            <text x="155" y="395" textAnchor="end" fill="#FDE047">Diaphragm Muscle</text>
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
          <text x="25" y="-6" textAnchor="middle" fill="#CBD5E1" fontSize="9">20 cm</text>
        </g>

        <g transform="translate(480, 385)" className="pointer-events-none text-[9px] font-mono" fill="#94A3B8">
          <text x="-15" y="3" textAnchor="end" fill="#38BDF8">R</text>
          <text x="15" y="3" textAnchor="start" fill="#38BDF8">L</text>
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#475569" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Respiratory Status Bar */}
      <div className="absolute bottom-2 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <span>Ventilatory Phase: <strong className={isInhaling ? "text-cyan-400" : "text-amber-400"}>{isInhaling ? "Inspiration (Active)" : "Expiration (Passive)"}</strong></span>
        <span>Tidal Volume: <strong className="text-emerald-400">500 mL</strong></span>
      </div>
    </div>
  );
};
