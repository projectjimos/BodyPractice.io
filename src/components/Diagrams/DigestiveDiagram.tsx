import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnatomicalPart } from '../../types';

interface DigestiveDiagramProps {
  parts: AnatomicalPart[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  digestionStage?: number; // 0: Esophagus, 1: Stomach, 2: Intestines
}

export const DigestiveDiagram: React.FC<React.PropsWithChildren<DigestiveDiagramProps>> = ({
  parts,
  selectedPartId,
  onSelectPart,
  digestionStage = 0
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'anatomical' | 'mucosa' | 'callouts'>('anatomical');

  const isSelected = (id: string) => selectedPartId === id;

  // Food particle coordinates based on digestion stage
  const foodCoords = [
    { x: 250, y: 110 }, // Stage 0: Esophagus Bolus
    { x: 280, y: 215 }, // Stage 1: Stomach Chyme Churn
    { x: 250, y: 305 }  // Stage 2: Small Intestine Villi Absorption
  ];

  const currentFoodPos = foodCoords[digestionStage] || foodCoords[0];

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-slate-950 rounded-2xl border border-slate-800/80 p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
      {/* HUD Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-slate-200 font-medium uppercase tracking-wider text-[11px]">
            Gastrointestinal Tract Anatomy
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-950/80 p-0.5 rounded-md border border-slate-800 text-[11px]">
          <button
            onClick={() => setViewMode('anatomical')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'anatomical' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Anatomy
          </button>
          <button
            onClick={() => setViewMode('mucosa')}
            className={`px-2 py-0.5 rounded transition-colors ${viewMode === 'mucosa' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Rugae & Secretions
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
          <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="70%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <radialGradient id="stomachGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </radialGradient>

          <filter id="digestiveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- ESOPHAGUS (Conducting Muscular Tube & Lower Esophageal Sphincter) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('esophagus')}
          onMouseEnter={() => setHoveredId('esophagus')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 250 45 L 250 170"
            stroke={isSelected('esophagus') ? '#34D399' : '#059669'}
            strokeWidth={isSelected('esophagus') ? "18" : "14"}
            strokeLinecap="round"
            filter={isSelected('esophagus') ? "url(#digestiveGlow)" : undefined}
          />
          {/* Peristaltic Wave Rings */}
          <line x1="243" y1="80" x2="257" y2="80" stroke="#6EE7B7" strokeWidth="2" opacity="0.6" />
          <line x1="243" y1="120" x2="257" y2="120" stroke="#6EE7B7" strokeWidth="2" opacity="0.6" />
          {/* Lower Esophageal Sphincter Ring */}
          <circle cx="250" cy="165" r="8" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="3 2" />
        </g>

        {/* --- LIVER & GALLBLADDER (Right Upper Quadrant Gland) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('liver')}
          onMouseEnter={() => setHoveredId('liver')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Right & Left Hepatic Lobes */}
          <path
            d="M 155 165 C 135 175, 145 235, 215 225 C 235 205, 215 165, 155 165 Z"
            fill={isSelected('liver') ? '#D97706' : 'url(#liverGrad)'}
            stroke="#F59E0B"
            strokeWidth={isSelected('liver') ? "3" : "2"}
            filter={isSelected('liver') ? "url(#digestiveGlow)" : undefined}
          />
          {/* Falciform Ligament Divider */}
          <path d="M 180 168 L 185 220" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3 1" />

          {/* Gallbladder (Green Bile Sac Tucked Underneath Liver) */}
          <ellipse cx="205" cy="225" rx="6" ry="10" fill="#16A34A" stroke="#4ADE80" strokeWidth="1.5" />
          {/* Cystic & Common Bile Duct to Duodenum */}
          <path d="M 205 230 Q 220 240 235 235" stroke="#16A34A" strokeWidth="2" fill="none" />
        </g>

        {/* --- STOMACH (Cardia, Fundus, Body, Pylorus with Gastric Rugae) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('stomach')}
          onMouseEnter={() => setHoveredId('stomach')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 240 170 C 230 200, 230 245, 280 245 C 320 245, 310 190, 260 175 Z"
            fill={isSelected('stomach') ? '#F87171' : 'url(#stomachGrad)'}
            stroke={isSelected('stomach') ? '#FCA5A5' : '#EF4444'}
            strokeWidth={isSelected('stomach') ? "4" : "2.5"}
            filter={isSelected('stomach') ? "url(#digestiveGlow)" : undefined}
          />

          {/* Gastric Rugae Longitudinal Mucosal Folds (In Mucosa Mode) */}
          {(viewMode === 'mucosa' || isSelected('stomach')) && (
            <g stroke="#FCA5A5" strokeWidth="1.5" fill="none" opacity="0.8">
              <path d="M 250 185 Q 260 210 275 235" />
              <path d="M 260 185 Q 275 210 290 230" />
              <path d="M 270 185 Q 285 205 300 220" />
            </g>
          )}

          {/* Hydrochloric Acid (HCl pH ~1.5 - 2.0 Pool) */}
          <path
            d="M 240 215 C 250 225, 290 225, 305 215 C 300 240, 275 240, 245 225 Z"
            fill="#FDE047"
            fillOpacity="0.55"
          />

          {/* Pyloric Sphincter Valve Ring */}
          <circle cx="235" cy="235" r="6" fill="none" stroke="#FFF" strokeWidth="2" />
        </g>

        {/* --- PANCREAS & DUODENUM C-LOOP --- */}
        <g className="pointer-events-none">
          {/* Pancreas Gland (Retroperitoneal Behind Stomach) */}
          <path d="M 235 235 Q 270 230 300 225" stroke="#FBBF24" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85" />
          {/* Main Pancreatic Duct */}
          <path d="M 238 235 Q 270 230 295 225" stroke="#FFF" strokeWidth="1.5" fill="none" />
        </g>

        {/* --- LARGE INTESTINE / COLON FRAME (Caecum, Appendix, Ascending, Transverse, Descending) --- */}
        <g stroke="#9A3412" strokeWidth="16" fill="none" opacity="0.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Ascending -> Transverse -> Descending Colon frame surrounding small intestine */}
          <path d="M 180 340 L 180 250 L 320 250 L 320 340" />
        </g>

        {/* --- SMALL INTESTINE (Duodenum, Jejunum, Ileum with Plicae Circulares) --- */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectPart('small-intestine')}
          onMouseEnter={() => setHoveredId('small-intestine')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <path
            d="M 235 245 Q 285 255 245 270 Q 205 285 255 300 Q 295 315 245 330 Q 215 340 250 350"
            fill="none"
            stroke={isSelected('small-intestine') ? '#FBBF24' : '#D97706'}
            strokeWidth={isSelected('small-intestine') ? "16" : "13"}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={isSelected('small-intestine') ? "url(#digestiveGlow)" : undefined}
          />
          {/* Plicae Circulares Ribbed Pattern */}
          <path
            d="M 235 245 Q 285 255 245 270 Q 205 285 255 300 Q 295 315 245 330 Q 215 340 250 350"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="3"
            strokeDasharray="2 4"
            strokeLinecap="round"
          />
        </g>

        {/* --- ANIMATED DIGESTIVE FOOD PARTICLE (Chyme) --- */}
        <motion.g
          animate={{ x: currentFoodPos.x, y: currentFoodPos.y }}
          transition={{ duration: 0.9, type: "spring", stiffness: 120 }}
        >
          <circle cx="0" cy="0" r="11" fill="#FDE047" stroke="#854D0E" strokeWidth="2" className="animate-pulse" />
          <text x="0" y="4" textAnchor="middle" fontSize="10">🍎</text>
        </motion.g>

        {/* --- CLINICAL CALLOUT LINES --- */}
        {(viewMode === 'callouts' || selectedPartId) && (
          <g className="pointer-events-none text-[10px] font-mono" opacity="0.85">
            <line x1="250" y1="100" x2="160" y2="80" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3" />
            <text x="155" y="75" textAnchor="end" fill="#6EE7B7">Esophagus (Peristalsis)</text>

            <line x1="180" y1="190" x2="90" y2="180" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
            <text x="85" y="175" textAnchor="end" fill="#FCD34D">Liver & Gallbladder (Bile)</text>

            <line x1="280" y1="210" x2="380" y2="190" stroke="#F87171" strokeWidth="1" strokeDasharray="3 3" />
            <text x="385" y="185" textAnchor="start" fill="#FCA5A5">Stomach (Gastric Rugae & HCl)</text>

            <line x1="250" y1="310" x2="150" y2="340" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" />
            <text x="145" y="345" textAnchor="end" fill="#FEF08A">Small Intestine (Villi & Plicae)</text>
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
          <text x="25" y="-6" textAnchor="middle" fill="#CBD5E1" fontSize="9">25 cm</text>
        </g>

        <g transform="translate(480, 385)" className="pointer-events-none text-[9px] font-mono" fill="#94A3B8">
          <text x="-15" y="3" textAnchor="end" fill="#38BDF8">R</text>
          <text x="15" y="3" textAnchor="start" fill="#38BDF8">L</text>
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#475569" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Digestion Progress Bar */}
      <div className="absolute bottom-2 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <span>Bolus Transit: <strong className="text-amber-400">{digestionStage === 0 ? "Deglutition (Esophageal Transit)" : digestionStage === 1 ? "Gastric Churning (HCl Acid pH 1.8)" : "Duodenal Villi Absorption (Bile & Enzymes)"}</strong></span>
        <span className="text-slate-400 font-mono text-[11px]">GI Tract ~9 Meters</span>
      </div>
    </div>
  );
};
