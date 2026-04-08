import { useState } from "react";
import { motion } from "framer-motion";
import ParticleBg from "./ParticleBg";
import { UserPlus, ShieldCheck } from "lucide-react";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const userData = {
      name: name.trim(),
      created_at: new Date().toISOString(),
      balance: 1000000, // Legendary starting balance
      transactions: 0
    };
    
    localStorage.setItem("gnb_user", JSON.stringify(userData));
    onRegister(userData);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <ParticleBg />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            <UserPlus className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-3xl font-display font-black text-center tracking-tight mb-2 uppercase">Identify Yourself</h1>
        <p className="text-white/40 text-center text-sm font-medium tracking-widest uppercase mb-10">GNB Security Clearance Required</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase ml-1">Alias / Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-lg font-bold placeholder:text-white/10"
              placeholder="Enter your legend's name"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,229,255,0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-5 bg-cyan-500 text-black font-black tracking-widest rounded-2xl transition-all shadow-lg"
          >
            ESTABLISH CLEARANCE
          </motion.button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-3 opacity-40">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-widest uppercase">Encryption active: Protocol 83</span>
        </div>
      </motion.div>

      {/* Narrative layer at bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute bottom-10 text-[10px] tracking-[0.8em] uppercase font-bold text-white/40 pointer-events-none"
      >
        "First impressions are everything, Suit up."
      </motion.div>
    </div>
  );
}
