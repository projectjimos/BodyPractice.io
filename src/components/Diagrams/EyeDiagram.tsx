import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnatomicalPart } from '../../types';

interface EyeDiagramProps {
  parts: AnatomicalPart[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  brightness?: number; // 0 (dim) to 100 (bright)
  focusDistance?: number; // 0 (near) to 100 (far)
  showLightRays?: boolean;
}

export const EyeDiagram: React.FC<EyeDiagramProps> = ({
  parts,
  selectedPartId,
  onSelectPart,
  brightness = 50,
  focusDistance = 50,
  showLightRays = true
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'anatomical' | 'vascular' | 'callouts'>('anatomical');

  // Pupil radius calculation based on brightness
  const pupilRadius = 28 - (brightness / 100) * 16;

  // Lens shape based on focus distance
  const lensRx = 22 - (focusDistance / 100) * 10;
  const lensRy = 45 + (focusDistance / 100) * 5;

  const isSelected = (id: string) => selectedPartId === id;
  const isHovered = (id: string) => hoveredId === id;

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-slate-950 rounded-2xl border border-slate-800/80 p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden group">
      {/* Dynamic Background Light Glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 10% 50%, rgba(56, 189, 248, ${0.08 + (brightness / 100) * 0.2}), transparent 65%)`
        }}
      />

      {/* Clinical HUD Controls Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-slate-300 font-medium uppercase tracking-wider text-[11px]">
            Eye Cross-Section [Midsagittal]
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
            Vascular
          </button>
          <button
            onClick={() => setViewMode('callouts')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'callouts' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
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
          {/* Cornea Gradient */}
          <linearGradient id="corneaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#7DD3FC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.2" />
          </linearGradient>

          {/* Sclera Tissue Gradient */}
          <linearGradient id="scleraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Choroid Vascular Layer */}
          <linearGradient id="choroidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Retina Neurosensory Layer */}
          <radialGradient id="retinaGrad" cx="70%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="1" />
            <stop offset="70%" stopColor="#E11D48" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0.9" />
          </radialGradient>

          {/* Vitreous Body Gel Gradient */}
          <radialGradient id="vitreousGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0891B2" stopOpacity="0.08" />
            <stop offset="80%" stopColor="#0284C7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.35" />
          </radialGradient>

          {/* Crystalline Lens Radial Gradient */}
          <radialGradient id="lensGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
          </radialGradient>

          {/* Iris Radial Pattern */}
          <linearGradient id="irisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>

          {/* Light Rays Gradient */}
          <linearGradient id="lightRayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity={0.25 + (brightness / 100) * 0.55} />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity={0.45 + (brightness / 100) * 0.45} />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- LIGHT RAYS SIMULATION --- */}
        {showLightRays && (
          <g className="pointer-events-none">
            <motion.path
              d={`M 15 130 Q 110 130 190 ${200 - pupilRadius} Q 245 180 490 200`}
              fill="none"
              stroke="url(#lightRayGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.path
              d="M 15 200 L 490 200"
              fill="none"
              stroke="url(#lightRayGrad)"
              strokeWidth="3"
              strokeDasharray="6 4"
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
            <motion.path
              d={`M 15 270 Q 110 270 190 ${200 + pupilRadius} Q 245 220 490 200`}
              fill="none"
              stroke="url(#lightRayGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            {/* Focal Point on Fovea */}
            <circle cx="490" cy="200" r="5" fill="#FDE047" className="animate-ping" />
            <circle cx="490" cy="200" r="3" fill="#EF4444" />
          </g>
        )}

        {/* --- LAYER 1: SCLERA (Outer Fibrous Coat) --- */}
        <path
          d="M 120 130 C 180 20, 480 20, 480 200 C 480 380, 180 380, 120 270"
          fill="none"
          stroke={isSelected('sclera') ? '#38BDF8' : 'url(#scleraGrad)'}
          strokeWidth={isSelected('sclera') ? "14" : "11"}
          className="cursor-pointer transition-all duration-300 hover:stroke-cyan-400"
          onClick={() => onSelectPart('sclera')}
          onMouseEnter={() => setHoveredId('sclera')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- LAYER 2: CHOROID (Middle Vascular Layer) --- */}
        <path
          d="M 135 135 C 190 35, 470 35, 470 200 C 470 365, 190 365, 135 265"
          fill="none"
          stroke={viewMode === 'vascular' ? '#B45309' : '#78350F'}
          strokeWidth="4"
          strokeDasharray={viewMode === 'vascular' ? "none" : "none"}
          className="pointer-events-none"
        />

        {/* --- LAYER 3: RETINA (Inner Neurosensory Layer) --- */}
        <path
          d="M 150 140 C 200 50, 460 50, 460 200 C 460 350, 200 350, 150 260"
          fill="none"
          stroke={isSelected('retina') ? '#F43F5E' : 'url(#retinaGrad)'}
          strokeWidth={isSelected('retina') ? "8" : "5"}
          className="cursor-pointer transition-all duration-300 hover:stroke-rose-400"
          filter={isSelected('retina') ? "url(#eyeGlow)" : undefined}
          onClick={() => onSelectPart('retina')}
          onMouseEnter={() => setHoveredId('retina')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- RETINAL BLOOD VESSELS (Arteries & Veins - Highlighted in Vascular Mode) --- */}
        <g className="pointer-events-none opacity-80" strokeWidth="1.5" fill="none">
          {/* Superior Branch */}
          <path d="M 455 235 Q 430 180 380 120" stroke="#EF4444" strokeDasharray={viewMode === 'vascular' ? 'none' : '3 2'} />
          <path d="M 455 235 Q 410 160 330 90" stroke="#3B82F6" strokeDasharray={viewMode === 'vascular' ? 'none' : '3 2'} />
          {/* Inferior Branch */}
          <path d="M 455 245 Q 430 290 380 330" stroke="#EF4444" strokeDasharray={viewMode === 'vascular' ? 'none' : '3 2'} />
          <path d="M 455 245 Q 410 310 330 350" stroke="#3B82F6" strokeDasharray={viewMode === 'vascular' ? 'none' : '3 2'} />
        </g>

        {/* --- VITREOUS HUMOR (Inner Hydrogel Chamber) --- */}
        <path
          d="M 250 120 C 350 100, 455 110, 455 200 C 455 290, 350 300, 250 280 Z"
          fill="url(#vitreousGrad)"
          stroke={isSelected('vitreous-humor') ? '#67E8F9' : 'transparent'}
          strokeWidth="3"
          className="cursor-pointer transition-all hover:opacity-80"
          onClick={() => onSelectPart('vitreous-humor')}
          onMouseEnter={() => setHoveredId('vitreous-humor')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- FOVEA CENTRALIS (Macular Pit) --- */}
        <g
          className="cursor-pointer group/fovea"
          onClick={() => onSelectPart('fovea')}
          onMouseEnter={() => setHoveredId('fovea')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <ellipse
            cx="460"
            cy="200"
            rx="6"
            ry="18"
            fill={isSelected('fovea') ? '#EC4899' : '#F43F5E'}
            stroke="#FDE047"
            strokeWidth={isSelected('fovea') ? "3" : "1.5"}
          />
          {/* Macula Lutea Ring */}
          <ellipse cx="460" cy="200" rx="12" ry="28" fill="none" stroke="#EAB308" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
        </g>

        {/* --- OPTIC NERVE (CN II Neural Canal) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('optic-nerve')}
          onMouseEnter={() => setHoveredId('optic-nerve')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 455 230 C 480 235, 520 255, 580 275 L 570 305 C 510 285, 470 265, 445 250 Z"
            fill={isSelected('optic-nerve') ? '#A855F7' : '#7E22CE'}
            stroke="#C084FC"
            strokeWidth={isSelected('optic-nerve') ? "3" : "1"}
            filter={isSelected('optic-nerve') ? "url(#eyeGlow)" : undefined}
          />
          {/* Central Retinal Artery & Vein running inside Optic Nerve */}
          <path d="M 460 240 L 575 285" stroke="#EF4444" strokeWidth="2" />
          <path d="M 455 245 L 570 295" stroke="#3B82F6" strokeWidth="2" />
          {/* Dural Sheath Border */}
          <path d="M 455 230 C 480 235, 520 255, 580 275" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* --- CORNEA (Anterior Transparent Curved Window) --- */}
        <path
          d="M 120 130 C 65 165, 65 235, 120 270"
          fill="url(#corneaGrad)"
          stroke={isSelected('cornea') ? '#38BDF8' : '#7DD3FC'}
          strokeWidth={isSelected('cornea') ? "9" : "6"}
          strokeLinecap="round"
          className="cursor-pointer transition-all hover:stroke-cyan-300"
          filter={isSelected('cornea') ? "url(#eyeGlow)" : undefined}
          onClick={() => onSelectPart('cornea')}
          onMouseEnter={() => setHoveredId('cornea')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- CILIARY BODY & SUSPENSORY LIGAMENTS (Zonules of Zinn) --- */}
        <g className="pointer-events-none">
          {/* Top Ciliary Muscle */}
          <path d="M 210 115 Q 235 120 245 135 L 225 145 Z" fill="#7E22CE" stroke="#A855F7" strokeWidth="1" />
          {/* Bottom Ciliary Muscle */}
          <path d="M 210 285 Q 235 280 245 265 L 225 255 Z" fill="#7E22CE" stroke="#A855F7" strokeWidth="1" />
          {/* Zonule Fibers (Suspensory Ligaments to Lens) */}
          <line x1="235" y1="140" x2="245" y2="155" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="2 1" />
          <line x1="235" y1="260" x2="245" y2="245" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="2 1" />
        </g>

        {/* --- IRIS & PUPIL --- */}
        {/* Superior Iris Flap */}
        <path
          d={`M 125 135 C 165 140, 190 ${200 - pupilRadius - 4}, 190 ${200 - pupilRadius}`}
          fill="none"
          stroke={isSelected('iris') ? '#C084FC' : 'url(#irisGrad)'}
          strokeWidth={isSelected('iris') ? "12" : "9"}
          strokeLinecap="round"
          className="cursor-pointer transition-all duration-300"
          onClick={() => onSelectPart('iris')}
          onMouseEnter={() => setHoveredId('iris')}
          onMouseLeave={() => setHoveredId(null)}
        />
        {/* Inferior Iris Flap */}
        <path
          d={`M 125 265 C 165 260, 190 ${200 + pupilRadius + 4}, 190 ${200 + pupilRadius}`}
          fill="none"
          stroke={isSelected('iris') ? '#C084FC' : 'url(#irisGrad)'}
          strokeWidth={isSelected('iris') ? "12" : "9"}
          strokeLinecap="round"
          className="cursor-pointer transition-all duration-300"
          onClick={() => onSelectPart('iris')}
          onMouseEnter={() => setHoveredId('iris')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* PUPIL OPENING */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('pupil')}
          onMouseEnter={() => setHoveredId('pupil')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <line
            x1="190"
            y1={200 - pupilRadius}
            x2="190"
            y2={200 + pupilRadius}
            stroke={isSelected('pupil') ? '#38BDF8' : '#020617'}
            strokeWidth={isSelected('pupil') ? "8" : "4"}
            strokeDasharray="2 2"
          />
        </g>

        {/* --- CRYSTALLINE LENS --- */}
        <motion.ellipse
          cx="245"
          cy="200"
          rx={lensRx}
          ry={lensRy}
          fill="url(#lensGrad)"
          stroke={isSelected('lens') ? '#F59E0B' : '#FEF08A'}
          strokeWidth={isSelected('lens') ? "4" : "2"}
          className="cursor-pointer transition-all duration-300 hover:opacity-90"
          filter={isSelected('lens') ? "url(#eyeGlow)" : undefined}
          onClick={() => onSelectPart('lens')}
          onMouseEnter={() => setHoveredId('lens')}
          onMouseLeave={() => setHoveredId(null)}
        />

        {/* --- CLINICAL CALLOUT LINES (Visible in 'callouts' mode or on selection) --- */}
        {(viewMode === 'callouts' || selectedPartId) && (
          <g className="pointer-events-none" opacity="0.85">
            <line x1="85" y1="160" x2="40" y2="120" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <text x="35" y="115" textAnchor="end" fill="#7DD3FC" fontSize="10" fontFamily="monospace">Cornea</text>

            <line x1="180" y1="170" x2="140" y2="80" stroke="#C084FC" strokeWidth="1" strokeDasharray="3 3" />
            <text x="135" y="75" textAnchor="end" fill="#E9D5FF" fontSize="10" fontFamily="monospace">Iris / Pupil</text>

            <line x1="245" y1="150" x2="245" y2="60" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" />
            <text x="245" y="52" textAnchor="middle" fill="#FEF08A" fontSize="10" fontFamily="monospace">Lens (Crystalline)</text>

            <line x1="400" y1="100" x2="460" y2="40" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3" />
            <text x="465" y="35" textAnchor="start" fill="#FECDD3" fontSize="10" fontFamily="monospace">Retina</text>

            <line x1="510" y1="270" x2="550" y2="340" stroke="#A855F7" strokeWidth="1" strokeDasharray="3 3" />
            <text x="555" y="350" textAnchor="start" fill="#E9D5FF" fontSize="10" fontFamily="monospace">Optic Nerve (CN II)</text>
          </g>
        )}

        {/* --- HOTSPOT INTERACTIVE PINS --- */}
        {parts.map((part) => {
          if (!part.svgCoords) return null;
          const active = isSelected(part.id) || isHovered(part.id);

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
                className="transition-all duration-200"
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

        {/* --- CLINICAL SCALE & ANATOMICAL COMPASS --- */}
        <g transform="translate(15, 385)" className="pointer-events-none text-[10px] font-mono" fill="#94A3B8">
          {/* Scale Bar */}
          <line x1="0" y1="0" x2="50" y2="0" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#64748B" strokeWidth="2" />
          <line x1="50" y1="-4" x2="50" y2="4" stroke="#64748B" strokeWidth="2" />
          <text x="25" y="-6" textAnchor="middle" fill="#CBD5E1" fontSize="9">24 mm</text>
        </g>

        {/* Orientation Compass */}
        <g transform="translate(560, 385)" className="pointer-events-none text-[9px] font-mono" fill="#94A3B8">
          <text x="0" y="-12" textAnchor="middle" fill="#38BDF8">Ant</text>
          <text x="0" y="16" textAnchor="middle" fill="#94A3B8">Post</text>
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#475569" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Dynamic Status Bar */}
      <div className="absolute bottom-2 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <span>Pupil Aperture: <strong className="text-amber-400">{pupilRadius.toFixed(1)} mm</strong></span>
        <span>Refractive State: <strong className="text-cyan-400">{focusDistance > 50 ? 'Distance Focus' : 'Near Accommodation'}</strong></span>
        <span className="text-slate-400 font-mono text-[11px]">Click parts for clinical essay</span>
      </div>
    </div>
  );
};
