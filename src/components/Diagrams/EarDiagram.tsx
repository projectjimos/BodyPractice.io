import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnatomicalPart } from '../../types';

interface EarDiagramProps {
  parts: AnatomicalPart[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  soundFrequency?: number; // 20 - 20000 Hz
  soundDb?: number; // 0 - 120 dB
  isHeadRotating?: boolean;
}

export const EarDiagram: React.FC<EarDiagramProps> = ({
  parts,
  selectedPartId,
  onSelectPart,
  soundFrequency = 1000,
  soundDb = 60,
  isHeadRotating = false
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'poster' | 'acoustic' | 'labels'>('poster');

  const activeId = hoveredId || selectedPartId;
  const isSelected = (id: string) => selectedPartId === id;
  const isHovered = (id: string) => hoveredId === id;
  const isActive = (id: string) => isSelected(id) || isHovered(id);

  // Sound wave animation speeds
  const waveDuration = Math.max(0.3, Math.min(1.8, 3000 / (soundFrequency + 400)));
  const vibrationAmp = Math.max(1, Math.min(7, soundDb / 15));

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-[#FFFDF9] rounded-2xl border-2 border-stone-300 p-3 shadow-2xl flex flex-col items-center justify-between overflow-hidden text-stone-800">
      
      {/* --- CLINICAL POSTER TOP HEADER --- */}
      <div className="w-full flex items-center justify-between px-3 pt-1 pb-2 border-b border-stone-200 bg-[#FAF7F0]/80 backdrop-blur-sm rounded-t-xl">
        <div>
          <h2 className="font-serif font-bold text-base sm:text-lg tracking-wider uppercase text-stone-900 leading-none">
            Ear Anatomy
          </h2>
          <p className="text-[10px] sm:text-[11px] font-sans text-stone-500 font-medium tracking-wide">
            Human Auditory & Vestibular System • Medical Education Chart
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-stone-200/80 p-0.5 rounded-lg border border-stone-300 text-[11px] font-medium">
          <button
            onClick={() => setViewMode('poster')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'poster'
                ? 'bg-amber-700 text-white shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Clinical Chart
          </button>
          <button
            onClick={() => setViewMode('acoustic')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'acoustic'
                ? 'bg-cyan-700 text-white shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sound Waves & Physics
          </button>
          <button
            onClick={() => setViewMode('labels')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'labels'
                ? 'bg-rose-700 text-white shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Callout Labels
          </button>
        </div>
      </div>

      {/* --- SVG CLINICAL ILLUSTRATION CANVAS --- */}
      <svg viewBox="0 0 620 420" className="w-full h-full select-none overflow-visible py-1">
        <defs>
          {/* Flesh / Skin Pinna Gradient */}
          <linearGradient id="fleshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7C4B0" />
            <stop offset="50%" stopColor="#E59B82" />
            <stop offset="100%" stopColor="#C9755B" />
          </linearGradient>

          {/* Cartilage Tissue Soft Yellow/Orange */}
          <linearGradient id="cartilageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Temporal Bone Pinkish/Tan Tissue */}
          <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D5C6" />
            <stop offset="70%" stopColor="#E8BEAA" />
            <stop offset="100%" stopColor="#D29F89" />
          </linearGradient>

          {/* Temporal Muscle Red/Brown */}
          <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Inner Ear Golden-Amber Labyrinth */}
          <linearGradient id="innerEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- TEMPORAL BONE BACKGROUND ROCK MATRIX --- */}
        <path
          d="M 140 40 L 590 40 L 590 350 L 140 350 Q 180 220 140 40 Z"
          fill="url(#boneGrad)"
          stroke="#B4826E"
          strokeWidth="1.5"
        />

        {/* Temporal Muscle Layer at Top Left */}
        <path
          d="M 140 40 L 220 40 L 210 130 C 180 120, 160 80, 140 40 Z"
          fill="url(#muscleGrad)"
          stroke="#7F1D1D"
          strokeWidth="1"
          opacity="0.85"
        />

        {/* Cartilage Blocks around Outer Ear Canal */}
        <path
          d="M 140 140 L 165 140 C 170 170, 170 200, 160 230 L 135 230 C 145 200, 145 170, 140 140 Z"
          fill="url(#cartilageGrad)"
          stroke="#D97706"
          strokeWidth="1"
        />
        <circle cx="152" cy="180" r="4" fill="#3B82F6" opacity="0.6" />
        <circle cx="150" cy="275" r="4" fill="#3B82F6" opacity="0.6" />
        <circle cx="162" cy="285" r="4" fill="#3B82F6" opacity="0.6" />

        <path
          d="M 135 260 L 170 260 C 175 280, 170 310, 150 330 L 130 320 C 145 300, 145 280, 135 260 Z"
          fill="url(#cartilageGrad)"
          stroke="#D97706"
          strokeWidth="1"
        />

        {/* --- TYMPANIC AIR CAVITY (MIDDLE EAR CAVITY) --- */}
        <path
          d="M 255 170 C 260 140, 310 130, 320 160 C 330 200, 310 250, 275 265 L 255 240 Z"
          fill="#C25A48"
          stroke="#991B1B"
          strokeWidth="1.5"
        />

        {/* --- 1. OUTER EAR: PINNA / AURICLE --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('pinna')}
          onMouseEnter={() => setHoveredId('pinna')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Main Pinna Contour */}
          <path
            d="M 140 40 C 30 50, 10 180, 35 290 C 50 350, 100 365, 125 320 C 95 300, 70 230, 85 170 C 100 110, 140 90, 140 40 Z"
            fill="url(#fleshGrad)"
            stroke={isActive('pinna') ? '#2563EB' : '#A75239'}
            strokeWidth={isActive('pinna') ? "3" : "2"}
            filter={isActive('pinna') ? "url(#activeGlow)" : undefined}
          />
          {/* Internal Concha & Helix Ridge Line Shadows */}
          <path d="M 60 110 C 45 150, 60 210, 95 220 C 85 180, 75 140, 90 100" fill="none" stroke="#B85D43" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 75 210 Q 95 230 110 200" fill="none" stroke="#B85D43" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* --- 2. OUTER EAR: EAR CANAL (EXTERNAL AUDITORY MEATUS) --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('ear-canal')}
          onMouseEnter={() => setHoveredId('ear-canal')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Flesh-toned Canal Path leading to eardrum */}
          <path
            d="M 105 190 Q 180 180 255 205 L 255 240 Q 180 210 105 220 Z"
            fill="#E08B73"
            stroke={isActive('ear-canal') ? '#2563EB' : '#A75239'}
            strokeWidth={isActive('ear-canal') ? "3" : "1.8"}
            filter={isActive('ear-canal') ? "url(#activeGlow)" : undefined}
          />
          {/* Ceruminous Glands & Fine Cilia Hairs */}
          {[125, 150, 175, 200, 225].map((x, i) => (
            <React.Fragment key={x}>
              <line x1={x} y1={191 + i * 1.2} x2={x + 2} y2={197 + i * 1.2} stroke="#B45309" strokeWidth="1.5" />
              <line x1={x + 5} y1={224 - i * 0.5} x2={x + 7} y2={218 - i * 0.5} stroke="#B45309" strokeWidth="1.5" />
            </React.Fragment>
          ))}
        </g>

        {/* --- ACOUSTIC SOUND WAVE ANIMATION (WHEN IN SOUND MODE) --- */}
        {(viewMode === 'acoustic' || isActive('ear-canal') || isActive('eardrum')) && (
          <g className="pointer-events-none">
            {[1, 2, 3, 4].map((i) => (
              <motion.path
                key={i}
                d="M 35 200 Q 140 180 250 220"
                fill="none"
                stroke="#0284C7"
                strokeWidth={Math.max(2, soundDb / 20)}
                strokeDasharray="6 6"
                animate={{
                  x: [0, 180],
                  opacity: [0, 0.9, 0]
                }}
                transition={{
                  duration: waveDuration,
                  repeat: Infinity,
                  delay: i * (waveDuration / 4),
                  ease: "linear"
                }}
              />
            ))}
          </g>
        )}

        {/* --- 3. MIDDLE EAR: TYMPANIC MEMBRANE (EARDRUM) --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('eardrum')}
          onMouseEnter={() => setHoveredId('eardrum')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Blue Translucent Cone Membrane */}
          <motion.path
            d="M 255 205 Q 262 222 255 240 Q 248 222 255 205 Z"
            fill="#38BDF8"
            fillOpacity="0.8"
            stroke={isActive('eardrum') ? '#0284C7' : '#0284C7'}
            strokeWidth={isActive('eardrum') ? "3.5" : "2"}
            animate={{
              x: [0, vibrationAmp, -vibrationAmp / 2, 0]
            }}
            transition={{
              duration: waveDuration / 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            filter={isActive('eardrum') ? "url(#activeGlow)" : undefined}
          />
        </g>

        {/* --- 4. MIDDLE EAR: AUDITORY OSSICLES (MALLEUS, INCUS, STAPES) --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('ossicles')}
          onMouseEnter={() => setHoveredId('ossicles')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Malleus (Hammer) */}
          <motion.path
            d="M 258 218 L 285 185 L 292 175 C 295 168, 288 162, 282 168 C 278 175, 272 195, 258 218 Z"
            fill="#FFFDF9"
            stroke={isActive('ossicles') ? '#2563EB' : '#475569'}
            strokeWidth={isActive('ossicles') ? "2.5" : "1.8"}
            animate={{
              rotate: [0, vibrationAmp * 0.7, 0]
            }}
            style={{ transformOrigin: "285px 175px" }}
            transition={{ duration: waveDuration / 2, repeat: Infinity }}
            filter={isActive('ossicles') ? "url(#activeGlow)" : undefined}
          />

          {/* Incus (Anvil) */}
          <motion.path
            d="M 288 173 L 315 175 L 318 205 L 306 207 L 300 188 Z"
            fill="#F8FAFC"
            stroke={isActive('ossicles') ? '#2563EB' : '#475569'}
            strokeWidth={isActive('ossicles') ? "2.5" : "1.8"}
            animate={{
              rotate: [0, -vibrationAmp * 0.5, 0]
            }}
            style={{ transformOrigin: "302px 175px" }}
            transition={{ duration: waveDuration / 2, repeat: Infinity }}
          />

          {/* Stapes (Stirrup on Oval Window) */}
          <motion.g
            animate={{
              x: [0, vibrationAmp * 0.5, 0]
            }}
            transition={{ duration: waveDuration / 2, repeat: Infinity }}
          >
            {/* Stirrup Arch */}
            <path d="M 318 202 L 342 196 L 342 214 L 318 208 Z" fill="#FFFDF9" stroke={isActive('ossicles') ? '#2563EB' : '#475569'} strokeWidth="1.8" />
            {/* Oval Window Ring */}
            <ellipse cx="342" cy="205" rx="3" ry="9" fill="#FFFDF9" stroke="#0284C7" strokeWidth="2" />
          </motion.g>
        </g>

        {/* --- 5. MIDDLE EAR: EUSTACHIAN TUBE --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('eustachian-tube')}
          onMouseEnter={() => setHoveredId('eustachian-tube')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Slanted Tube down toward nasopharynx */}
          <path
            d="M 275 265 L 380 340 L 405 325 L 310 250 Z"
            fill="#B91C1C"
            stroke={isActive('eustachian-tube') ? '#2563EB' : '#7F1D1D'}
            strokeWidth={isActive('eustachian-tube') ? "2.5" : "1.5"}
            filter={isActive('eustachian-tube') ? "url(#activeGlow)" : undefined}
          />
        </g>

        {/* --- 6. INNER EAR: VESTIBULAR APPARATUS & SEMICIRCULAR CANALS --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('semicircular-canals')}
          onMouseEnter={() => setHoveredId('semicircular-canals')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Superior Canal Loop */}
          <path
            d="M 355 185 C 355 100, 425 90, 440 160"
            fill="none"
            stroke={isActive('semicircular-canals') ? '#2563EB' : 'url(#innerEarGrad)'}
            strokeWidth={isActive('semicircular-canals') ? "14" : "10"}
            strokeLinecap="round"
            filter={isActive('semicircular-canals') ? "url(#activeGlow)" : undefined}
          />
          <path d="M 363 182 C 363 112, 418 102, 432 158" fill="none" stroke="#FFFDF9" strokeWidth="3" />

          {/* Posterior Canal Loop */}
          <path
            d="M 435 160 C 510 145, 520 230, 450 230"
            fill="none"
            stroke={isActive('semicircular-canals') ? '#2563EB' : 'url(#innerEarGrad)'}
            strokeWidth={isActive('semicircular-canals') ? "14" : "10"}
            strokeLinecap="round"
          />
          <path d="M 435 168 C 498 155, 508 222, 448 222" fill="none" stroke="#FFFDF9" strokeWidth="3" />

          {/* Lateral (Horizontal) Canal Loop */}
          <path
            d="M 368 178 C 425 165, 465 190, 415 208"
            fill="none"
            stroke={isActive('semicircular-canals') ? '#2563EB' : 'url(#innerEarGrad)'}
            strokeWidth={isActive('semicircular-canals') ? "14" : "10"}
            strokeLinecap="round"
          />
          <path d="M 376 180 C 422 170, 452 188, 412 201" fill="none" stroke="#FFFDF9" strokeWidth="3" />

          {/* Vestibule Chamber Body connecting canals to cochlea */}
          <ellipse cx="360" cy="195" rx="18" ry="24" fill="url(#innerEarGrad)" stroke="#B45309" strokeWidth="1.5" />

          {/* Endolymph Fluid Movement Indicator */}
          {(isHeadRotating || viewMode === 'acoustic') && (
            <motion.circle
              cx="390"
              cy="125"
              r="4"
              fill="#FFFFFF"
              animate={{
                cx: [365, 420, 365],
                cy: [130, 115, 130]
              }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </g>

        {/* --- 7. INNER EAR: COCHLEA (SNAIL SHELL SPIRAL) --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('cochlea')}
          onMouseEnter={() => setHoveredId('cochlea')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Snail Spiral Shell Body */}
          <path
            d="M 365 210 C 420 185, 495 210, 480 270 C 465 320, 400 305, 415 255 C 428 225, 455 238, 448 258"
            fill="none"
            stroke={isActive('cochlea') ? '#2563EB' : 'url(#innerEarGrad)'}
            strokeWidth={isActive('cochlea') ? "26" : "22"}
            strokeLinecap="round"
            filter={isActive('cochlea') ? "url(#activeGlow)" : undefined}
          />
          <path
            d="M 365 210 C 420 185, 495 210, 480 270 C 465 320, 400 305, 415 255 C 428 225, 455 238, 448 258"
            fill="none"
            stroke="#FFFDF9"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
        </g>

        {/* --- 8. VESTIBULOCOCHLEAR NERVE (CN VIII) --- */}
        <g
          className="cursor-pointer transition-all duration-200"
          onClick={() => onSelectPart('auditory-nerve')}
          onMouseEnter={() => setHoveredId('auditory-nerve')}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Yellow Nerve Trunk branches */}
          <path
            d="M 440 250 Q 480 220 575 190 M 375 195 Q 450 190 575 180"
            stroke={isActive('auditory-nerve') ? '#2563EB' : '#FACC15'}
            strokeWidth={isActive('auditory-nerve') ? "8" : "6"}
            fill="none"
            strokeLinecap="round"
            filter={isActive('auditory-nerve') ? "url(#activeGlow)" : undefined}
          />
          {/* Nerve Fiber Action Potential Pulses */}
          <motion.path
            d="M 440 250 Q 480 220 575 190"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeDasharray="6 8"
            animate={{
              strokeDashoffset: [-60, 0]
            }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* --- CLINICAL POSTER POINTER LINES & ANATOMICAL LABELS --- */}
        <g className="pointer-events-none text-[10px] sm:text-[11px] font-sans font-medium text-stone-800">
          
          {/* TOP CALLOUT POINTERS */}
          
          {/* Temporal Muscle */}
          <line x1="175" y1="65" x2="160" y2="25" stroke="#475569" strokeWidth="1" />
          <circle cx="175" cy="65" r="2" fill="#475569" />
          <text x="160" y="20" textAnchor="end" fill="#1C1917" className="font-sans">Temporal muscle</text>

          {/* Temporal Bone */}
          <line x1="230" y1="80" x2="215" y2="25" stroke="#475569" strokeWidth="1" />
          <circle cx="230" cy="80" r="2" fill="#475569" />
          <text x="215" y="20" textAnchor="end" fill="#1C1917" className="font-sans">Temporal bone</text>

          {/* Malleus */}
          <line x1="285" y1="175" x2="270" y2="25" stroke="#475569" strokeWidth="1" />
          <circle cx="285" cy="175" r="2" fill="#475569" />
          <text x="270" y="20" textAnchor="end" fill="#1C1917" className="font-sans">Malleus</text>

          {/* Incus */}
          <line x1="302" y1="175" x2="315" y2="25" stroke="#475569" strokeWidth="1" />
          <circle cx="302" cy="175" r="2" fill="#475569" />
          <text x="315" y="20" textAnchor="start" fill="#1C1917" className="font-sans">Incus</text>

          {/* Stapes */}
          <line x1="330" y1="200" x2="360" y2="25" stroke="#475569" strokeWidth="1" />
          <circle cx="330" cy="200" r="2" fill="#475569" />
          <text x="360" y="20" textAnchor="start" fill="#1C1917" className="font-sans">Stapes</text>

          {/* Semicircular Canals */}
          <line x1="420" y1="120" x2="435" y2="25" stroke="#475569" strokeWidth="1" />
          <circle cx="420" cy="120" r="2" fill="#475569" />
          <text x="435" y="20" textAnchor="start" fill="#1C1917" className="font-sans">Semicircular canals</text>

          {/* Vestibular Apparatus */}
          <line x1="460" y1="165" x2="520" y2="45" stroke="#475569" strokeWidth="1" />
          <circle cx="460" cy="165" r="2" fill="#475569" />
          <text x="525" y="42" textAnchor="start" fill="#1C1917" className="font-sans">Vestibular apparatus</text>

          {/* Nerves (CN VIII) */}
          <line x1="510" y1="205" x2="550" y2="100" stroke="#475569" strokeWidth="1" />
          <circle cx="510" cy="205" r="2" fill="#475569" />
          <text x="555" y="98" textAnchor="start" fill="#1C1917" className="font-sans">CN VIII Nerves</text>

          {/* Cochlea */}
          <line x1="470" y1="260" x2="560" y2="155" stroke="#475569" strokeWidth="1" />
          <circle cx="470" cy="260" r="2" fill="#475569" />
          <text x="565" y="152" textAnchor="start" fill="#1C1917" className="font-sans">Cochlea</text>


          {/* BOTTOM CALLOUT POINTERS */}

          {/* Cartilage */}
          <line x1="150" y1="300" x2="150" y2="355" stroke="#475569" strokeWidth="1" />
          <circle cx="150" cy="300" r="2" fill="#475569" />
          <text x="150" y="367" textAnchor="middle" fill="#1C1917" className="font-sans">Cartilage</text>

          {/* Ear Canal */}
          <line x1="190" y1="215" x2="205" y2="355" stroke="#475569" strokeWidth="1" />
          <circle cx="190" cy="215" r="2" fill="#475569" />
          <text x="205" y="367" textAnchor="middle" fill="#1C1917" className="font-sans">Ear canal</text>

          {/* Tympanic Membrane */}
          <line x1="255" y1="230" x2="270" y2="355" stroke="#475569" strokeWidth="1" />
          <circle cx="255" cy="230" r="2" fill="#475569" />
          <text x="270" y="367" textAnchor="middle" fill="#1C1917" className="font-sans">Tympanic membrane</text>

          {/* Tympanic Cavity */}
          <line x1="290" y1="245" x2="335" y2="355" stroke="#475569" strokeWidth="1" />
          <circle cx="290" cy="245" r="2" fill="#475569" />
          <text x="335" y="367" textAnchor="middle" fill="#1C1917" className="font-sans">Tympanic cavity</text>

          {/* Oval Window */}
          <line x1="342" y1="205" x2="400" y2="355" stroke="#475569" strokeWidth="1" />
          <circle cx="342" cy="205" r="2" fill="#475569" />
          <text x="400" y="367" textAnchor="middle" fill="#1C1917" className="font-sans">Oval window</text>

          {/* Eustachian Tube */}
          <line x1="350" y1="310" x2="475" y2="355" stroke="#475569" strokeWidth="1" />
          <circle cx="350" cy="310" r="2" fill="#475569" />
          <text x="475" y="367" textAnchor="middle" fill="#1C1917" className="font-sans">Eustachian tube</text>
        </g>

        {/* --- INTERACTIVE PINS WITH SELECTION TARGET RINGS --- */}
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
              <circle
                r={active ? "14" : "9"}
                fill="none"
                stroke={active ? "#2563EB" : part.color}
                strokeWidth={active ? "3" : "2"}
                className={active ? "animate-ping opacity-75" : "opacity-80"}
              />
              <circle
                r={active ? "6" : "4.5"}
                fill={active ? "#2563EB" : part.color}
                stroke="#FFF"
                strokeWidth="1.5"
              />
            </g>
          );
        })}
      </svg>

      {/* --- THREE CLINICAL COLOR BANDS AT THE BOTTOM (EXACTLY LIKE POSTER) --- */}
      <div className="w-full grid grid-cols-3 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 rounded-b-xl border-t border-stone-300 overflow-hidden shadow-inner">
        <div className="bg-[#F8C8B6] py-2 border-r border-stone-300 flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#E59B82]" />
          Outer Ear
        </div>
        <div className="bg-[#F5A9A0] py-2 border-r border-stone-300 flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#C25A48]" />
          Middle Ear
        </div>
        <div className="bg-[#FCD34D] py-2 flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          Inner Ear
        </div>
      </div>

      {/* Active Part Hover/Selection Footer Banner */}
      {activeId && (
        <div className="absolute bottom-11 left-4 right-4 bg-stone-900/90 text-stone-100 text-xs px-3.5 py-2 rounded-xl backdrop-blur-md shadow-xl flex items-center justify-between border border-stone-700 animate-fadeIn">
          <div className="flex items-center gap-2 truncate">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: parts.find(p => p.id === activeId)?.color || '#2563EB' }}
            />
            <span className="font-bold text-amber-300">
              {parts.find(p => p.id === activeId)?.name}
            </span>
            <span className="text-stone-300 text-[11px] truncate hidden sm:inline">
              — {parts.find(p => p.id === activeId)?.functionSummary}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded border border-amber-700/50 shrink-0 ml-2">
            Click for Details
          </span>
        </div>
      )}
    </div>
  );
};
