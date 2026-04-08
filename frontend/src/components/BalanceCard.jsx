import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import GlassCard from "./ui/GlassCard";
import { formatCurrency } from "../lib/utils";
import { Database, TrendingUp, Sparkles } from "lucide-react";

// Custom hook to animate numbers
const useCountUp = (target, duration = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (value) => setCount(value),
    });
    return () => controls.stop();
  }, [target, duration]);

  return count;
};

const BalanceCard = ({ balance }) => {
  const count = useCountUp(balance);

  return (
    <motion.div
      whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full perspective-1000"
    >
      <GlassCard className="h-full flex flex-col justify-between group overflow-hidden relative border-cyan-500/20" glow>
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,229,255,0.2)_0%,transparent_70%)] pointer-events-none"
          />
        </div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">Liquid Core</p>
            </div>
            <h2 className="text-xs font-medium text-white/60 tracking-wider">SECURE_VAULT_SYSTEM_v4</h2>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Database className="w-5 h-5" />
          </div>
        </div>

        <div className="relative z-10 my-8">
          <motion.div 
            className="text-5xl md:text-7xl font-display font-black tracking-tighter text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-cyan-500 mr-2 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">$</span>
            {formatCurrency(count).replace('$', '')}
          </motion.div>
          <div className="flex items-center gap-2 mt-4">
             <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-[10px] font-bold text-green-500 tracking-wider">+24.5% LEGENDARY STATUS</span>
             </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 pt-6 border-t border-white/5">
          <div className="flex-1">
            <p className="text-[9px] text-white/30 font-bold mb-1 tracking-widest">TIER RANK</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#00E5FF] animate-pulse" />
              <span className="text-[11px] font-black tracking-wide text-white/90">SUPREME WINGMAN</span>
            </div>
          </div>
          <div className="flex-1 border-l border-white/5 pl-4">
            <p className="text-[9px] text-white/30 font-bold mb-1 tracking-widest">UPTIME</p>
            <span className="text-[11px] font-black tracking-wide text-cyan-400">99.9% SUITED</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default BalanceCard;
