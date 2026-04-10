import { motion } from "framer-motion";
import { TrendingUp, UserCheck, Shield, Activity, Zap, CheckCircle } from "lucide-react";
import BalanceCard from "../components/BalanceCard";
import TransactionHistory from "../components/TransactionHistory";
import ActionPanel from "../components/ActionPanel";
import GlassCard from "../components/ui/GlassCard";
import { useBankingStore } from "../store/useBankingStore";
import { bankingService } from "../services/bankingService";
import { useRealtime } from "../hooks/useRealtime";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { 
    user, 
    balance, 
    transactions, 
    isReversing, 
    setIsReversing,
    systemStatus 
  } = useBankingStore();

  useRealtime(user?.id);

  useGSAP(() => {
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

    gsap.to(".hud-flicker", {
      opacity: 0.4,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)"
    });
  }, []);

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
      .to("body", { backgroundColor: "#000000", duration: 0.5 });
  };

  return (
    <div className="space-y-8">
      {/* Telemetry Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "System Status", value: systemStatus, icon: Activity, color: systemStatus === 'CRITICAL' ? 'text-red-500' : 'text-cyan-400' },
          { label: "TX Speed", value: "0.21s", icon: Zap, color: "text-yellow-500" },
          { label: "Success Rate", value: "100%", icon: CheckCircle, color: "text-green-500" },
          { label: "Market Drift", value: "+4.2%", icon: TrendingUp, color: "text-purple-500" },
        ].map((item, i) => (
          <div key={i} className="telemetry-card p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
            <item.icon className={`hud-flicker w-4 h-4 ${item.color}`} />
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{item.label}</p>
              <p className={`text-xs font-mono font-bold ${item.color}`}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="main-card flex-1">
               <BalanceCard balance={balance} />
            </div>
            
            <div className="main-card flex-1 flex flex-col gap-6">
              <GlassCard 
                onClick={() => navigate('/profile')}
                className="flex-1 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col h-full justify-between">
                  <UserCheck className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
                  <div>
                    <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">Identity Access</p>
                    <h3 className="text-xl font-display font-bold text-white">{user?.name || "GUEST"}</h3>
                    <p className="text-sm text-primary font-medium mt-1 uppercase">Protocol: VIP</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard 
                onClick={() => navigate('/transactions')}
                className="flex-1 border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col h-full justify-between">
                  <Shield className="w-8 h-8 text-secondary mb-4 transition-transform group-hover:scale-110" />
                  <div>
                    <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">Security Status</p>
                    <h3 className="text-xl font-display font-bold text-white">IRONCLAD</h3>
                    <p className="text-xs text-secondary mt-1 tracking-widest">ENCRYPTED ACTIVE</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-display font-bold uppercase tracking-widest">Recent Activity</h3>
                <button 
                  onClick={() => navigate('/transactions')}
                  className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
                >
                  View Archive
                </button>
             </div>
            <TransactionHistory transactions={transactions?.slice(0, 5)} />
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
              onTransfer={() => navigate('/transfer')} 
              onReverse={handleReverse}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />

            <div className="mt-12 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-bold tracking-widest opacity-60 uppercase">System Insights</span>
              </div>
              <p className="text-xs leading-relaxed text-white/40 font-medium italic">
                "The highest form of efficiency is not the speed of the transaction, but the confidence of the execution."
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
