import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleBg from "./ParticleBg";

export default function SuitUpAnimation({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = [
      () => setStage(1), // Pulse
      () => setStage(2), // System Check
      () => setStage(3), // Glitch Identity
      () => setStage(4), // Flash
      () => onComplete()
    ];

    const timers = sequence.map((fn, i) => {
      return setTimeout(fn, i * 800); // Slightly slower for more impact
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden text-white">
      
      <ParticleBg />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Glow Pulse */}
      {stage >= 1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 12, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-40 h-40 bg-cyan-500 rounded-full blur-3xl z-0"
        />
      )}

      {/* Boot Process */}
      <div className="relative z-10 flex flex-col items-center">
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-2"
          >
            <p className="text-cyan-400 tracking-[0.5em] font-mono text-sm animate-pulse">
              INITIALIZING WINGMAN_PROTOCOL...
            </p>
            <div className="w-64 h-[2px] bg-gray-900 overflow-hidden mx-auto">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ duration: 0.6 }}
                 className="w-full h-full bg-cyan-500"
               />
            </div>
          </motion.div>
        )}

        {/* Glitch Identity Reveal */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col items-center"
          >
            <h1 
              className="glitch text-4xl md:text-6xl font-black tracking-tighter" 
              data-text="WELCOME, BARNEY STINSON"
            >
              WELCOME, BARNEY STINSON
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-1 bg-cyan-400 mt-4 shadow-[0_0_15px_#00ffff]"
            />
          </motion.div>
        )}
      </div>

      {/* Scan Line Effect */}
      {stage >= 2 && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "200%" }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-[1px] bg-cyan-400/30 blur-[1px] z-50 pointer-events-none"
        />
      )}

      {/* Final Flash Transition */}
      {stage === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-white z-[100]"
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
    </div>
  );
}
