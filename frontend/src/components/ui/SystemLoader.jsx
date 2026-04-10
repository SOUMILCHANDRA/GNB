import { motion } from "framer-motion";

export default function SystemLoader({ message = "INITIALIZING SYSTEM..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center"
    >
      <div className="relative">
        {/* Animated Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-2 border-primary/20 border-t-primary rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-2 border-secondary/20 border-b-secondary rounded-full"
        />
      </div>

      <div className="mt-8 text-center">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-primary font-mono text-xs font-black tracking-[0.5em] uppercase mb-2"
        >
          {message}
        </motion.div>
        
        <div className="flex gap-1 justify-center">
          {[1,2,3,4,5].map(i => (
            <motion.div
              key={i}
              animate={{
                scaleY: [1, 2, 1],
                backgroundColor: ["rgba(0,255,255,0.2)", "rgba(0,255,255,1)", "rgba(0,255,255,0.2)"]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
              className="w-1 h-3 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 font-mono text-[10px] text-white/20 tracking-widest uppercase">
        Goliath National Bank // Automated Terminal
      </div>
    </motion.div>
  );
}
