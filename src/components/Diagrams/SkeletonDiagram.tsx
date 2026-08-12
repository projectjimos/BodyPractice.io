import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnatomicalPart } from '../../types';

interface SkeletonDiagramProps {
  parts: AnatomicalPart[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  isFlexed?: boolean;
}

export const SkeletonDiagram: React.FC<SkeletonDiagramProps> = ({
  parts,
  selectedPartId,
  onSelectPart,
  isFlexed = false
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'anatomical' | 'histology' | 'callouts'>('anatomical');

  const isSelected = (id: string) => selectedPartId === id;

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-slate-950 rounded-2xl border border-slate-800/80 p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
      {/* HUD Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-200 animate-pulse" />
          <span className="font-mono text-slate-200 font-medium uppercase tracking-wider text-[11px]">
            Musculoskeletal Osteology
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-950/80 p-0.5 rounded-md border border-slate-800 text-[11px]">
          <button
            onClick={() => setViewMode('anatomical')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'anatomical' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Anatomy
          </button>
          <button
            onClick={() => setViewMode('histology')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'histology' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Compact/Spongy Bone
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
          <radialGradient id="boneGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </radialGradient>

          <filter id="boneGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- CRANIUM (Skull with Sutures) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('cranium')}
          onMouseEnter={() => setHoveredId('cranium')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Cranial Vault */}
          <path
            d="M 220 70 C 220 25, 280 25, 280 70 C 280 95, 270 100, 250 100 C 230 100, 220 95, 220 70 Z"
            fill={isSelected('cranium') ? '#FFFFFF' : 'url(#boneGrad)'}
            stroke={isSelected('cranium') ? '#38BDF8' : '#64748B'}
            strokeWidth={isSelected('cranium') ? "3" : "2"}
            filter={isSelected('cranium') ? "url(#boneGlow)" : undefined}
          />
          {/* Coronal & Sagittal Suture Lines */}
          <path d="M 230 45 Q 250 50 270 45" stroke="#64748B" strokeWidth="1" strokeDasharray="2 1" />
          <path d="M 250 30 L 250 60" stroke="#64748B" strokeWidth="1" strokeDasharray="2 1" />
          {/* Eye Sockets (Orbit Cavities) */}
          <ellipse cx="238" cy="65" rx="8" ry="10" fill="#020617" stroke="#475569" strokeWidth="1" />
          <ellipse cx="262" cy="65" rx="8" ry="10" fill="#020617" stroke="#475569" strokeWidth="1" />
          {/* Nasal Cavity Piriform Aperture */}
          <polygon points="250,75 246,85 254,85" fill="#020617" />
          {/* Mandible (Jawbone with Temporomandibular Joint) */}
          <path d="M 235 90 L 265 90 L 260 102 C 255 105, 245 105, 240 102 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
        </g>

        {/* --- VERTEBRAL COLUMN (24 Individual Vertebrae + Discs) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('spine')}
          onMouseEnter={() => setHoveredId('spine')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Spine Vertebral Bodies */}
          <line
            x1="250"
            y1="102"
            x2="250"
            y2="280"
            stroke={isSelected('spine') ? '#F59E0B' : '#94A3B8'}
            strokeWidth="12"
            strokeDasharray="6 2"
          />
          {/* Intervertebral Fibrocartilage Discs */}
          {[115, 130, 145, 160, 175, 190, 205, 220, 235, 250, 265].map((y) => (
            <line key={y} x1="243" y1={y} x2="257" y2={y} stroke="#38BDF8" strokeWidth="2.5" />
          ))}
        </g>

        {/* --- RIBCAGE & STERNUM --- */}
        <g>
          {/* Sternum (Manubrium, Body, Xiphoid Process) */}
          <path d="M 247 118 L 253 118 L 252 195 L 248 195 Z" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
          {/* 12 Rib Pairs with Costal Cartilages */}
          {[120, 135, 150, 165, 180, 195, 210].map((y, i) => (
            <React.Fragment key={y}>
              <path d={`M 247 ${y} Q ${195 - i * 3} ${y - 12} ${185 - i * 2} ${y + 15}`} stroke="#CBD5E1" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d={`M 253 ${y} Q ${305 + i * 3} ${y - 12} ${315 + i * 2} ${y + 15}`} stroke="#CBD5E1" strokeWidth="4" fill="none" strokeLinecap="round" />
            </React.Fragment>
          ))}
        </g>

        {/* --- FEMUR OSTEOLOGY (Longest & Strongest Bone) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('femur')}
          onMouseEnter={() => setHoveredId('femur')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Left Femur Head, Neck, Shaft & Condyles */}
          <line x1="225" y1="280" x2="210" y2="390" stroke={isSelected('femur') ? '#38BDF8' : 'url(#boneGrad)'} strokeWidth="11" strokeLinecap="round" />
          <circle cx="230" cy="280" r="7" fill="#E2E8F0" stroke="#64748B" /> {/* Femoral Head */}

          {/* Right Femur */}
          <line x1="275" y1="280" x2="290" y2="390" stroke={isSelected('femur') ? '#38BDF8' : 'url(#boneGrad)'} strokeWidth="11" strokeLinecap="round" />
          <circle cx="270" cy="280" r="7" fill="#E2E8F0" stroke="#64748B" />
        </g>

        {/* BONE HISTOLOGY CANCELLOUS TRABECULAR INSET (When in 'histology' mode) */}
        {viewMode === 'histology' && (
          <g transform="translate(370, 310)" className="pointer-events-none">
            <circle cx="0" cy="0" r="32" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
            {/* Spongy Trabecular Lattice Network */}
            <path d="M -20 -10 L 10 20 M -10 -20 L 20 10 M -20 10 L 20 -10 M -5 -25 L -5 25" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 1" />
            <text x="0" y="30" textAnchor="middle" fill="#FBBF24" fontSize="8" fontFamily="monospace">Trabecular Spongy Bone</text>
          </g>
        )}

        {/* --- BICEPS & TRICEPS ANATOMICAL ARM MECHANICS --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('biceps-triceps')}
          onMouseEnter={() => setHoveredId('biceps-triceps')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Humerus Upper Arm Bone */}
          <line x1="185" y1="130" x2="145" y2="210" stroke="#E2E8F0" strokeWidth="9" />

          {/* Biceps Brachii Muscle Belly (Agonist - Bulges on Flexion) */}
          <motion.ellipse
            cx="170"
            cy="165"
            rx={isFlexed ? "15" : "9"}
            ry="25"
            fill="#F59E0B"
            stroke="#FCD34D"
            strokeWidth="2"
            animate={{
              rx: isFlexed ? 16 : 9,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Triceps Brachii Muscle Belly (Antagonist - Stretches on Flexion) */}
          <motion.ellipse
            cx="155"
            cy="172"
            rx={isFlexed ? "6" : "12"}
            ry="23"
            fill="#D97706"
            stroke="#B45309"
            strokeWidth="1.5"
            animate={{
              rx: isFlexed ? 6 : 12,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Forearm Radius & Ulna Bones (Rotates on Flexion) */}
          <motion.line
            x1="145"
            y1="210"
            x2={isFlexed ? "125" : "115"}
            y2={isFlexed ? "140" : "270"}
            stroke="#E2E8F0"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.4 }}
          />

          {/* Tendon Insertion onto Radial Tuberosity */}
          <line x1="165" y1="185" x2="145" y2="210" stroke="#FFF" strokeWidth="2" strokeDasharray="3 1" />
        </g>

        {/* --- CLINICAL CALLOUT LINES --- */}
        {(viewMode === 'callouts' || selectedPartId) && (
          <g className="pointer-events-none text-[10px] font-mono" opacity="0.85">
            <line x1="250" y1="35" x2="170" y2="20" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            <text x="165" y="15" textAnchor="end" fill="#F8FAFC">Cranium (Sutures & Orbits)</text>

            <line x1="250" y1="180" x2="150" y2="180" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
            <text x="145" y="175" textAnchor="end" fill="#FDE047">Spine (Vertebrae & Discs)</text>

            <line x1="215" y1="330" x2="120" y2="350" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <text x="115" y="355" textAnchor="end" fill="#7DD3FC">Femur (Diaphysis & Head)</text>

            <line x1="170" y1="160" x2="80" y2="120" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
            <text x="75" y="115" textAnchor="end" fill="#FDE047">Biceps Brachii (Agonist)</text>
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
          <text x="25" y="-6" textAnchor="middle" fill="#CBD5E1" fontSize="9">30 cm</text>
        </g>

        <g transform="translate(480, 385)" className="pointer-events-none text-[9px] font-mono" fill="#94A3B8">
          <text x="0" y="-12" textAnchor="middle" fill="#38BDF8">Sup</text>
          <text x="0" y="16" textAnchor="middle" fill="#94A3B8">Inf</text>
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#475569" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Joint State Bar */}
      <div className="absolute bottom-2 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <span>Elbow Articulation: <strong className={isFlexed ? "text-amber-400" : "text-cyan-400"}>{isFlexed ? "Flexed (~45° Angle)" : "Extended (180° Anatomical Position)"}</strong></span>
        <span>Bone Count: <strong className="text-slate-200">206 Adult Bones</strong></span>
      </div>
    </div>
  );
};
