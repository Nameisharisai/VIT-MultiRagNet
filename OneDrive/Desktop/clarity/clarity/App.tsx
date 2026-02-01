import React, { useState, useEffect, useRef } from 'react';
import {
  AppState,
  IntentGate,
  UserState,
  UserTier,
  Pattern,
  DSA_PATTERNS,
  APTITUDE_MODELS,
  CODE_CONCEPTS,
  COMM_FRAMEWORKS,
  GeneratedQuestion,
  EvaluationResult,
  ProjectEntry,
  LeetCodeProblem,
  PathProgress,
  Achievement
} from './types';
import { 
  EXTENDED_DSA_PATTERNS, 
  EXTENDED_APTITUDE_MODELS, 
  EXTENDED_CODE_CONCEPTS, 
  EXTENDED_COMM_FRAMEWORKS 
} from './data/sdeSheet';
import { ZenLayout } from './components/ZenLayout';
import { KeyMonitor } from './components/KeyMonitor';
import { LandingPage } from './components/LandingPage';
import { storageService } from './services/storageService';
import {
  generatePatternVariation,
  validateThinkingLogic
} from './services/geminiService';

// Use extended patterns for comprehensive SDE Sheet
const ALL_DSA_PATTERNS = EXTENDED_DSA_PATTERNS;
const ALL_APTITUDE_MODELS = EXTENDED_APTITUDE_MODELS;
const ALL_CODE_CONCEPTS = EXTENDED_CODE_CONCEPTS;
const ALL_COMM_FRAMEWORKS = EXTENDED_COMM_FRAMEWORKS;

const TIER_DISPLAY = {
  [UserTier.FREE]: "EXPLORER",
  [UserTier.PRO]: "PRO",
  [UserTier.ELITE]: "ULTRA"
};

// XP Level Calculation
const calculateLevel = (xp: number): number => Math.floor(xp / 500) + 1;
const xpForNextLevel = (level: number): number => level * 500;

// Check if pattern is unlocked based on prerequisites
const isPatternUnlocked = (pattern: Pattern, pathProgress: Record<string, PathProgress>): boolean => {
  if (!pattern.prerequisites || pattern.prerequisites.length === 0) return true;
  return pattern.prerequisites.every(prereqId => {
    const progress = pathProgress[prereqId];
    return progress && progress.completed;
  });
};

// --- Assets & Icons ---

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1.5 mb-0.5 opacity-60"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4V5H19C20.1 5 21 5.9 21 7V9C21 11.21 19.21 13 17 13H16.9C16.44 14.73 15.16 16.15 13.5 16.73V19H16C17.1 19 18 19.9 18 21H6C6 19.9 6.9 19 8 19H10.5V16.73C8.84 16.15 7.56 14.73 7.1 13H7C4.79 13 3 11.21 3 9V7C3 5.9 3.9 5 5 5H10V4C10 2.9 10.9 2 12 2ZM5 7V9C5 10.1 5.9 11 7 11V7H5ZM17 11C18.1 11 19 10.1 19 9V7H17V11Z"/></svg>
);

const FireIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23C16.97 23 21 18.97 21 14C21 10.16 18.65 6.94 15.32 5.32L14 4.5V8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8V1.46C10 1.18 9.74 1 9.5 1.08C5.8 2.48 3 6.14 3 10.5C3 17.4 7.03 23 12 23Z"/></svg>
);

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

// --- High-Fidelity Cinematic Overlay ---

const UpgradeOverlay: React.FC<{ tier: UserTier; onComplete: () => void }> = ({ tier, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    // 1. Audio: Cinematic Warp Hum
    const playSpaceSound = () => {
      try {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(30, audioCtx.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.current.currentTime + 3);
        gain.gain.setValueAtTime(0, audioCtx.current.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, audioCtx.current.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 6);
        osc.connect(gain);
        gain.connect(audioCtx.current.destination);
        osc.start();
        osc.stop(audioCtx.current.currentTime + 6);
      } catch (e) { console.log("Audio Init Blocked"); }
    };
    playSpaceSound();

    // 2. Canvas: Galactic Flight Engine
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const stars: any[] = [];
    const galaxies: any[] = [];
    const colors = ['#ffffff', '#ff00ff', '#00ffff', '#ff7700'];

    for (let i = 0; i < 300; i++) {
      stars.push({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * w, size: Math.random() * 2 });
    }
    for (let i = 0; i < 12; i++) {
      galaxies.push({
        x: (Math.random() - 0.5) * w * 2,
        y: (Math.random() - 0.5) * h * 2,
        z: Math.random() * w,
        rot: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let frame: number;
    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      stars.forEach(s => {
        s.z -= 6;
        if (s.z <= 0) s.z = w;
        const sx = (s.x - w / 2) * (w / s.z) + w / 2;
        const sy = (s.y - h / 2) * (w / s.z) + h / 2;
        const size = s.size * (w / s.z);
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      });

      galaxies.forEach(g => {
        g.z -= 2;
        g.rot += g.speed;
        if (g.z <= 0) { g.z = w; g.x = (Math.random() - 0.5) * w * 2; }
        const gx = g.x * (w / g.z) + w / 2;
        const gy = g.y * (w / g.z) + h / 2;
        const scale = (w / g.z) * 1.5;
        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(g.rot);
        ctx.globalAlpha = Math.min(0.4, (w - g.z) / 400);
        ctx.strokeStyle = g.color;
        ctx.lineWidth = scale;
        for (let j = 0; j < 3; j++) {
          ctx.rotate((Math.PI * 2) / 3);
          ctx.beginPath();
          for (let k = 0; k < 15; k++) {
            const r = k * scale * 0.8;
            const theta = k * 0.3;
            ctx.lineTo(Math.cos(theta) * r, Math.sin(theta) * r);
          }
          ctx.stroke();
        }
        ctx.restore();
      });
      frame = requestAnimationFrame(animate);
    };
    animate();

    const timer = setTimeout(onComplete, 6500);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); audioCtx.current?.close(); };
  }, [onComplete]);

  const isUltra = tier === UserTier.ELITE;
  const accent = isUltra ? '#F59E0B' : '#B2BEB5';

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

      <div className="relative z-50 flex flex-col items-center text-center px-4 w-full">
        <div className="mb-4 animate-fadeIn flex flex-col items-center">
          <p className="text-[10px] font-mono tracking-[1.2em] text-white/30 uppercase mb-4">Establishing Neural Secure Link</p>
          <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <div className="relative group select-none">
          <div className="absolute -inset-20 bg-red-950/10 blur-[120px] rounded-full animate-pulse"></div>
          
          <div className="relative flex flex-col items-center">
            {/* SALAAR INSPIRED TEXTURE */}
            <h1 className="salaar-title text-[90px] md:text-[160px] font-black italic tracking-tighter uppercase leading-none">
              CLARITY
            </h1>
            
            <h2 
              className="text-2xl md:text-4xl font-bold tracking-[0.5em] uppercase italic mt-[-10px]"
              style={{ color: accent, textShadow: `0 0 20px ${accent}44` }}
            >
              {TIER_DISPLAY[tier]}
            </h2>
          </div>
        </div>

        <div className="mt-20 w-64 space-y-3 font-mono">
           <div className="flex justify-between items-center text-[9px] text-white/40 tracking-widest border-b border-white/5 pb-2">
              <span>SYSTEM AUTH</span>
              <span className="text-red-600 animate-pulse">GRANTED</span>
           </div>
           <div className="w-full h-[1px] bg-white/5 overflow-hidden">
              <div className="h-full bg-red-600/60 animate-load-bar"></div>
           </div>
        </div>
      </div>

      <style>{`
        .salaar-title {
          background: linear-gradient(180deg, #fff 0%, #888 45%, #222 50%, #444 55%, #111 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(4px 8px 12px rgba(0,0,0,0.8));
          position: relative;
        }
        .salaar-title::after {
          content: 'CLARITY';
          position: absolute;
          left: 0; top: 0; z-index: -1;
          -webkit-text-stroke: 6px #450a0a;
          filter: blur(8px);
          opacity: 0.7;
        }
        @keyframes load-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-load-bar { animation: load-bar 2s infinite ease-in-out; }
        .animate-fadeIn { animation: fadeIn 2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; letter-spacing: 2em; } to { opacity: 1; letter-spacing: normal; } }
      `}</style>
    </div>
  );
};

