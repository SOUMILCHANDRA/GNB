import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { Send, Plus, Minus, History, Timer, AlertCircle } from "lucide-react";

const ActionPanel = ({ onTransfer, onReverse }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isReversible, setIsReversible] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsReversible(false);
    }
  }, [timeLeft]);

  return (
    <div className="space-y-6 h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-24 flex-col gap-2 border-primary/20 hover:border-primary/50 group">
          <Plus className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Deposit</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2 border-white/10 hover:border-white/30 group">
          <Minus className="w-6 h-6 group-hover:scale-125 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Withdraw</span>
        </Button>
      </div>

      <Button variant="primary" size="lg" className="w-full py-6 group" onClick={onTransfer}>
        <Send className="mr-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        INITIATE TRANSFER
      </Button>

      {/* Signature Feature: Reverse Transaction */}
      <div className="relative pt-4">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h4 className="text-xs font-bold text-white/40 tracking-[0.2em] uppercase">Emergency Protocol</h4>
            <p className="text-sm font-bold text-white/80">Reverse Last Move</p>
          </div>
          <div className="flex items-center gap-2 text-accent font-mono text-xl font-bold bg-accent/10 px-3 py-1 rounded-lg border border-accent/20">
            <Timer className="w-4 h-4 animate-pulse" />
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        </div>

        <motion.div
           animate={isReversible ? { 
             boxShadow: [
               "0 0 0px rgba(255,0,122,0)", 
               "0 0 20px rgba(255,0,122,0.3)", 
               "0 0 0px rgba(255,0,122,0)"
             ] 
           } : {}}
           transition={{ duration: 2, repeat: Infinity }}
           className="rounded-2xl overflow-hidden"
        >
          <Button 
            variant="accent" 
            className="w-full py-6 disabled:bg-white/5 disabled:text-white/20 disabled:border-white/10"
            disabled={!isReversible}
            onClick={onReverse}
          >
            {isReversible ? "REVERSE TRANSACTION" : "TIME EXPIRED"}
          </Button>
        </motion.div>

        <AnimatePresence>
          {isReversible && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-[10px] text-accent/60 font-medium flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              Did the bro cheat? You have {timeLeft} seconds to take it back.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActionPanel;
