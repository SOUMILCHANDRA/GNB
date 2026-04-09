import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import BalanceCard from "./BalanceCard";
import TransactionHistory from "./TransactionHistory";
import ActionPanel from "./ActionPanel";
import TransferModal from "./TransferModal";
import { bankingService } from "../services/bankingService";
import { useBankingStore } from "../store/useBankingStore";
import { useRealtime } from "../hooks/useRealtime";
import GlassCard from "./ui/GlassCard";
import { TrendingUp, UserCheck, Shield, Activity, Zap, CheckCircle } from "lucide-react";
import ParticleBg from "./ParticleBg";
import SystemCore from "./SystemCore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  
  // System State from Store
  const { 
    user, 
    balance, 
    transactions, 
    isReversing, 
    setIsReversing,
    systemStatus 
  } = useBankingStore();

  // Initialize Real-time synchronization
  useRealtime(user?.id);

  const handleDeposit = async (amount) => {
    try {
      await bankingService.deposit(user.id, amount);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWithdraw = async (amount) => {
    try {
      await bankingService.withdraw(user.id, amount);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTransferComplete = async ({ id, amount }) => {
    try {
      await bankingService.transfer(user.id, id, parseFloat(amount));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReverse = async () => {
    if (isReversing) return;
    
    setIsReversing(true);
    
    const tl = gsap.timeline({
      onComplete: async () => {
        try {
          await bankingService.reverseLastTransaction(user.id);
        } catch (err) {
          alert(err.message);
        } finally {
          setIsReversing(false);
        }
      }
    });

    tl.to("body", { backgroundColor: "#1a000a", duration: 0.2 })
      .to(".main-card", { 
        x: () => (Math.random() - 0.5) * 20, 
        y: () => (Math.random() - 0.5) * 20,
        opacity: 0.8,
        duration: 0.1, 
        repeat: 10, 
        yoyo: true 
      })
      .to(".telemetry-card", { 
        skewX: 10, 
        opacity: 0.5, 
        duration: 0.1, 
        repeat: 10, 
        yoyo: true 
      }, 0)
      .to("body", { backgroundColor: "#000000", duration: 0.5 });
  };

  useGSAP(() => {
    // Initial system scan animation
    const tl = gsap.timeline();
    
    tl.from(".telemetry-card", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    })
    .from(".main-card", {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "elastic.out(1, 0.8)"
    }, "-=0.5");

    // HUD Flicker effect
    gsap.to(".hud-flicker", {
      opacity: 0.4,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)"
    });

    // Scroll Driven Parallax / State Changes
    gsap.to(".main-card", {
      scrollTrigger: {
        trigger: ".main-card",
        start: "top center",
        end: "bottom top",
        scrub: 1
      },
      y: -50,
      scale: 0.98,
      opacity: 0.9,
      rotationX: 2
    });

    gsap.to(".telemetry-card", {
      scrollTrigger: {
        trigger: ".telemetry-card",
        start: "top bottom",
        end: "top center",
        scrub: 1
      },
      x: 0,
      opacity: 1,
      stagger: 0.1
    });
  });

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* Background Layer 1: 3D System Core */}
      {/* Background Layer 1: 3D System Core */}
      <SystemCore isReversing={isReversing} balance={balance} systemStatus={systemStatus} />
      
      {/* Background Layer 2: Connecting Particles */}
      <ParticleBg balance={balance} systemStatus={systemStatus} />
      
      {/* Mid Layer: Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-5] opacity-20 bg-mesh" />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-6 pb-20 pt-28 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* F1 Telemetry Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="telemetry-card p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                  <Activity className="hud-flicker w-4 h-4 text-cyan-500" />
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">System Status</p>
                    <p className={`text-xs font-mono font-bold ${systemStatus === 'CRITICAL' ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                      {systemStatus}
                    </p>
                  </div>
                </div>
                <div className="telemetry-card p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                  <Zap className="hud-flicker w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">TX Speed</p>
                    <p className="text-xs font-mono font-bold">0.21s</p>
                  </div>
                </div>
                <div className="telemetry-card p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                  <CheckCircle className="hud-flicker w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Success Rate</p>
                    <p className="text-xs font-mono font-bold">100%</p>
                  </div>
                </div>
                <div className="telemetry-card p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                  <TrendingUp className="hud-flicker w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Market Drift</p>
                    <p className="text-xs font-mono font-bold">+4.2%</p>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="main-card flex-1">
                       <BalanceCard balance={balance} />
                    </div>
                    
                    <div className="main-card flex-1 flex flex-col gap-6">
                      <GlassCard className="flex-1 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                        <div className="flex flex-col h-full justify-between">
                          <UserCheck className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
                          <div>
                            <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">Authenticated As</p>
                            <h3 className="text-xl font-display font-bold text-white">{user?.name || "BRO"}</h3>
                            <p className="text-sm text-primary font-medium mt-1">ID: #{user?.id?.slice(0,8)}</p>
                          </div>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="flex-1 border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer group">
                        <div className="flex flex-col h-full justify-between">
                          <Shield className="w-8 h-8 text-secondary mb-4 transition-transform group-hover:scale-110" />
                          <div>
                            <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">Security Status</p>
                            <h3 className="text-xl font-display font-bold text-white">IRONCLAD</h3>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                  <div key={i} className="w-4 h-1 rounded-full bg-secondary shadow-[0_0_8px_rgba(112,0,255,0.6)] animate-pulse" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </div>

                  <div>
                    <TransactionHistory transactions={transactions} />
                  </div>
                </div>

                {/* Command Center Column */}
                <div className="main-card h-full">
                  <GlassCard className="h-full border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#00ffff] animate-ping" />
                      <h3 className="text-lg font-display font-bold uppercase tracking-widest">Command Center</h3>
                    </div>
                    
                    <ActionPanel 
                      onTransfer={() => setIsTransferModalOpen(true)} 
                      onReverse={handleReverse}
                      onDeposit={handleDeposit}
                      onWithdraw={handleWithdraw}
                    />

                    <div className="mt-12 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-bold tracking-widest opacity-60 uppercase">System Insights</span>
                      </div>
                      <p className="text-xs leading-relaxed text-white/40 font-medium leading-loose italic">
                        "True power isn't about the balance in your account, it's about the suit you're wearing while you check it."
                      </p>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="void-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[60vh] flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-4xl font-display font-black tracking-[0.5em] text-white/20 uppercase">Protocol: VOID</h2>
              <p className="text-xs tracking-[0.3em] text-white/10 mt-4 uppercase">System core exposure active. Enjoy the silence.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TransferModal 
        isOpen={isTransferModalOpen} 
        onClose={() => setIsTransferModalOpen(false)} 
        onComplete={handleTransferComplete}
      />

      {/* Decorative text at bottom */}
      <div className="fixed bottom-6 w-full text-center pointer-events-none opacity-10">
         <p className="text-[10px] tracking-[1em] uppercase font-bold text-white">GNB LEGENDARY INTERFACE v2.0</p>
      </div>
    </div>
  );
}
