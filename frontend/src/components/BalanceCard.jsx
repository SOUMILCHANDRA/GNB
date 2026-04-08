import { motion, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import GlassCard from "./ui/GlassCard";
import { formatCurrency } from "../lib/utils";
import { Database, TrendingUp } from "lucide-react";

const BalanceCard = ({ balance }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, balance, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (value) => setDisplayValue(value),
    });
    return () => controls.stop();
  }, [balance]);

  return (
    <GlassCard className="col-span-full lg:col-span-2 h-full flex flex-col justify-between group overflow-hidden" glow>
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="flex justify-between items-start">
        <div>
          <p className="text-white/40 text-xs font-bold tracking-[0.2em] mb-1">TOTAL LIQUID ASSETS</p>
          <h2 className="text-sm font-medium text-white/80">Barney Stinson's Vault</h2>
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
          <Database className="w-5 h-5" />
        </div>
      </div>

      <div className="my-8">
        <motion.div 
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          {formatCurrency(displayValue)}
        </motion.div>
        <div className="flex items-center gap-2 mt-4 text-primary text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>+24.5% LEGENDARY GROWTH</span>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t border-white/10">
        <div className="flex-1">
          <p className="text-[10px] text-white/40 mb-1">TIER STATUS</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#00E5FF]" />
            <span className="text-xs font-bold">ELITE WINGMAN</span>
          </div>
        </div>
        <div className="flex-1 border-l border-white/10 pl-4">
          <p className="text-[10px] text-white/40 mb-1">RELIABILITY</p>
          <span className="text-xs font-bold text-white/80">100.0% LEGIT</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default BalanceCard;