// --- Core Helper Components ---

const DifficultyBadge: React.FC<{ level: string }> = ({ level }) => {
  const colors: Record<string, string> = {
    'Easy': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Medium': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Hard': 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  };
  return (
    <span className={`px-2 py-0.5 rounded border text-[8px] font-bold uppercase tracking-widest ${colors[level] || colors['Medium']}`}>
      {level}
    </span>
  );
};

const UpgradeLock: React.FC<{ tier: UserTier, limit: string }> = ({ tier, limit }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-fadeIn max-w-xl mx-auto text-center">
    <div className="w-16 h-16 rounded-full bg-[#1C1C1C] flex items-center justify-center mb-6">
      <LockIcon />
    </div>
    <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Daily Limit Reached</h2>
    <p className="text-[#475569] text-xs font-bold uppercase tracking-widest mb-8">
      {tier} Tier Limit: {limit}
    </p>
    <div className="bg-[#1C1C1C]/50 p-6 rounded-xl border border-dashed border-[#2D2D2D] w-full mb-8">
      <p className="text-sm text-slate-400">Upgrade your neural link to access extended training sessions.</p>
    </div>
    <div className="flex gap-4">
      <button className="px-6 py-3 bg-[#B2BEB5] text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white transition-colors">
        Upgrade License
      </button>
    </div>
  </div>
);

const AdaptiveLearningGate: React.FC<{
  onChoice: (mode: 'TEACH' | 'TEST') => void;
  title: string;
}> = ({ onChoice, title }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-fadeIn max-w-2xl mx-auto text-center">
    <div className="w-1 h-12 bg-[#B2BEB5] mb-8"></div>
    <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter italic">Intelligence Gate: {title}</h2>
    <p className="text-[#475569] text-xs uppercase tracking-[0.3em] font-bold mb-12">Calibrating terminal for your current proficiency level</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <button
        onClick={() => onChoice('TEACH')}
        className="card-container group hover:border-[#B2BEB5] flex flex-col items-center gap-4 py-10 transition-all bg-[#1C1C1C]/40"
      >
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#B2BEB5] group-hover:text-black transition-all">
          <span className="text-xs font-bold">A</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#B2BEB5]">Teach me basics</h3>
          <p className="text-[10px] text-[#475569] uppercase font-bold tracking-widest">Walkthrough + Guided Practice</p>
        </div>
      </button>

      <button
        onClick={() => onChoice('TEST')}
        className="card-container group hover:border-amber-500 flex flex-col items-center gap-4 py-10 transition-all bg-[#1C1C1C]/40"
      >
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
          <span className="text-xs font-bold">B</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">I know basics, test me</h3>
          <p className="text-[10px] text-[#475569] uppercase font-bold tracking-widest">Direct Challenge Mode</p>
        </div>
      </button>
    </div>
  </div>
);

