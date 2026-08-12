import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnatomicalPart } from '../../types';

interface HeartDiagramProps {
  parts: AnatomicalPart[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  bpm?: number; // 40 to 180
  isPlayingSound?: boolean;
}

export const HeartDiagram: React.FC<HeartDiagramProps> = ({
  parts,
  selectedPartId,
  onSelectPart,
  bpm = 72
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'anatomical' | 'conduction' | 'coronary' | 'callouts'>('anatomical');

  // Beat interval in seconds based on BPM
  const beatDuration = 60 / bpm;

  const isSelected = (id: string) => selectedPartId === id;

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-slate-950 rounded-2xl border border-slate-800/80 p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
      {/* Background Pulse Glow */}
      <motion.div
        className="absolute inset-0 bg-rose-500/10 rounded-2xl pointer-events-none"
        animate={{
          scale: [1, 1.02, 1, 1.01, 1],
          opacity: [0.1, 0.3, 0.1, 0.2, 0.1]
        }}
        transition={{
          repeat: Infinity,
          duration: beatDuration,
          ease: "easeInOut"
        }}
      />

      {/* Clinical HUD Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-mono text-slate-200 font-medium uppercase tracking-wider text-[11px]">
            Cardiac Coronal Section
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-950/80 p-0.5 rounded-md border border-slate-800 text-[11px]">
          <button
            onClick={() => setViewMode('anatomical')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'anatomical' ? 'bg-rose-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Anatomy
          </button>
          <button
            onClick={() => setViewMode('conduction')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'conduction' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Conduction
          </button>
          <button
            onClick={() => setViewMode('coronary')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'coronary' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Coronary
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
        viewBox="0 0 520 420"
        className="w-full h-full select-none overflow-visible pt-6"
      >
        <defs>
          {/* Deoxygenated Blood (Vena Cava / Right Heart) */}
          <radialGradient id="deoxGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </radialGradient>

          {/* Oxygenated Blood (Left Heart / Aorta) */}
          <radialGradient id="oxGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="60%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>

          {/* Myocardium Muscle Texture */}
          <linearGradient id="myoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9F1239" />
            <stop offset="50%" stopColor="#881337" />
            <stop offset="100%" stopColor="#4C0519" />
          </linearGradient>

          {/* Conduction System Yellow Glow */}
          <filter id="conductionGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Heart General Glow */}
          <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Pulsing Cardiac Anatomical Structure */}
        <motion.g
          animate={{
            scale: [1, 1.03, 0.98, 1.02, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: beatDuration,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "260px 220px" }}
        >
          {/* --- ASCENDING AORTA & AORTIC ARCH --- */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPart('aorta')}
            onMouseEnter={() => setHoveredId('aorta')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <path
              d="M 240 180 C 240 70, 330 60, 340 120 C 350 150, 340 200, 310 230"
              fill="none"
              stroke={isSelected('aorta') ? '#F43F5E' : '#E11D48'}
              strokeWidth={isSelected('aorta') ? "32" : "26"}
              strokeLinecap="round"
              filter={isSelected('aorta') ? "url(#heartGlow)" : undefined}
            />
            {/* Brachiocephalic, Common Carotid & Subclavian Arteries */}
            <path d="M 260 82 L 255 45" stroke="#E11D48" strokeWidth="10" strokeLinecap="round" />
            <path d="M 285 78 L 285 40" stroke="#E11D48" strokeWidth="10" strokeLinecap="round" />
            <path d="M 310 88 L 318 48" stroke="#E11D48" strokeWidth="10" strokeLinecap="round" />
          </g>

          {/* --- PULMONARY TRUNK & ARTERIES (Crosses in Front of Aorta) --- */}
          <g>
            <path d="M 260 210 C 250 150, 220 120, 170 110" fill="none" stroke="#2563EB" strokeWidth="22" strokeLinecap="round" />
            <path d="M 260 210 C 270 150, 320 120, 370 110" fill="none" stroke="#2563EB" strokeWidth="22" strokeLinecap="round" />
          </g>

          {/* --- SUPERIOR & INFERIOR VENA CAVA --- */}
          <g>
            <path d="M 160 50 L 160 160" stroke="#1D4ED8" strokeWidth="22" strokeLinecap="round" />
            <path d="M 160 280 L 160 380" stroke="#1D4ED8" strokeWidth="20" strokeLinecap="round" />
          </g>

          {/* --- MYOCARDIUM OUTER WALL CONTOUR (Thick Muscle Shell) --- */}
          <path
            d="M 130 160 C 100 180, 100 240, 130 260 C 120 330, 180 395, 250 395 C 330 395, 380 330, 365 240 C 375 180, 340 150, 290 150 Z"
            fill="url(#myoGrad)"
            stroke="#9F1239"
            strokeWidth="4"
          />

          {/* --- RIGHT ATRIUM CHAMBER --- */}
          <motion.path
            d="M 145 165 C 130 185, 130 225, 165 245 C 190 245, 205 215, 200 165 Z"
            fill="url(#deoxGrad)"
            stroke={isSelected('right-atrium') ? '#60A5FA' : '#1D4ED8'}
            strokeWidth={isSelected('right-atrium') ? "4" : "2"}
            className="cursor-pointer transition-all hover:opacity-90"
            filter={isSelected('right-atrium') ? "url(#heartGlow)" : undefined}
            onClick={() => onSelectPart('right-atrium')}
            onMouseEnter={() => setHoveredId('right-atrium')}
            onMouseLeave={() => setHoveredId(null)}
          />

          {/* --- RIGHT VENTRICLE CHAMBER (Thinner Wall) --- */}
          <motion.path
            d="M 165 245 C 155 305, 200 365, 245 365 C 245 315, 235 265, 165 245 Z"
            fill="url(#deoxGrad)"
            stroke={isSelected('right-ventricle') ? '#93C5FD' : '#2563EB'}
            strokeWidth={isSelected('right-ventricle') ? "4" : "2"}
            className="cursor-pointer transition-all hover:opacity-90"
            filter={isSelected('right-ventricle') ? "url(#heartGlow)" : undefined}
            onClick={() => onSelectPart('right-ventricle')}
            onMouseEnter={() => setHoveredId('right-ventricle')}
            onMouseLeave={() => setHoveredId(null)}
          />

          {/* --- LEFT ATRIUM CHAMBER --- */}
          <motion.path
            d="M 295 165 C 325 165, 350 185, 345 235 C 310 245, 285 220, 285 165 Z"
            fill="url(#oxGrad)"
            stroke={isSelected('left-atrium') ? '#FCA5A5' : '#B91C1C'}
            strokeWidth={isSelected('left-atrium') ? "4" : "2"}
            className="cursor-pointer transition-all hover:opacity-90"
            filter={isSelected('left-atrium') ? "url(#heartGlow)" : undefined}
            onClick={() => onSelectPart('left-atrium')}
            onMouseEnter={() => setHoveredId('left-atrium')}
            onMouseLeave={() => setHoveredId(null)}
          />

          {/* --- LEFT VENTRICLE CHAMBER (3x Thick Powerhouse Myocardium) --- */}
          <motion.path
            d="M 245 365 C 295 365, 350 315, 345 235 C 285 245, 245 305, 245 365 Z"
            fill="url(#oxGrad)"
            stroke={isSelected('left-ventricle') ? '#FDA4AF' : '#E11D48'}
            strokeWidth={isSelected('left-ventricle') ? "6" : "3"}
            className="cursor-pointer transition-all hover:opacity-90"
            filter={isSelected('left-ventricle') ? "url(#heartGlow)" : undefined}
            onClick={() => onSelectPart('left-ventricle')}
            onMouseEnter={() => setHoveredId('left-ventricle')}
            onMouseLeave={() => setHoveredId(null)}
          />

          {/* --- INTERVENTRICULAR SEPTUM (Muscular Wall) --- */}
          <path
            d="M 240 225 Q 245 295 245 365"
            stroke="#881337"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* --- PAPILLARY MUSCLES & CHORDAE TENDINEAE ("Heart Strings") --- */}
          <g className="pointer-events-none" opacity="0.9">
            {/* Tricuspid Chordae */}
            <path d="M 185 245 L 180 280 M 185 245 L 195 285" stroke="#FDE047" strokeWidth="1.5" />
            <ellipse cx="180" cy="285" rx="5" ry="10" fill="#9F1239" />
            {/* Mitral Chordae */}
            <path d="M 315 245 L 305 285 M 315 245 L 325 280" stroke="#FDE047" strokeWidth="1.5" />
            <ellipse cx="315" cy="285" rx="6" ry="12" fill="#9F1239" />
          </g>

          {/* --- HEART VALVES (Tricuspid, Mitral, Aortic, Pulmonary) --- */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPart('heart-valves')}
            onMouseEnter={() => setHoveredId('heart-valves')}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Tricuspid Valve */}
            <circle cx="185" cy="245" r="9" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
            {/* Mitral Valve */}
            <circle cx="315" cy="245" r="9" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
            {/* Aortic Semilunar Valve */}
            <circle cx="265" cy="205" r="7" fill="#EAB308" stroke="#FFF" strokeWidth="1.5" />
            {/* Pulmonary Semilunar Valve */}
            <circle cx="225" cy="190" r="7" fill="#EAB308" stroke="#FFF" strokeWidth="1.5" />
          </g>

          {/* --- ANTERIOR CORONARY ARTERIES (LAD & RCA - Highlighted in Coronary Mode) --- */}
          {(viewMode === 'coronary' || viewMode === 'anatomical') && (
            <g className="pointer-events-none" opacity={viewMode === 'coronary' ? 1 : 0.75}>
              {/* Left Anterior Descending Artery (LAD "Widowmaker") */}
              <path
                d="M 265 205 Q 260 260 250 380"
                stroke="#FF0055"
                strokeWidth={viewMode === 'coronary' ? "4" : "2.5"}
                fill="none"
              />
              <path d="M 260 250 Q 280 270 300 290" stroke="#FF0055" strokeWidth="2" fill="none" />
              <path d="M 255 300 Q 280 320 295 340" stroke="#FF0055" strokeWidth="1.5" fill="none" />

              {/* Right Coronary Artery (RCA) */}
              <path
                d="M 200 180 Q 150 210 145 280"
                stroke="#FF0055"
                strokeWidth={viewMode === 'coronary' ? "3.5" : "2"}
                fill="none"
              />

              {/* Cardiac Veins (Blue) */}
              <path d="M 242 210 Q 248 270 242 375" stroke="#38BDF8" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* --- CARDIAC CONDUCTION SYSTEM (SA Node -> AV Node -> His -> Purkinje) --- */}
          {(viewMode === 'conduction' || selectedPartId === 'right-atrium') && (
            <g className="pointer-events-none" filter="url(#conductionGlow)">
              {/* SA Node (Sinoatrial Node - Pacemaker) */}
              <circle cx="160" cy="170" r="7" fill="#FDE047" stroke="#FFF" strokeWidth="2" />
              <text x="160" y="160" textAnchor="middle" fill="#FEF08A" fontSize="9" fontWeight="bold">SA</text>

              {/* AV Node (Atrioventricular Node) */}
              <circle cx="220" cy="225" r="6" fill="#FDE047" stroke="#FFF" strokeWidth="2" />
              <text x="220" y="218" textAnchor="middle" fill="#FEF08A" fontSize="9" fontWeight="bold">AV</text>

              {/* Internodal Pathways */}
              <path d="M 160 170 Q 190 190 220 225" stroke="#FDE047" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />

              {/* Bundle of His & Left/Right Bundle Branches */}
              <path d="M 220 225 L 245 250 L 245 350" stroke="#FDE047" strokeWidth="3" fill="none" />
              <path d="M 245 250 Q 210 280 180 340" stroke="#FDE047" strokeWidth="2" fill="none" />

              {/* Purkinje Fiber Network */}
              <path d="M 245 350 Q 290 340 330 300" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
              <path d="M 180 340 Q 160 320 155 290" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            </g>
          )}

          {/* --- BLOOD FLOW ANIMATED ARROWS --- */}
          {/* Deox Blue Flow In Superior Vena Cava */}
          <motion.path
            d="M 160 70 L 160 180"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: -20 }}
            transition={{ repeat: Infinity, duration: beatDuration, ease: "linear" }}
          />
          {/* Ox Red Flow Out Aorta */}
          <motion.path
            d="M 285 280 C 265 210, 245 140, 285 60"
            fill="none"
            stroke="#FDE047"
            strokeWidth="4"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: -20 }}
            transition={{ repeat: Infinity, duration: beatDuration * 0.8, ease: "linear" }}
          />
        </motion.g>

        {/* --- CLINICAL CALLOUT LINES --- */}
        {(viewMode === 'callouts' || selectedPartId) && (
          <g className="pointer-events-none text-[10px] font-mono" opacity="0.85">
            <line x1="260" y1="60" x2="180" y2="25" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3" />
            <text x="175" y="20" textAnchor="end" fill="#FECDD3">Aortic Arch</text>

            <line x1="160" y1="180" x2="70" y2="170" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 3" />
            <text x="65" y="165" textAnchor="end" fill="#93C5FD">Right Atrium</text>

            <line x1="190" y1="300" x2="80" y2="330" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3 3" />
            <text x="75" y="335" textAnchor="end" fill="#93C5FD">Right Ventricle</text>

            <line x1="330" y1="180" x2="430" y2="170" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3" />
            <text x="435" y="165" textAnchor="start" fill="#FECDD3">Left Atrium</text>

            <line x1="320" y1="310" x2="430" y2="330" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3" />
            <text x="435" y="335" textAnchor="start" fill="#FECDD3">Left Ventricle (Myocardium)</text>
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

        {/* --- CLINICAL SCALE & COMPASS --- */}
        <g transform="translate(15, 385)" className="pointer-events-none text-[10px] font-mono" fill="#94A3B8">
          <line x1="0" y1="0" x2="50" y2="0" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#64748B" strokeWidth="2" />
          <line x1="50" y1="-4" x2="50" y2="4" stroke="#64748B" strokeWidth="2" />
          <text x="25" y="-6" textAnchor="middle" fill="#CBD5E1" fontSize="9">12 cm</text>
        </g>

        {/* Orientation Axis (Patient Anatomical Right / Left) */}
        <g transform="translate(480, 385)" className="pointer-events-none text-[9px] font-mono" fill="#94A3B8">
          <text x="-15" y="3" textAnchor="end" fill="#60A5FA">R</text>
          <text x="15" y="3" textAnchor="start" fill="#F43F5E">L</text>
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#475569" strokeWidth="1.5" />
        </g>
      </svg>

      {/* BPM Indicator Badge */}
      <div className="absolute bottom-2 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>Hemodynamic Rate: <strong className="text-white">{bpm} BPM</strong></span>
        </div>
        <span className="text-slate-400 font-mono text-[11px]">Stroke Volume ~70 mL</span>
      </div>
    </div>
  );
};
