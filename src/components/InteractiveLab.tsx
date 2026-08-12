import React, { useState } from 'react';
import { Sun, Eye, Activity, Heart, Wind, Dumbbell, Utensils, Sparkles, Compass, Radio } from 'lucide-react';
import { OrganSystem } from '../types';
import { EyeDiagram } from './Diagrams/EyeDiagram';
import { BrainDiagram } from './Diagrams/BrainDiagram';
import { HeartDiagram } from './Diagrams/HeartDiagram';
import { LungsDiagram } from './Diagrams/LungsDiagram';
import { SkeletonDiagram } from './Diagrams/SkeletonDiagram';
import { DigestiveDiagram } from './Diagrams/DigestiveDiagram';
import { EarDiagram } from './Diagrams/EarDiagram';

interface InteractiveLabProps {
  organSystem: OrganSystem;
  onSelectPart: (partId: string) => void;
  selectedPartId: string | null;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({
  organSystem,
  onSelectPart,
  selectedPartId
}) => {
  const [brightness, setBrightness] = useState(50);
  const [focusDistance, setFocusDistance] = useState(50);
  const [activeActivity, setActiveActivity] = useState<string | null>('vision');
  const [bpm, setBpm] = useState(72);
  const [isInhaling, setIsInhaling] = useState(true);
  const [isFlexed, setIsFlexed] = useState(false);
  const [digestionStage, setDigestionStage] = useState(0);
  const [soundFrequency, setSoundFrequency] = useState(1000);
  const [soundDb, setSoundDb] = useState(60);
  const [isHeadRotating, setIsHeadRotating] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Simulation Lab
              </span>
              <h3 className="text-lg font-bold text-white">
                {organSystem.labControls.title}
              </h3>
            </div>
            <div className="text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-300 font-mono">
              Illustrative Teaching Model
            </div>
          </div>

          {organSystem.id === 'eye' && (
            <EyeDiagram
              parts={organSystem.parts}
              selectedPartId={selectedPartId}
              onSelectPart={onSelectPart}
              brightness={brightness}
              focusDistance={focusDistance}
              showLightRays={true}
            />
          )}

          {organSystem.id === 'brain' && (
            <BrainDiagram
              parts={organSystem.parts}
              selectedPartId={selectedPartId}
              onSelectPart={onSelectPart}
              activeActivity={activeActivity}
            />
          )}

          {organSystem.id === 'heart' && (
            <HeartDiagram
              parts={organSystem.parts}
              selectedPartId={selectedPartId}
              onSelectPart={onSelectPart}
              bpm={bpm}
            />
          )}

          {organSystem.id === 'lungs' && (
            <LungsDiagram
              parts={organSystem.parts}
              selectedPartId={selectedPartId}
              onSelectPart={onSelectPart}
              isInhaling={isInhaling}
            />
          )}

          {organSystem.id === 'skeleton' && (
            <SkeletonDiagram
              parts={organSystem.parts}
              selectedPartId={selectedPartId}
              onSelectPart={onSelectPart}
              isFlexed={isFlexed}
            />
          )}

          {organSystem.id === 'digestive' && (
            <DigestiveDiagram
              parts={organSystem.parts}
              selectedPartId={selectedPartId}
              onSelectPart={onSelectPart}
              digestionStage={digestionStage}
            />
          )}

          {organSystem.id === 'ear' && (
            <EarDiagram
              parts={organSystem.parts}
              selectedPartId={selectedPartId}
              onSelectPart={onSelectPart}
              soundFrequency={soundFrequency}
              soundDb={soundDb}
              isHeadRotating={isHeadRotating}
            />
          )}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4 text-slate-200">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              Teaching Model Controls
            </h4>
            <p className="text-xs text-slate-400">
              {organSystem.labControls.description}
            </p>
          </div>

          {organSystem.id === 'eye' && (
            <div className="flex flex-col gap-4 border-t border-slate-800 pt-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-amber-300 flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5" /> Ambient Light Level
                  </span>
                  <span className="font-mono font-bold text-white">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Dimmer (Pupil Dilates)</span>
                  <span>Brighter (Pupil Constricts)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-cyan-300 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Target Distance
                  </span>
                  <span className="font-mono font-bold text-white">{focusDistance < 30 ? 'Near Object' : focusDistance > 70 ? 'Far Object' : 'Mid Distance'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={focusDistance}
                  onChange={(e) => setFocusDistance(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Near Focus (Lens Rounds)</span>
                  <span>Distance Focus (Lens Flattens)</span>
                </div>
              </div>
            </div>
          )}

          {organSystem.id === 'brain' && (
            <div className="flex flex-col gap-3 border-t border-slate-800 pt-3">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Illustrative Regional Emphasis
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'decision', label: 'Make Decision', icon: '🧠', lobe: 'Frontal networks' },
                  { id: 'touch', label: 'Feel Texture', icon: '🖐️', lobe: 'Parietal networks' },
                  { id: 'vision', label: 'Watch Movie', icon: '👁️', lobe: 'Visual networks' },
                  { id: 'music', label: 'Listen to Song', icon: '🎵', lobe: 'Auditory networks' },
                  { id: 'balance', label: 'Ride Bicycle', icon: '🚲', lobe: 'Cerebellar emphasis' },
                  { id: 'memory', label: 'Recall Fact', icon: '💡', lobe: 'Memory networks' },
                ].map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setActiveActivity(act.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                      activeActivity === act.id
                        ? 'bg-purple-900/60 border-purple-500 text-white shadow-lg shadow-purple-950/50 scale-[1.02]'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-sm">{act.icon} <strong className="text-xs">{act.label}</strong></span>
                    <span className="text-[10px] text-purple-300/80">{act.lobe}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500">
                Real activities recruit distributed, overlapping brain networks; highlights are simplified for learning.
              </p>
            </div>
          )}

          {organSystem.id === 'heart' && (
            <div className="flex flex-col gap-4 border-t border-slate-800 pt-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-rose-300 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" /> Heart Rate (BPM)
                  </span>
                  <span className="font-mono font-bold text-white">{bpm} BPM</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="180"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Lower Rate</span>
                  <span>72 BPM Example</span>
                  <span>High Exercise Rate</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Normal heart rate varies with age, fitness, activity, medications, and health status.
                </p>
              </div>
            </div>
          )}

          {organSystem.id === 'lungs' && (
            <div className="flex flex-col gap-3 border-t border-slate-800 pt-3">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" /> Respiratory Cycle Phase
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsInhaling(true)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    isInhaling
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  💨 Inhalation (Diaphragm Contracts Down)
                </button>
                <button
                  onClick={() => setIsInhaling(false)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    !isInhaling
                      ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🌬️ Quiet Exhalation (Diaphragm Relaxes)
                </button>
              </div>
            </div>
          )}

          {organSystem.id === 'skeleton' && (
            <div className="flex flex-col gap-3 border-t border-slate-800 pt-3">
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5" /> Antagonistic Muscle Flex
              </span>
              <button
                onClick={() => setIsFlexed(!isFlexed)}
                className={`w-full py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isFlexed
                    ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {isFlexed ? '💪 Elbow Flexion (Biceps Active, Triceps Lengthening)' : '🖐️ Extended Elbow'}
              </button>
            </div>
          )}

          {organSystem.id === 'digestive' && (
            <div className="flex flex-col gap-3 border-t border-slate-800 pt-3">
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" /> Digestion Journey Stages
              </span>
              <div className="flex flex-col gap-2">
                {[
                  { stage: 0, label: '1. Esophagus (Peristalsis)', desc: 'Muscular waves move the swallowed bolus toward the stomach' },
                  { stage: 1, label: '2. Stomach', desc: 'Acid, enzymes, and muscular mixing help form chyme' },
                  { stage: 2, label: '3. Small Intestine (Villi)', desc: 'Digestion continues; nutrients are absorbed into blood and lymph' },
                ].map((stg) => (
                  <button
                    key={stg.stage}
                    onClick={() => setDigestionStage(stg.stage)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      digestionStage === stg.stage
                        ? 'bg-emerald-900/60 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>{stg.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{stg.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {organSystem.id === 'ear' && (
            <div className="flex flex-col gap-4 border-t border-slate-800 pt-3">
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> Acoustic & Vestibular Controls
              </span>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Sound Frequency (Pitch)</span>
                  <span className="font-mono text-purple-400 font-bold">{soundFrequency} Hz</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="12000"
                  step="50"
                  value={soundFrequency}
                  onChange={(e) => setSoundFrequency(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {[
                    { label: 'Bass (100 Hz)', freq: 100 },
                    { label: '1 kHz Tone', freq: 1000 },
                    { label: 'Treble (6 kHz)', freq: 6000 }
                  ].map((preset) => (
                    <button
                      key={preset.freq}
                      onClick={() => setSoundFrequency(preset.freq)}
                      className={`px-2 py-1 rounded-lg border text-[10px] font-medium transition-all ${
                        soundFrequency === preset.freq
                          ? 'bg-purple-900/80 border-purple-500 text-purple-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Illustrative Sound Level</span>
                  <span className="font-mono text-rose-400 font-bold">{soundDb} dB</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="110"
                  step="5"
                  value={soundDb}
                  onChange={(e) => setSoundDb(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-500">
                  This animation is not a calibrated sound-level meter or hearing-safety calculator.
                </p>
              </div>

              <button
                onClick={() => setIsHeadRotating(!isHeadRotating)}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isHeadRotating
                    ? 'bg-rose-600 border-rose-400 text-white shadow-lg animate-pulse'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Compass className={`w-4 h-4 ${isHeadRotating ? 'animate-spin' : ''}`} />
                {isHeadRotating ? '🔄 Head Rotating (Semicircular Canals Respond)' : '🧭 Simulate Head Rotation'}
              </button>
              <p className="text-[10px] text-slate-500">
                Semicircular canals primarily sense angular rotation; the utricle and saccule sense gravity, head tilt, and linear acceleration.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};