const UnifiedThinkingSession: React.FC<{
  pattern: Pattern,
  user: UserState,
  onBack: () => void,
  onUpdateUser: (u: UserState) => void
}> = ({ pattern, user, onBack, onUpdateUser }) => {
  const [gateMode, setGateMode] = useState<'TEACH' | 'TEST' | null>(null);
  const [phase, setPhase] = useState<'RECOGNITION' | 'SIMULATION' | 'LOGIC' | 'CODING' | 'FEEDBACK' | 'LOADING' | 'CONCEPT' | 'WALKTHROUGH' | 'DEMO'>('LOADING');
  const [question, setQuestion] = useState<GeneratedQuestion | null>(null);
  const [userInput, setUserInput] = useState('');
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);
  const [helpStage, setHelpStage] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const checkLimit = () => {
    if (!user.dailyUsage) return false;
    const today = new Date().toISOString().split('T')[0];
    if (user.dailyUsage.date !== today) return false;
    let limit = 0;
    const gate = pattern.gate;
    if (user.tier === UserTier.FREE) {
      if (gate === IntentGate.COMMUNICATION) limit = 3; else limit = 6;
    } else if (user.tier === UserTier.PRO) {
      if (gate === IntentGate.COMMUNICATION) limit = 9999; else limit = 30;
    } else { limit = 9999; }
    let current = 0;
    if (gate === IntentGate.DSA) current = user.dailyUsage.dsa;
    else if (gate === IntentGate.CODING) current = user.dailyUsage.coding;
    else if (gate === IntentGate.APTITUDE) current = user.dailyUsage.aptitude;
    else if (gate === IntentGate.COMMUNICATION) current = user.dailyUsage.communication;
    return current >= limit;
  };

  const fetchQuestion = async () => {
    if (checkLimit()) { setIsLocked(true); return; }
    setPhase('LOADING');
    try {
      const q = await generatePatternVariation(pattern, user, sessionHistory.join(', '));
      const today = new Date().toISOString().split('T')[0];
      const newUsage = user.dailyUsage ? { ...user.dailyUsage } : { date: today, dsa: 0, coding: 0, aptitude: 0, communication: 0 };
      if (newUsage.date !== today) {
        newUsage.date = today;
        newUsage.dsa = 0; newUsage.coding = 0; newUsage.aptitude = 0; newUsage.communication = 0;
      }
      if (pattern.gate === IntentGate.DSA) newUsage.dsa++;
      else if (pattern.gate === IntentGate.CODING) newUsage.coding++;
      else if (pattern.gate === IntentGate.APTITUDE) newUsage.aptitude++;
      else if (pattern.gate === IntentGate.COMMUNICATION) newUsage.communication++;
      const updatedUser = { ...user, dailyUsage: newUsage };
      onUpdateUser(updatedUser);
      setQuestion(q);
      setUserInput('');
      setEvalResult(null);
      setHelpStage(0);
      if (gateMode === 'TEACH') setPhase('CONCEPT');
      else if (gateMode === 'TEST') {
        if (pattern.gate === IntentGate.DSA) setPhase('RECOGNITION');
        else setPhase('LOGIC');
      }
    } catch (e) { console.error(e); onBack(); }
  };

  useEffect(() => { if (gateMode) fetchQuestion(); }, [gateMode]);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const res = await validateThinkingLogic(question!, userInput, user, phase);
      setEvalResult(res);
      if (res.verdict === 'CORRECT') {
        if (phase === 'RECOGNITION') setPhase('SIMULATION');
        else if (phase === 'SIMULATION') setPhase('CODING');
        else if (phase === 'LOGIC' && pattern.gate === IntentGate.DSA) setPhase('CODING');
        else { 
          setPhase('FEEDBACK'); 
          storageService.logProgress();
          
          // Award XP for completing the pattern session
          const xpGain = Math.floor(pattern.xpReward / 2); // Half XP for completing a session
          const newXP = (user.totalXP || 0) + xpGain;
          const updatedUser = {
            ...user,
            totalXP: newXP,
            level: calculateLevel(newXP),
            completedToday: (user.completedToday || 0) + 1
          };
          onUpdateUser(updatedUser);
        }
        setEvalResult(null);
      } else { setPhase('FEEDBACK'); }
    } catch (e) { console.error(e); } finally { setIsProcessing(false); }
  };

  const handleNextVariation = () => {
    setSessionHistory([...sessionHistory, question!.id]);
    fetchQuestion();
  };

  const insertSyntax = (syntax: string) => {
    if (!textAreaRef.current) return;
    const start = textAreaRef.current.selectionStart;
    const end = textAreaRef.current.selectionEnd;
    const next = userInput.substring(0, start) + syntax + userInput.substring(end);
    setUserInput(next);
    textAreaRef.current.focus();
    setTimeout(() => { textAreaRef.current?.setSelectionRange(start + syntax.length, start + syntax.length); }, 0);
  };

  if (!gateMode) return <AdaptiveLearningGate title={pattern.title} onChoice={setGateMode} />;
  if (isLocked) {
    const limit = user.tier === UserTier.FREE ? "6" : "30";
    return <UpgradeLock tier={user.tier} limit={limit} />;
  }
  if (phase === 'LOADING') return (
    <div className="flex flex-col items-center justify-center py-32 animate-pulse">
      <div className="w-1 h-12 bg-[#B2BEB5] mb-8"></div>
      <p className="text-[10px] uppercase font-bold text-[#B2BEB5] tracking-[0.4em]">Calibrating Pattern Terminal...</p>
    </div>
  );

  if (phase === 'CONCEPT' || phase === 'WALKTHROUGH' || phase === 'DEMO') {
    return (
      <div className="max-w-4xl mx-auto py-12 animate-fadeIn w-full flex flex-col gap-10">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div>
            <span className="text-[9px] font-bold text-[#B2BEB5] uppercase tracking-widest">Learning Path • {phase}</span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">{pattern.title}</h2>
          </div>
          <div className="flex gap-2">
            {['CONCEPT', 'WALKTHROUGH', 'DEMO'].map(p => (
              <div key={p} className={`w-3 h-3 rounded-full ${phase === p ? 'bg-[#B2BEB5]' : 'bg-[#1C1C1C]'}`}></div>
            ))}
          </div>
        </div>
        <div className="card-container bg-[#100C08] p-12 min-h-[400px] flex flex-col justify-between">
          <div>
            {phase === 'CONCEPT' && (
              <div className="space-y-8 animate-fadeIn">
                <h3 className="text-3xl font-bold text-white italic tracking-tight">The Concept</h3>
                <p className="text-xl text-[#cbd5e1] leading-relaxed border-l-4 border-[#B2BEB5] pl-8 font-medium">"{question?.conceptExplanation}"</p>
              </div>
            )}
            {phase === 'WALKTHROUGH' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-3xl font-bold text-white italic tracking-tight">Thinking Process</h3>
                <div className="space-y-4 mt-8">
                  {question?.logicWalkthrough.map((step, i) => (
                    <div key={i} className="flex gap-6 items-start p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="w-8 h-8 rounded-full bg-[#B2BEB5]/10 text-[#B2BEB5] flex items-center justify-center font-bold text-xs flex-shrink-0">{i + 1}</span>
                      <p className="text-[#94a3b8] font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {phase === 'DEMO' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-3xl font-bold text-white italic tracking-tight">Reference Architecture</h3>
                <div className="bg-[#100C08] border border-white/5 rounded-xl p-8 mt-6">
                  <pre className="font-mono text-sm text-[#B2BEB5] whitespace-pre-wrap leading-relaxed">{question?.demoCode}</pre>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4 mt-12">
            {phase === 'CONCEPT' && <button onClick={() => setPhase('WALKTHROUGH')} className="primary-button !px-10">Logic Flow →</button>}
            {phase === 'WALKTHROUGH' && <button onClick={() => setPhase('DEMO')} className="primary-button !px-10">Code Demo →</button>}
            {phase === 'DEMO' && <button onClick={() => setPhase('CODING')} className="primary-button !px-10">Begin Practice →</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fadeIn w-full flex flex-col gap-8">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <span className="text-[9px] font-bold text-[#B2BEB5] uppercase tracking-widest">{pattern.gate} Session</span>
          <h2 className="text-xl font-bold text-white uppercase tracking-tighter">{pattern.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {['RECOGNITION', 'SIMULATION', 'LOGIC', 'CODING'].map(p => {
            const active = phase === p || (phase === 'FEEDBACK' && p === 'CODING');
            return (
              <div key={p} className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-1 rounded ${active ? 'bg-[#B2BEB5]' : 'bg-[#1C1C1C]'}`}></div>
                <span className={`text-[7px] font-bold tracking-tighter ${active ? 'text-[#B2BEB5]' : 'text-[#334155]'}`}>{p}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="card-container bg-[#100C08] p-8 min-h-[350px] relative overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-[#475569] block mb-4 tracking-widest">Environment</span>
            <p className="text-xl text-white font-medium leading-relaxed mb-6">{question?.problem}</p>
            {phase === 'SIMULATION' && question?.simulationStep && (
              <div className="mt-8 p-6 bg-[#B2BEB5]/10 border-l-4 border-[#B2BEB5] animate-fadeIn">
                <span className="text-[10px] uppercase font-bold text-[#B2BEB5] block mb-2">Step Simulation</span>
                <p className="text-sm font-bold text-white italic">"{question.simulationStep}"</p>
              </div>
            )}
            {helpStage > 0 && question?.helpLayers && (
              <div className="mt-10 space-y-4 border-t border-white/5 pt-6 animate-fadeIn">
                {helpStage >= 1 && (
                  <div className="p-4 bg-indigo-500/5 rounded border border-indigo-500/10">
                    <span className="text-[8px] uppercase font-bold text-indigo-400 block mb-1">Plain Logic</span>
                    <p className="text-xs text-[#94a3b8]">{question.helpLayers.logic}</p>
                  </div>
                )}
                {helpStage >= 2 && (
                  <div className="p-4 bg-emerald-500/5 rounded border border-emerald-500/10">
                    <span className="text-[8px] uppercase font-bold text-emerald-400 block mb-1">Algorithm</span>
                    <p className="text-xs text-[#94a3b8]">{question.helpLayers.algorithm}</p>
                  </div>
                )}
                {helpStage >= 3 && (
                  <div className="p-4 bg-[#B2BEB5]/5 rounded border border-[#B2BEB5]/10">
                    <span className="text-[8px] uppercase font-bold text-[#B2BEB5] block mb-1">Skeleton</span>
                    <pre className="text-[10px] font-mono text-[#B2BEB5]/80 mt-2 whitespace-pre-wrap">{question.helpLayers.skeleton}</pre>
                  </div>
                )}
                {helpStage >= 4 && (
                  <div className="p-4 bg-white/5 rounded border border-white/10">
                    <span className="text-[8px] uppercase font-bold text-white block mb-1">Full Solution</span>
                    <pre className="text-[10px] font-mono text-white/80 mt-2 whitespace-pre-wrap">{question.helpLayers.fullSolution}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-6 border border-white/5 rounded-xl bg-[#1C1C1C]/50">
            <span className="text-[9px] uppercase font-bold text-[#475569] block mb-2">Core Thinking</span>
            <p className="text-xs text-[#cbd5e1] leading-relaxed italic">"{pattern.coreLogic}"</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="card-container bg-[#1C1C1C] border-white/10 p-0 overflow-hidden flex flex-col h-[550px]">
            <div className="bg-[#2D2D2D] p-3 flex justify-between items-center border-b border-white/5">
              <span className="text-[9px] font-bold text-[#B2BEB5] uppercase tracking-widest">
                {phase === 'RECOGNITION' ? 'Identify Pattern' : phase === 'FEEDBACK' ? 'Review Logic' : 'Interactive Logic Space'}
              </span>
              <div className="flex gap-1.5">
                {['int', 'if', 'while', 'for', 'swap', 'return'].map(k => (
                  <button key={k} onClick={() => insertSyntax(k)} className="px-2.5 py-1 bg-black/40 border border-white/5 rounded text-[9px] font-mono text-[#475569] hover:text-[#B2BEB5] uppercase">{k}</button>
                ))}
              </div>
            </div>
            <div className="flex-grow relative flex flex-col">
              {phase === 'RECOGNITION' && question?.options ? (
                <div className="p-10 flex flex-col gap-4 h-full overflow-y-auto">
                  <p className="text-xs text-[#475569] uppercase font-bold mb-4 tracking-widest">Select the matching pattern:</p>
                  {question.options.map((opt, i) => (
                    <button key={i} onClick={() => setUserInput(opt)} className={`p-5 text-left border rounded-xl transition-all ${userInput === opt ? 'border-[#B2BEB5] bg-[#B2BEB5]/10 text-white' : 'border-white/5 bg-black/20 text-[#475569] hover:border-white/20'}`}>{opt}</button>
                  ))}
                </div>
              ) : phase === 'FEEDBACK' && evalResult ? (
                <div className="p-10 flex-grow overflow-y-auto bg-black/20">
                  <div className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full inline-block mb-8 ${evalResult.verdict === 'CORRECT' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {evalResult.verdict === 'CORRECT' ? 'Logic Validated' : 'Logic Flaw Detected'}
                  </div>
                  {evalResult.verdict === 'INCORRECT' && gateMode === 'TEST' && (
                    <div className="mb-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-2">Learning Opportunity</span>
                      <p className="text-sm text-amber-200 mb-4 font-medium">It seems you're struggling with this pattern. Let's switch to Teacher Mode for a quick concept refresh.</p>
                      <button onClick={() => setPhase('CONCEPT')} className="px-6 py-2 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest rounded">Switch to Teach Mode</button>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-white mb-6">{evalResult.feedback}</h4>
                  <div className="space-y-8">
                    {evalResult.thinkingGap && (
                      <div className="p-5 bg-amber-500/5 border-l-4 border-amber-500 text-xs text-amber-200">
                        <span className="font-bold block uppercase mb-2">Concept Mismatch</span>
                        {evalResult.thinkingGap}
                      </div>
                    )}
                    {evalResult.correctedSnippet && (
                      <div className="p-5 bg-[#100C08] border border-white/5 rounded-xl font-mono text-[11px] text-[#94a3b8] relative">
                        <span className="absolute top-2 right-4 text-[7px] text-[#475569] uppercase">Recommended Segment</span>
                        <pre className="mt-4 whitespace-pre-wrap">{evalResult.correctedSnippet}</pre>
                      </div>
                    )}
                    {evalResult.explanationWhy && <p className="text-sm text-[#94a3b8] italic pl-6 border-l border-white/10">"{evalResult.explanationWhy}"</p>}
                  </div>
                </div>
              ) : (
                <textarea
                  ref={textAreaRef}
                  className="w-full h-full bg-transparent p-10 text-[#B2BEB5] font-mono text-sm focus:outline-none resize-none selection:bg-[#B2BEB5]/30"
                  placeholder={phase === 'CODING' ? "Translate your logic into code..." : "Outline your algorithmic thinking..."}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              )}
            </div>
            <div className="p-6 bg-[#100C08] border-t border-white/5 flex flex-col gap-4">
              <div className="flex gap-4">
                {phase === 'FEEDBACK' ? (
                  <>
                    <button onClick={() => setPhase('CODING')} className="flex-1 py-4 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest">Adjust My Logic</button>
                    {evalResult?.verdict === 'CORRECT' && <button onClick={handleNextVariation} className="flex-1 py-4 bg-[#B2BEB5] text-black rounded-lg text-[10px] font-bold uppercase tracking-widest">Next Problem →</button>}
                  </>
                ) : (
                  <>
                    <button onClick={() => setHelpStage(s => Math.min(s + 1, 4))} className="px-6 py-4 bg-[#2D2D2D] border border-white/5 rounded-lg text-[10px] font-bold text-[#475569] uppercase hover:text-white transition-all">Stuck? Get Help</button>
                    <button onClick={handleSubmit} disabled={isProcessing || !userInput.trim()} className="flex-1 primary-button !py-4 shadow-lg">{isProcessing ? "Analyzing Logic..." : "Check Logic"}</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatternLibrary: React.FC<{
  title: string,
  patterns: Pattern[],
  user: UserState,
  onSelect: (p: Pattern) => void,
  onViewPath: (p: Pattern) => void,
  limit: number
}> = ({ title, patterns, user, onSelect, onViewPath, limit }) => {
  const isLocked = (pattern: Pattern, idx: number) => {
    // Check tier limits
    if (user.tier === UserTier.ELITE) {
      return !isPatternUnlocked(pattern, user.pathProgress);
    }
    if (user.tier === UserTier.PRO) {
      if (idx >= 10) return true;
      return !isPatternUnlocked(pattern, user.pathProgress);
    }
    if (idx >= limit) return true;
    return !isPatternUnlocked(pattern, user.pathProgress);
  };

  const getProgress = (patternId: string) => {
    const progress = user.pathProgress[patternId];
    if (!progress) return { completed: false, score: 0, leetcodeSolved: 0, total: 0 };
    const leetcodeSolved = progress.leetcodeProblems?.filter(p => p.solved).length || 0;
    const total = progress.leetcodeProblems?.length || 0;
    return { completed: progress.completed, score: progress.score, leetcodeSolved, total };
  };

  return (
    <div className="animate-fadeIn py-8 max-w-6xl mx-auto w-full">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-6xl font-bold text-white mb-2 italic uppercase tracking-tighter">{title} Terminal</h2>
          <p className="text-[#475569] text-xs uppercase tracking-[0.4em] font-bold">Intelligence patterns active for tier: {user.tier}</p>
        </div>
        <div className="flex items-center gap-4 bg-[#1C1C1C] px-6 py-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <TrophyIcon />
            <span className="text-xs font-bold text-amber-500">{user.totalXP || 0} XP</span>
          </div>
          <div className="w-[1px] h-4 bg-white/10"></div>
          <div className="flex items-center gap-2">
            <FireIcon />
            <span className="text-xs font-bold text-orange-500">{user.currentStreak || 0} day streak</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {patterns.map((p, i) => {
          const locked = isLocked(p, i);
          const progress = getProgress(p.id);
          const prereqNames = p.prerequisites?.map(prereqId => {
            const prereq = patterns.find(pat => pat.id === prereqId);
            return prereq?.title || prereqId;
          }) || [];
          
          return (
            <div
              key={p.id}
              className={`card-container text-left group transition-all ${locked ? 'opacity-40 cursor-not-allowed bg-black/20' : 'hover:border-[#B2BEB5] hover:bg-[#2D2D2D]/20'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-[#475569]">0{i + 1}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#B2BEB5] transition-colors flex items-center gap-2">
                      {locked && <LockIcon />}
                      {progress.completed && <span className="text-emerald-500"><CheckIcon /></span>}
                      {p.title}
                    </h3>
                    {progress.completed && (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase rounded-full">Completed</span>
                    )}
                  </div>
                  <p className="text-sm text-[#475569] font-medium max-w-2xl leading-relaxed">{p.description}</p>
                  <div className="flex gap-4 mt-2 items-center flex-wrap">
                    <DifficultyBadge level={p.difficulty} />
                    <span className="text-[8px] font-bold text-cyan-500 uppercase tracking-widest">+{p.xpReward} XP</span>
                    <span className="text-[8px] font-bold text-[#334155] uppercase tracking-widest">⏱ {p.estimatedTime}</span>
                    {p.leetcodeProblems && (
                      <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">
                        📝 {progress.leetcodeSolved}/{p.leetcodeProblems.length} LeetCode
                      </span>
                    )}
                    {prereqNames.length > 0 && !isPatternUnlocked(p, user.pathProgress) && (
                      <span className="text-[8px] font-bold text-rose-400 uppercase tracking-widest">
                        Requires: {prereqNames.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {!locked && (
                    <>
                      <button 
                        onClick={() => onSelect(p)}
                        className="px-4 py-2 bg-[#B2BEB5] text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white transition-all"
                      >
                        {progress.completed ? 'Practice Again' : 'Start Learning'} →
                      </button>
                      {p.leetcodeProblems && p.leetcodeProblems.length > 0 && (
                        <button 
                          onClick={() => onViewPath(p)}
                          className="px-4 py-2 border border-amber-500/50 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-amber-500/10 transition-all"
                        >
                          View LeetCode Path
                        </button>
                      )}
                    </>
                  )}
                  {locked && (
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#475569]">Unlock Module</span>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              {!locked && p.leetcodeProblems && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-[#475569] uppercase font-bold tracking-widest">Pattern Mastery</span>
                    <span className="text-[9px] text-[#B2BEB5] font-mono">{Math.round((progress.leetcodeSolved / (progress.total || 1)) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1C1C1C] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#B2BEB5] to-emerald-500 transition-all duration-500"
                      style={{ width: `${(progress.leetcodeSolved / (progress.total || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// LeetCode Path Viewer Component
const LeetCodePathView: React.FC<{
  pattern: Pattern,
  user: UserState,
  onBack: () => void,
  onUpdateUser: (u: UserState) => void,
  onStartPattern: () => void
}> = ({ pattern, user, onBack, onUpdateUser, onStartPattern }) => {
  const problems = pattern.leetcodeProblems || [];
  const progress = user.pathProgress[pattern.id] || { patternId: pattern.id, completed: false, score: 0, attempts: 0, leetcodeProblems: [] };
  
  const getProblemProgress = (problemId: string) => {
    return progress.leetcodeProblems?.find(p => p.problemId === problemId) || { problemId, solved: false, attempts: 0 };
  };

  const toggleProblemSolved = (problemId: string) => {
    const currentProgress = { ...progress };
    if (!currentProgress.leetcodeProblems) {
      currentProgress.leetcodeProblems = [];
    }
    
    const existingIdx = currentProgress.leetcodeProblems.findIndex(p => p.problemId === problemId);
    if (existingIdx >= 0) {
      currentProgress.leetcodeProblems[existingIdx].solved = !currentProgress.leetcodeProblems[existingIdx].solved;
      if (!currentProgress.leetcodeProblems[existingIdx].solved) {
        currentProgress.leetcodeProblems[existingIdx].attempts = 0;
      }
    } else {
      currentProgress.leetcodeProblems.push({ problemId, solved: true, attempts: 1 });
    }
    
    // Check if pattern is completed (at least 3 problems solved)
    const solvedCount = currentProgress.leetcodeProblems.filter(p => p.solved).length;
    if (solvedCount >= 3 && !currentProgress.completed) {
      currentProgress.completed = true;
      currentProgress.score = 100;
    }
    
    const updatedPathProgress = { ...user.pathProgress, [pattern.id]: currentProgress };
    
    // Calculate XP
    let newXP = user.totalXP || 0;
    const problemProgress = getProblemProgress(problemId);
    if (!problemProgress.solved) {
      // Award XP for solving
      const problem = problems.find(p => p.id === problemId);
      const xpGain = problem?.difficulty === 'Easy' ? 20 : problem?.difficulty === 'Medium' ? 40 : 60;
      newXP += xpGain;
    }
    
    const updatedUser = { 
      ...user, 
      pathProgress: updatedPathProgress,
      totalXP: newXP,
      level: calculateLevel(newXP)
    };
    onUpdateUser(updatedUser);
    storageService.saveUser(updatedUser);
  };

  const solvedCount = progress.leetcodeProblems?.filter(p => p.solved).length || 0;
  const totalProblems = problems.length;
  
  return (
    <div className="animate-fadeIn py-8 max-w-5xl mx-auto w-full">
      <button onClick={onBack} className="mb-8 text-[10px] text-[#B2BEB5] font-bold uppercase tracking-[0.4em] hover:text-white transition-colors">← Back to Patterns</button>
      
      <div className="mb-10">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest mb-2 block">LeetCode Learning Path</span>
            <h2 className="text-5xl font-bold text-white mb-2 italic uppercase tracking-tighter">{pattern.title}</h2>
            <p className="text-[#475569] text-sm max-w-xl">{pattern.description}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-[#B2BEB5] font-mono">{solvedCount}/{totalProblems}</div>
            <span className="text-[10px] text-[#475569] uppercase font-bold">Problems Solved</span>
          </div>
        </div>
        
        {/* Progress Ring */}
        <div className="mt-8 flex items-center gap-8">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="#1C1C1C" strokeWidth="8" fill="none" />
              <circle 
                cx="48" cy="48" r="40" 
                stroke="#B2BEB5" 
                strokeWidth="8" 
                fill="none"
                strokeDasharray={`${(solvedCount / totalProblems) * 251.2} 251.2`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{Math.round((solvedCount / totalProblems) * 100)}%</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#94a3b8] mb-4">Complete at least <span className="text-[#B2BEB5] font-bold">3 problems</span> to master this pattern and unlock the next level.</p>
            <button 
              onClick={onStartPattern}
              className="px-6 py-3 bg-[#B2BEB5] text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white transition-all"
            >
              Practice Pattern Concepts →
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-amber-500"></span>
          Problem Roadmap
        </h3>
        
        {problems.map((problem, idx) => {
          const problemProgress = getProblemProgress(problem.id);
          const isFirst = idx === 0;
          const prevSolved = idx === 0 || getProblemProgress(problems[idx - 1].id).solved;
          
          return (
            <div 
              key={problem.id}
              className={`relative pl-10 ${!isFirst ? 'before:absolute before:left-[18px] before:top-0 before:h-full before:w-[2px] before:bg-[#1C1C1C]' : ''}`}
            >
              {/* Connection Line Progress */}
              {!isFirst && prevSolved && (
                <div className="absolute left-[18px] top-0 h-full w-[2px] bg-emerald-500/50"></div>
              )}
              
              {/* Node */}
              <div className={`absolute left-2.5 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${
                problemProgress.solved 
                  ? 'bg-emerald-500 border-emerald-500' 
                  : 'bg-[#100C08] border-[#334155]'
              }`}>
                {problemProgress.solved && <CheckIcon />}
              </div>
              
              <div className={`card-container transition-all ${problemProgress.solved ? 'border-emerald-500/30 bg-emerald-500/5' : 'hover:border-[#B2BEB5]'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-[#475569]">#{problem.number}</span>
                      <h4 className="text-lg font-bold text-white">{problem.title}</h4>
                      <DifficultyBadge level={problem.difficulty} />
                      {problemProgress.solved && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-bold uppercase rounded-full flex items-center gap-1">
                          <CheckIcon /> Solved
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {problem.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-[#1C1C1C] text-[#475569] text-[9px] font-bold uppercase rounded">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-[9px] text-[#475569] uppercase font-bold">
                      <span>Acceptance: {problem.acceptance}%</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="text-blue-400">Companies:</span> {problem.companies.slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <a 
                      href={problem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-amber-500/20 transition-all flex items-center gap-2"
                    >
                      Open in LeetCode <ExternalLinkIcon />
                    </a>
                    <button 
                      onClick={() => toggleProblemSolved(problem.id)}
                      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${
                        problemProgress.solved 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-[#1C1C1C] text-[#475569] hover:text-white border border-white/5'
                      }`}
                    >
                      {problemProgress.solved ? '✓ Mark Unsolved' : 'Mark as Solved'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Completion Banner */}
      {solvedCount >= 3 && (
        <div className="mt-10 p-8 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrophyIcon />
            <h3 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest">Pattern Mastered!</h3>
            <TrophyIcon />
          </div>
          <p className="text-[#94a3b8] mb-4">You've completed the {pattern.title} pattern. +{pattern.xpReward} XP earned!</p>
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-emerald-400 transition-all"
          >
            Continue to Next Pattern →
          </button>
        </div>
      )}
    </div>
  );
};

// Stats Dashboard Component
const StatsDashboard: React.FC<{ user: UserState }> = ({ user }) => {
  const level = user.level || 1;
  const currentXP = user.totalXP || 0;
  const xpNeeded = xpForNextLevel(level);
  const xpProgress = currentXP % 500;
  
  const totalSolved = Object.values(user.pathProgress).reduce((acc, p) => {
    return acc + (p.leetcodeProblems?.filter(lp => lp.solved).length || 0);
  }, 0);
  
  const completedPatterns = Object.values(user.pathProgress).filter(p => p.completed).length;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div className="card-container bg-gradient-to-br from-[#1C1C1C] to-[#100C08] p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
            <TrophyIcon />
          </div>
          <span className="text-[9px] text-[#475569] uppercase font-bold tracking-widest">Level</span>
        </div>
        <div className="text-3xl font-bold text-amber-500">{level}</div>
        <div className="mt-2">
          <div className="flex justify-between text-[9px] text-[#475569] mb-1">
            <span>{xpProgress} XP</span>
            <span>{500} XP</span>
          </div>
          <div className="h-1 bg-[#2D2D2D] rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 transition-all" style={{ width: `${(xpProgress / 500) * 100}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="card-container bg-gradient-to-br from-[#1C1C1C] to-[#100C08] p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
            <FireIcon />
          </div>
          <span className="text-[9px] text-[#475569] uppercase font-bold tracking-widest">Streak</span>
        </div>
        <div className="text-3xl font-bold text-orange-500">{user.currentStreak || 0} <span className="text-sm">days</span></div>
        <div className="text-[9px] text-[#475569] mt-1">Best: {user.longestStreak || 0} days</div>
      </div>
      
      <div className="card-container bg-gradient-to-br from-[#1C1C1C] to-[#100C08] p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckIcon />
          </div>
          <span className="text-[9px] text-[#475569] uppercase font-bold tracking-widest">LeetCode</span>
        </div>
        <div className="text-3xl font-bold text-emerald-500">{totalSolved}</div>
        <div className="text-[9px] text-[#475569] mt-1">Problems Solved</div>
      </div>
      
      <div className="card-container bg-gradient-to-br from-[#1C1C1C] to-[#100C08] p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#B2BEB5]/10 flex items-center justify-center text-[#B2BEB5]">
            <StarIcon />
          </div>
          <span className="text-[9px] text-[#475569] uppercase font-bold tracking-widest">Patterns</span>
        </div>
        <div className="text-3xl font-bold text-[#B2BEB5]">{completedPatterns}</div>
        <div className="text-[9px] text-[#475569] mt-1">Mastered</div>
      </div>
    </div>
  );
};

const ProfileSetup: React.FC<{ onComplete: (user: UserState) => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [role, setRole] = useState('');
  const [techStack, setTechStack] = useState('');
  const [tier, setTier] = useState<UserTier>(UserTier.FREE);
  const [resume, setResume] = useState('');
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [curProjName, setCurProjName] = useState('');
  const [curProjProblem, setCurProjProblem] = useState('');
  const [showProjectLoop, setShowProjectLoop] = useState(false);
  const [goal, setGoal] = useState('');
  const [goalDate, setGoalDate] = useState('');

  const saveProject = () => {
    if (curProjName.trim().length >= 3 && curProjProblem.trim().length >= 30) {
      setProjects([...projects, { name: curProjName, problem: curProjProblem, tech: '', role: '' }]);
      setCurProjName(''); setCurProjProblem(''); setShowProjectLoop(true);
    }
  };

  const handleFinish = () => {
    // Initialize path progress for all patterns (using extended patterns)
    const initialPathProgress: Record<string, PathProgress> = {};
    [...ALL_DSA_PATTERNS, ...ALL_APTITUDE_MODELS, ...ALL_CODE_CONCEPTS, ...ALL_COMM_FRAMEWORKS].forEach(pattern => {
      initialPathProgress[pattern.id] = {
        patternId: pattern.id,
        completed: false,
        score: 0,
        attempts: 0,
        leetcodeProblems: pattern.leetcodeProblems?.map(p => ({
          problemId: p.id,
          solved: false,
          attempts: 0
        })) || []
      };
    });

    onComplete({
      name: "Candidate", isProfileComplete: true, targetRole: role,
      techStack: techStack.split(',').map(s => s.trim()),
      projects, milestone: { goal, date: goalDate },
      completedToday: 0, dailyGoal: 5, tier, isPlacementModeActive: tier === UserTier.ELITE, resumeContent: resume,
      dailyUsage: { date: new Date().toISOString().split('T')[0], dsa: 0, coding: 0, aptitude: 0, communication: 0 },
      pathProgress: initialPathProgress,
      achievements: [],
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      level: 1,
      lastActiveDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fadeIn max-w-2xl mx-auto w-full">
      <div className="w-full mb-12 flex justify-between px-10 relative">
        <div className="absolute top-[16px] left-[10%] right-[10%] h-[1px] bg-[#2D2D2D] -z-10"></div>
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 text-[10px] bg-[#100C08] ${stage >= s ? 'border-[#B2BEB5] text-[#B2BEB5]' : 'border-[#2D2D2D] text-[#334155]'}`}>{s}</div>
        ))}
      </div>
      <div className="card-container w-full bg-[#1C1C1C] border-white/5 p-12 min-h-[500px] flex flex-col justify-between">
        {stage === 1 && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-2 italic uppercase tracking-tighter">Core Identity</h2>
            <div className="space-y-10 mt-12">
              <input type="text" placeholder="Target Role" className="w-full bg-black/40 border-b-2 border-[#2D2D2D] p-4 text-white focus:outline-none focus:border-[#B2BEB5]" value={role} onChange={(e) => setRole(e.target.value)} />
              <input type="text" placeholder="Tech Stack (comma separated)" className="w-full bg-black/40 border-b-2 border-[#2D2D2D] p-4 text-white focus:outline-none focus:border-[#B2BEB5]" value={techStack} onChange={(e) => setTechStack(e.target.value)} />
            </div>
            <button onClick={() => setStage(2)} disabled={role.length < 3} className="primary-button w-full mt-16">Initialize →</button>
          </div>
        )}
        {stage === 2 && (
          <div className="animate-fadeIn">
            {!showProjectLoop ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-2 italic uppercase tracking-tighter">Project Vault</h2>
                <div className="space-y-6 mt-10">
                  <input type="text" placeholder="Project Name" className="w-full bg-black/40 border border-[#2D2D2D] p-4 text-white rounded" value={curProjName} onChange={(e) => setCurProjName(e.target.value)} />
                  <textarea placeholder="Problem Solved (30+ chars)" className="w-full bg-black/40 border border-[#2D2D2D] p-4 text-white rounded h-32 resize-none" value={curProjProblem} onChange={(e) => setCurProjProblem(e.target.value)} />
                </div>
                <button onClick={saveProject} disabled={curProjName.length < 3 || curProjProblem.length < 30} className="primary-button w-full mt-10">Save to Dossier</button>
              </>
            ) : (
              <div className="flex flex-col items-center py-16">
                <h3 className="text-2xl font-bold text-white mb-8 tracking-tighter">{projects.length} Pattern(s) Locked</h3>
                <button onClick={() => setShowProjectLoop(false)} className="primary-button !bg-transparent border border-[#B2BEB5] !text-[#B2BEB5] w-full mb-4">Add Another</button>
                <button onClick={() => setStage(3)} className="primary-button w-full">Finalize Vault →</button>
              </div>
            )}
          </div>
        )}
        {stage === 3 && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-2 italic uppercase tracking-tighter">Selection Mode</h2>
            <div className="grid grid-cols-1 gap-4 mt-10">
              {[{ id: UserTier.FREE, price: '₹0', label: 'Explorer' }, { id: UserTier.PRO, price: '₹79', label: 'Active' }, { id: UserTier.ELITE, price: '₹149', label: 'Ready' }].map(t => (
                <button key={t.id} onClick={() => setTier(t.id)} className={`p-6 text-left border rounded-xl transition-all ${tier === t.id ? 'border-[#B2BEB5] bg-[#B2BEB5]/10' : 'border-[#2D2D2D]'}`}>
                  <div className="flex justify-between items-center"><span className="font-bold text-white text-lg">{t.label}</span><span className="text-xs font-mono text-[#B2BEB5]">{t.price}</span></div>
                </button>
              ))}
            </div>
            <button onClick={() => setStage(4)} className="primary-button w-full mt-12">Select Path →</button>
          </div>
        )}
        {stage === 4 && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-2 italic uppercase tracking-tighter">Placement Dossier</h2>
            <p className="text-xs text-slate-400 mb-8 uppercase tracking-widest">
              {tier === UserTier.ELITE ? "Resume Required for Elite Placement Mode" : "Optional: Add context for personalized logic"}
            </p>
            <textarea
              placeholder="Paste your Resume / CV content here..."
              className={`w-full bg-black/40 border p-4 text-white rounded h-64 resize-none mb-4 focus:outline-none ${tier === UserTier.ELITE && resume.length < 50 ? 'border-rose-500/50' : 'border-[#2D2D2D] focus:border-[#B2BEB5]'}`}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
            {tier === UserTier.ELITE && (
              <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-8">* Elite Mode requires resume context</p>
            )}
            <button onClick={() => setStage(5)} disabled={tier === UserTier.ELITE && resume.length < 50} className={`primary-button w-full ${tier === UserTier.ELITE && resume.length < 50 ? 'opacity-50 cursor-not-allowed' : ''}`}>Confirm Dossier →</button>
          </div>
        )}
        {stage === 5 && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-2 italic uppercase tracking-tighter">Milestones</h2>
            <div className="space-y-8 mt-10">
              <input type="text" placeholder="Horizon Goal (e.g. Placement)" className="w-full bg-black/40 border-b p-4 text-white outline-none focus:border-[#B2BEB5]" value={goal} onChange={(e) => setGoal(e.target.value)} />
              <input type="text" placeholder="Target Date" className="w-full bg-black/40 border-b p-4 text-white outline-none focus:border-[#B2BEB5]" value={goalDate} onChange={(e) => setGoalDate(e.target.value)} />
            </div>
            <button onClick={handleFinish} disabled={goal.length < 5} className="primary-button w-full mt-16">Complete Initialization</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [showLanding, setShowLanding] = useState(true);
  const [gate, setGate] = useState<IntentGate | null>(null);
  const [activePattern, setActivePattern] = useState<Pattern | null>(null);
  const [viewingLeetCodePath, setViewingLeetCodePath] = useState<Pattern | null>(null);
  const [user, setUser] = useState<UserState | null>(storageService.getUser());
  const [showUpgradeOverlay, setShowUpgradeOverlay] = useState(false);
  const hasAnimatedThisSession = useRef(false);

  // Check if user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('clarity_visited');
    if (hasVisited && user?.isProfileComplete) {
      setShowLanding(false);
    }
  }, []);

  const handleEnterApp = () => {
    localStorage.setItem('clarity_visited', 'true');
    setShowLanding(false);
  };

  // Update streak on app load
  useEffect(() => {
    if (user && user.isProfileComplete) {
      const today = new Date().toISOString().split('T')[0];
      let updatedUser = { ...user };
      
      // Reset daily usage if new day
      if (!user.dailyUsage || user.dailyUsage.date !== today) {
        updatedUser.dailyUsage = { date: today, dsa: 0, coding: 0, aptitude: 0, communication: 0 };
      }
      
      // Initialize pathProgress if missing (using extended patterns)
      if (!user.pathProgress || Object.keys(user.pathProgress).length < 15) {
        const initialPathProgress: Record<string, PathProgress> = { ...user.pathProgress };
        [...ALL_DSA_PATTERNS, ...ALL_APTITUDE_MODELS, ...ALL_CODE_CONCEPTS, ...ALL_COMM_FRAMEWORKS].forEach(pattern => {
          if (!initialPathProgress[pattern.id]) {
            initialPathProgress[pattern.id] = {
              patternId: pattern.id,
              completed: false,
              score: 0,
              attempts: 0,
              leetcodeProblems: pattern.leetcodeProblems?.map(p => ({
                problemId: p.id,
                solved: false,
                attempts: 0
              })) || []
            };
          }
        });
        updatedUser.pathProgress = initialPathProgress;
        updatedUser.achievements = updatedUser.achievements || [];
        updatedUser.currentStreak = updatedUser.currentStreak || 0;
        updatedUser.longestStreak = updatedUser.longestStreak || 0;
        updatedUser.totalXP = updatedUser.totalXP || 0;
        updatedUser.level = updatedUser.level || 1;
      }
      
      // Update streak
      if (user.lastActiveDate) {
        const lastDate = new Date(user.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Consecutive day - increase streak
          updatedUser.currentStreak = (user.currentStreak || 0) + 1;
          updatedUser.longestStreak = Math.max(updatedUser.currentStreak, user.longestStreak || 0);
        } else if (diffDays > 1) {
          // Streak broken
          updatedUser.currentStreak = 1;
        }
      } else {
        updatedUser.currentStreak = 1;
      }
      updatedUser.lastActiveDate = today;
      
      if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
        setUser(updatedUser);
        storageService.saveUser(updatedUser);
      }
      
      if (!hasAnimatedThisSession.current && user.tier !== UserTier.FREE) {
        setShowUpgradeOverlay(true);
        hasAnimatedThisSession.current = true;
      }
      setAppState(AppState.HOME);
    } else {
      setAppState(AppState.ONBOARDING);
    }
  }, [user?.isProfileComplete, user?.tier]);

  const handleOnboardingComplete = (newUser: UserState) => {
    storageService.saveUser(newUser);
    setUser(newUser);
  };

  const handleGoHome = () => {
    setGate(null); 
    setActivePattern(null); 
    setViewingLeetCodePath(null);
    setAppState(AppState.HOME);
  };

  const handleUpdateUser = (updatedUser: UserState) => {
    setUser(updatedUser);
    storageService.saveUser(updatedUser);
  };

  // Show landing page for first-time visitors
  if (showLanding) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  return (
    <ZenLayout
      title={user?.targetRole || "Clarity Terminal"}
      onGoHome={handleGoHome}
      isHome={appState === AppState.HOME || appState === AppState.ONBOARDING}
      tier={user?.tier}
      placementMode={user?.isPlacementModeActive}
    >
      {showUpgradeOverlay && user && (
        <UpgradeOverlay 
          tier={user.tier} 
          onComplete={() => setShowUpgradeOverlay(false)} 
        />
      )}
      {appState === AppState.ONBOARDING && <ProfileSetup onComplete={handleOnboardingComplete} />}
      {appState === AppState.HOME && user && (
        <div className="flex flex-col gap-20 py-12 animate-fadeIn">
          {!gate ? (
            <>
              <div className="text-center relative">
                <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2 bg-[#B2BEB5]/5 border border-[#B2BEB5]/10 rounded-full">
                   <div className={`w-2 h-2 rounded-full animate-pulse ${user.tier === UserTier.ELITE ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-[#B2BEB5] shadow-[0_0_8px_#B2BEB5]'}`}></div>
                   <span className={`text-[9px] font-bold uppercase tracking-[0.4em] ${user.tier === UserTier.ELITE ? 'text-amber-500' : 'text-[#B2BEB5]'}`}>
                     Terminal {TIER_DISPLAY[user.tier]} v3.5
                   </span>
                </div>
                <h2 className="text-8xl font-bold text-white mb-8 tracking-tighter uppercase italic">Clarity</h2>
                
                {/* Stats Dashboard */}
                <StatsDashboard user={user} />
                
                <div className="flex justify-center items-center gap-16 mb-16">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-[#475569] uppercase font-bold tracking-[0.4em] mb-2">Today's Progress</span>
                    <span className="text-5xl font-bold text-[#B2BEB5] font-mono">{user.completedToday || 0}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-[#475569] uppercase font-bold tracking-[0.4em] mb-2">Active Milestone</span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest px-6 py-3 border border-[#2D2D2D] rounded-full mt-2">"{user.milestone.goal}"</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto w-full px-4">
                {[
                  { id: IntentGate.DSA, label: 'DSA', desc: 'Thinking Patterns', problems: ALL_DSA_PATTERNS, color: 'from-cyan-500/20 to-blue-500/20' },
                  { id: IntentGate.APTITUDE, label: 'Aptitude', desc: 'Mental Models', problems: ALL_APTITUDE_MODELS, color: 'from-purple-500/20 to-pink-500/20' },
                  { id: IntentGate.CODING, label: 'Code', desc: 'Logic Templates', problems: ALL_CODE_CONCEPTS, color: 'from-emerald-500/20 to-teal-500/20' },
                  { id: IntentGate.COMMUNICATION, label: 'Speak', desc: 'Thought Structures', problems: ALL_COMM_FRAMEWORKS, color: 'from-amber-500/20 to-orange-500/20' }
                ].map((p) => {
                  const completedCount = p.problems.filter(pat => user.pathProgress[pat.id]?.completed).length;
                  return (
                    <button key={p.id} onClick={() => setGate(p.id)} className={`group card-container text-left min-h-[280px] flex flex-col justify-between hover:border-[#B2BEB5] transition-all p-10 bg-gradient-to-br ${p.color}`}>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tighter">{p.label}</h3>
                        <p className="text-[10px] text-[#475569] font-mono uppercase tracking-[0.2em]">{p.desc}</p>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-1 flex-1 bg-[#1C1C1C] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#B2BEB5] transition-all"
                              style={{ width: `${(completedCount / p.problems.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-[9px] text-[#B2BEB5] font-mono">{completedCount}/{p.problems.length}</span>
                        </div>
                      </div>
                      <div className="text-[10px] uppercase font-bold text-[#B2BEB5] opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.3em]">Initialize Institute →</div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : viewingLeetCodePath ? (
            <div className="px-6">
              <LeetCodePathView 
                pattern={viewingLeetCodePath}
                user={user}
                onBack={() => setViewingLeetCodePath(null)}
                onUpdateUser={handleUpdateUser}
                onStartPattern={() => {
                  setActivePattern(viewingLeetCodePath);
                  setViewingLeetCodePath(null);
                }}
              />
            </div>
          ) : !activePattern ? (
            <div className="px-6">
              <button onClick={() => setGate(null)} className="mb-12 text-[10px] text-[#B2BEB5] font-bold uppercase tracking-[0.4em] hover:text-white transition-colors">← Global Index</button>
              {gate === IntentGate.DSA && <PatternLibrary title="DSA" patterns={ALL_DSA_PATTERNS} user={user} onSelect={setActivePattern} onViewPath={setViewingLeetCodePath} limit={4} />}
              {gate === IntentGate.APTITUDE && <PatternLibrary title="Aptitude" patterns={ALL_APTITUDE_MODELS} user={user} onSelect={setActivePattern} onViewPath={setViewingLeetCodePath} limit={4} />}
              {gate === IntentGate.CODING && <PatternLibrary title="Coding" patterns={ALL_CODE_CONCEPTS} user={user} onSelect={setActivePattern} onViewPath={setViewingLeetCodePath} limit={2} />}
              {gate === IntentGate.COMMUNICATION && <PatternLibrary title="Speaking" patterns={ALL_COMM_FRAMEWORKS} user={user} onSelect={setActivePattern} onViewPath={setViewingLeetCodePath} limit={2} />}
            </div>
          ) : (
            <div className="px-6">
              <button onClick={() => setActivePattern(null)} className="mb-12 text-[10px] text-[#B2BEB5] font-bold uppercase tracking-[0.4em] hover:text-white transition-colors">← Return to Library</button>
              <UnifiedThinkingSession
                pattern={activePattern}
                user={user}
                onBack={() => setActivePattern(null)}
                onUpdateUser={handleUpdateUser}
              />
            </div>
          )}
        </div>
      )}
      <KeyMonitor />
    </ZenLayout>
  );
}