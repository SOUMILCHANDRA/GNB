import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "../services/authService";
import ParticleBg from "./ParticleBg";
import { UserPlus, ShieldCheck, Ghost } from "lucide-react";

export default function Register({ onRegister }) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setLoading(true);
      setError("");
      try {
        if (isLogin) {
          await authService.login(email, password);
        } else {
          const user = await authService.signUp(email, password, name.trim());
          onRegister(user);
        }
      } catch (err) {
        setError(err.message === "Email rate limit exceeded" ? "SECURITY LOCKOUT: Wait 60s or Use Ghost Mode" : err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await authService.loginAnonymously();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            {isLogin ? <ShieldCheck className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
          </div>
        </div>

        <h1 className="text-3xl font-display font-black text-center tracking-tight mb-2 uppercase">
          {isLogin ? "Verify Identity" : "Identify Yourself"}
        </h1>
        <p className="text-white/40 text-center text-sm font-medium tracking-widest uppercase mb-10">
          {isLogin ? "Protocol: SESSION_RESTORE" : "GNB Security Clearance Required"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase ml-1">Alias / Name</label>
                <input
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-lg font-bold placeholder:text-white/10"
                  placeholder="Your legend's name"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase ml-1">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-lg font-bold placeholder:text-white/10"
              placeholder="Email@bro.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase ml-1">Secure Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-lg font-bold placeholder:text-white/10"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>
          )}

          <div className="pt-4 space-y-4">
            <motion.button
              whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 30px rgba(0,229,255,0.3)" } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-cyan-500 text-black font-black tracking-widest rounded-2xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-wait uppercase"
            >
              {loading ? "Processing..." : (isLogin ? "Authenticate" : "Establish Clearance")}
            </motion.button>

            <motion.button
              whileHover={!loading ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="button"
              onClick={handleAnonymousLogin}
              disabled={loading}
              className="w-full py-4 border border-white/10 text-white/60 font-bold tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 uppercase text-xs"
            >
              <Ghost className="w-4 h-4" />
              Ghost Access (Skip Email)
            </motion.button>
          </div>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-cyan-400 transition-colors"
        >
          {isLogin ? "Need a new identity? Sign Up" : "Already a legend? Log In"}
        </button>

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
