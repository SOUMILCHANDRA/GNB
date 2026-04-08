import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Plus, Minus, Timer, AlertTriangle, ShieldAlert } from "lucide-react";

export default function ActionPanel({ onTransfer, onReverse }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isReversible, setIsReversible] = useState(true);
  const totalDuration = 60;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsReversible(false);
    }
  }, [timeLeft]);

  const progress = (timeLeft / totalDuration) * 283; // 283 is approx circumference for r=45

  return (
    <div className="space-y-8">
      {/* Quick Ops Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.98 }}
          className="h-24 rounded-2xl border border-white/5 bg-white/[0.03] flex flex-col items-center justify-center gap-2 group transition-colors"
        >
          <Plus className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/60 group-hover:text-white">Deposit</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.98 }}
          className="h-24 rounded-2xl border border-white/5 bg-white/[0.03] flex flex-col items-center justify-center gap-2 group transition-colors"
        >
          <Minus className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/60 group-hover:text-white">Withdraw</span>
        </motion.button>
      </div>

      {/* Hero Action: Initiate Transfer */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,229,255,0.3)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onTransfer}
        className="w-full py-6 rounded-2xl bg-cyan-500 text-black font-black tracking-[0.2em] flex items-center justify-center gap-3 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        INITIATE TRANSFER
      </motion.button>

      {/* EMERGENCY PROTOCOL: REVERSE SYSTEM */}
      <div className="pt-6 border-t border-white/5">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-red-500 tracking-[0.3em] uppercase flex items-center gap-2">
              <ShieldAlert className="w-3 h-3 animate-pulse" />
              Emergency Protocol
            </h4>
            <p className="text-xs font-bold text-white/80">60s Transaction Reversal</p>
          </div>
          
          {/* Circular SVG Timer */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray="176" // 2 * pi * 28
                animate={{ strokeDashoffset: 176 - (176 * (timeLeft / totalDuration)) }}
                className={isReversible ? "text-red-500 shadow-[0_0_10px_#ef4444]" : "text-white/20"}
              />
            </svg>
            <span className={`absolute font-mono font-black text-xs ${isReversible ? "text-red-500" : "text-white/20"}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <motion.button
          disabled={!isReversible}
          onClick={onReverse}
          whileHover={isReversible ? { scale: 1.02, boxShadow: "0 0 40px rgba(239,68,68,0.2)" } : {}}
          whileTap={isReversible ? { scale: 0.98 } : {}}
          className={`w-full py-5 rounded-2xl border flex items-center justify-center gap-3 transition-all duration-500 ${
            isReversible 
              ? "bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20" 
              : "bg-white/5 border-white/10 text-white/20 cursor-not-allowed"
          }`}
        >
          {isReversible ? (
            <>
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="font-black tracking-[0.2em]">REVERSAL WINDOW ACTIVE</span>
            </>
          ) : (
            <span className="font-black tracking-[0.2em] opacity-40">PROTOCOL EXPIRED</span>
          )}
        </motion.button>
        
        <AnimatePresence>
          {isReversible && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 text-[10px] text-red-400 font-bold tracking-wider text-center flex items-center justify-center gap-2 animate-pulse"
            >
              ⚠ SYSTEM VULNERABLE DURING REVERSAL ⚠
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
