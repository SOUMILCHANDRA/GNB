import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleBg from "./ParticleBg";

export default function SuitUpAnimation({ onComplete, user }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = [
      () => setStage(1), // Pulse (0s)
      () => setStage(2), // System Initialization (1.5s)
      () => setStage(3), // Access Granted / Barney Quote (3.5s)
      () => setStage(4), // Flash (7.5s)
      () => onComplete() // (8.5s)
    ];

    const deltas = [0, 1500, 3500, 7500, 8500];
    const timers = sequence.map((fn, i) => {
      return setTimeout(fn, deltas[i]);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden text-white">
      
      <ParticleBg />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      </div>

      {/* Glow Pulse */}
      {stage >= 1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute w-40 h-40 bg-cyan-500 rounded-full blur-3xl z-0"
        />
      )}

      {/* Narrative Boot Process */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6">
        
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full text-center space-y-4 font-mono"
          >
            <div className="space-y-1">
               <p className="text-cyan-500 text-[10px] tracking-[0.4em] uppercase">Initializing Wingman Protocol...</p>
               <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase">Scanning Profile: {user?.name}...</p>
            </div>
            
            <div className="w-full h-[2px] bg-gray-900 overflow-hidden relative">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ duration: 2 }}
                 className="w-full h-full bg-cyan-500 shadow-[0_0_10px_#00ffff]"
               />
            </div>
            
            <p className="text-white text-xs tracking-widest animate-pulse">BIOMETRICS SYNCED</p>
          </motion.div>
        )}

        {/* Access Granted / Identity Reveal */}
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="space-y-2">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 font-mono text-xs tracking-[0.5em] uppercase"
              >
                Access Granted
              </motion.p>
              <h1 
                className="glitch text-5xl md:text-7xl font-black tracking-tighter" 
                data-text={`WELCOME, ${user?.name?.toUpperCase()}`}
              >
                WELCOME, {user?.name?.toUpperCase()}
              </h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                 <p className="text-cyan-400 font-display italic text-xl">"Barney trusts you."</p>
                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1.5 }}
                    className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20"
                 >
                    <p className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest leading-relaxed">
                       <span className="text-cyan-400 font-bold">New Recruit Note:</span><br />
                       Verification Protocol Active. Please check your transmission queue (Email) to confirm your identity before proceeding to elite banking modules.
                    </p>
                 </motion.div>
              </div>
              
              <div className="flex justify-center gap-6 text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase pt-4">
                <div className="flex flex-col items-center">
                  <span className="text-white">100%</span>
                  <span>Suit Integrity</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-cyan-400">ACTIVE</span>
                  <span>Legend Status</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>

      {/* Scan Line Effect */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "200%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-[1px] bg-cyan-500/20 blur-[1px] z-50 pointer-events-none"
      />

      {/* Final Flash Transition */}
      {stage === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-white z-[100]"
        />
      )}
    </div>
  );
}
