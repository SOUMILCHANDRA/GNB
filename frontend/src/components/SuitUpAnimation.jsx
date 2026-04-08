import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SuitUpAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // Slightly longer for more "weight"

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden relative">
      
      {/* Expanding Glow Pulse */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 4, 10], opacity: [0, 0.5, 0.2, 0] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute w-64 h-64 rounded-full bg-cyan-500 blur-3xl z-0"
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 6, 15], opacity: [0, 0.3, 0.1, 0] }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        className="absolute w-64 h-64 rounded-full bg-purple-500 blur-3xl z-0"
      />

      {/* Grid Overlay background effect */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-[2px] bg-cyan-400 mx-auto"
          />

          <motion.h2
            initial={{ letterSpacing: "2px", opacity: 0 }}
            animate={{ letterSpacing: "12px", opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-cyan-400 font-bold uppercase tracking-widest"
          >
            INITIALIZING
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            WINGMAN PROTOCOL
          </motion.h1>

          {/* Loading Bar Container */}
          <div className="mt-12 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
              className="w-80 h-1 bg-gray-800 origin-left mx-auto overflow-hidden rounded-full border border-white/5"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-white shadow-[0_0_15px_#00ffff]"
              />
            </motion.div>
            
            {/* Percentage Indicator */}
            <div className="mt-4 flex justify-between w-80 mx-auto text-[10px] text-cyan-500 font-mono font-bold">
              <span>SYSTEM CHECK</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.1 }}
              >
                ACCESSING...
              </motion.span>
            </div>
          </div>

          {/* Auth Loading Steps */}
          <div className="mt-10 h-12 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-gray-500 text-xs font-mono"
            >
              SYNCHRONIZING BIO-METRICS...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-gray-500 text-xs font-mono"
            >
              BYPASSING FIREWALLS...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.4 }}
              className="text-cyan-400 font-bold tracking-widest"
            >
              WELCOME, BARNEY STINSON
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Scanner bars */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 2.5, ease: "linear", repeat: 0 }}
        className="absolute w-full h-20 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent z-10 pointer-events-none"
      />
    </div>
  );
}
