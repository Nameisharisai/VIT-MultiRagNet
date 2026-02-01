
import React, { useEffect, useState } from 'react';
import { subscribeToKeyUpdates, VaultState, KeyStatus } from '../services/llmService';

const StatusDot: React.FC<{ status: KeyStatus, index: number }> = ({ status, index }) => {
    let color = "bg-slate-700 opacity-20"; // IDLE
    let glow = "";

    if (status === 'ACTIVE') {
        color = "bg-cyan-500";
        glow = "shadow-[0_0_10px_#06b6d4]";
    } else if (status === 'COOLDOWN') {
        color = "bg-amber-500";
        glow = "shadow-[0_0_10px_#f59e0b]";
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`w-2 h-8 rounded-full transition-all duration-300 ${color} ${glow}`}></div>
            <span className="text-[8px] font-mono text-slate-600">0{index + 1}</span>
        </div>
    );
};

export const KeyMonitor: React.FC = () => {
    const [vaultState, setVaultState] = useState<VaultState>({});

    useEffect(() => {
        // Subscribe to service updates
        const unsubscribe = subscribeToKeyUpdates((state) => {
            setVaultState(state);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="fixed bottom-6 right-6 flex gap-3 p-4 bg-[#0f172a]/90 backdrop-blur border border-white/5 rounded-xl z-50">
            <div className="flex flex-col justify-center mr-2 border-r border-white/5 pr-4">
                <span className="text-[8px] uppercase font-bold text-slate-500 tracking-widest">Neural<br />Link</span>
                <span className="text-[10px] font-bold text-cyan-500">RESILIENT</span>
            </div>
            <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map(i => (
                    <StatusDot key={i} index={i} status={vaultState[i] || 'IDLE'} />
                ))}
            </div>
        </div>
    );
};
