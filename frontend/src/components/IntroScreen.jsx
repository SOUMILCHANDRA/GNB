import { motion } from "framer-motion";

export default function IntroScreen({ onStart }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 border-2 border-cyan-500 rounded-lg flex items-center justify-center rotate-45 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            <span className="text-4xl font-bold -rotate-45 text-cyan-400">G</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-[0.2em] font-display text-white text-center"
        >
          GOLIATH NATIONAL BANK
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full max-w-md my-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-lg tracking-[0.3em] font-light uppercase"
        >
          Your Financial Wingman
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-12 px-12 py-4 rounded-full bg-cyan-500 text-black font-black tracking-widest text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-shadow duration-300"
        >
          SUIT UP
        </motion.button>
      </div>
      
      {/* Decorative text at the bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-10 text-[10px] tracking-[0.5em] text-white uppercase hidden md:block"
      >
        Member FDIC | Legendary Status Required
      </motion.div>
    </div>
  );
}
