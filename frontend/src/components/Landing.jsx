import { motion } from "framer-motion";
import Button from "./ui/Button";
import { ChevronRight, ArrowRight } from "lucide-react";

const Landing = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-glow" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-white/80 uppercase tracking-widest">Available Now</span>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-none"
        >
          YOUR FINANCIAL <br />
          <span className="text-primary neon-text-primary">WINGMAN.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Debit or credit? Relax. We got you, bro. Experience the bank that’s legen... wait for it... dary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="xl" onClick={onGetStarted} className="group">
            SUIT UP
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          <button className="text-white hover:text-primary transition-colors flex items-center gap-2 font-medium tracking-wide">
            EXPLORE THE VAULT
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </button>
        </motion.div>

        {/* F1 inspired stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12"
        >
          {[
            { label: "TRANSACTION SPEED", value: "0.002s" },
            { label: "BANKING STATUS", value: "LEGENDARY" },
            { label: "SUIT QUALITY", value: "800 THREAD" },
            { label: "WINGMAN LEVEL", value: "ELITE" },
          ].map((stat, i) => (
            <div key={i} className="text-left">
              <p className="text-[10px] text-white/40 tracking-[0.2em] font-bold mb-1">{stat.label}</p>
              <p className="text-2xl font-display font-medium text-white">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
