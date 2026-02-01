import React from 'react';
import { UserTier } from '../types';

interface ZenLayoutProps {
  children: React.ReactNode;
  title?: string;
  onGoHome?: () => void;
  isHome?: boolean;
  tier?: UserTier;
  placementMode?: boolean;
}

export const ZenLayout: React.FC<ZenLayoutProps> = ({ children, title, onGoHome, isHome, tier, placementMode }) => {
  return (
    <div className="min-h-screen bg-[#100C08] text-white flex flex-col items-center p-6 md:p-12 selection:bg-[#B2BEB5] selection:text-[#100C08]">
      <header className="w-full max-w-5xl flex justify-between items-center mb-12 border-b border-[#2D2D2D] pb-6">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-white">Clarity</h1>
            {tier && (
              <span className={`text-[8px] font-bold uppercase tracking-[0.3em] ${
                tier === UserTier.ELITE ? 'text-amber-500' : 
                tier === UserTier.PRO ? 'text-[#B2BEB5]' : 
                'text-[#475569]'
              }`}>
                {tier === UserTier.ELITE ? 'ULTRA' : tier} EDITION
              </span>
            )}
          </div>
          {!isHome && onGoHome && (
            <button 
              onClick={onGoHome}
              className="px-4 py-2 border border-[#2D2D2D] rounded text-[10px] font-bold text-[#475569] hover:text-[#B2BEB5] hover:border-[#B2BEB5] transition-all uppercase tracking-widest font-mono group"
            >
              <span className="group-hover:-translate-x-1 transition-transform inline-block mr-2">←</span> 
              BACK TO HOME
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          {placementMode && (
             <div className="flex items-center gap-2 px-3 py-1 bg-[#B2BEB5]/10 border border-[#B2BEB5]/30 rounded-full animate-pulse">
                <div className={`w-1.5 h-1.5 rounded-full ${tier === UserTier.ELITE ? 'bg-amber-500' : 'bg-[#B2BEB5]'}`}></div>
                <span className={`text-[8px] font-bold uppercase tracking-widest ${tier === UserTier.ELITE ? 'text-amber-500' : 'text-[#B2BEB5]'}`}>
                  Placement Mode Active
                </span>
             </div>
          )}
          {title && (
            <span className="text-[10px] font-bold text-[#B2BEB5] uppercase tracking-[0.2em] bg-[#1C1C1C] px-4 py-1.5 rounded-full border border-[#2D2D2D]">
              {title}
            </span>
          )}
        </div>
      </header>
      <main className="w-full max-w-5xl flex-grow flex flex-col">
        {children}
      </main>
      <footer className="mt-20 pb-8 text-[10px] text-[#475569] uppercase tracking-[0.4em] text-center font-bold">
        Terminal Online • Thinking Mode Active
      </footer>
    </div>
  );
};