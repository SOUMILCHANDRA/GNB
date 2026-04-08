import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import BalanceCard from "./components/BalanceCard";
import TransactionHistory from "./components/TransactionHistory";
import ActionPanel from "./components/ActionPanel";
import TransferModal from "./components/TransferModal";
import { MOCK_USER, MOCK_TRANSACTIONS } from "./data/mock";
import GlassCard from "./components/ui/GlassCard";
import { TrendingUp, UserCheck, Shield } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [balance, setBalance] = useState(MOCK_USER.balance);

  const handleTransferComplete = ({ id, amount }) => {
    const numAmount = parseFloat(amount);
    const newTx = {
      id: Date.now(),
      type: "Transfer",
      amount: -numAmount,
      timestamp: new Date().toLocaleString(),
      note: `Sent to Account ${id}`
    };
    setTransactions([newTx, ...transactions]);
    setBalance(prev => prev - numAmount);
  };

  const handleReverse = () => {
    // Logic for reversing last transaction if needed
    console.log("Transaction Reversed!");
  };

  return (
    <div className="min-h-screen bg-background bg-mesh font-sans selection:bg-primary/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-6 pb-20 pt-10">
        <AnimatePresence mode="wait">
          {activeTab === "landing" ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Landing onGetStarted={() => setActiveTab("dashboard")} />
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="pt-24 space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Dashboard Left: Balance & Stats */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 h-full min-h-[400px]">
                    <BalanceCard balance={balance} />
                    
                    <div className="flex-1 flex flex-col gap-6">
                      <GlassCard className="flex-1 border-primary/20 bg-primary/5">
                        <div className="flex flex-col h-full justify-between">
                          <UserCheck className="w-8 h-8 text-primary mb-4" />
                          <div>
                            <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">Authenticated As</p>
                            <h3 className="text-xl font-display font-bold text-white">{MOCK_USER.name}</h3>
                            <p className="text-sm text-primary font-medium mt-1">ID: #{MOCK_USER.id}</p>
                          </div>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="flex-1 border-secondary/20 bg-secondary/5">
                        <div className="flex flex-col h-full justify-between">
                          <Shield className="w-8 h-8 text-secondary mb-4" />
                          <div>
                            <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">Security Status</p>
                            <h3 className="text-xl font-display font-bold text-white">IRONCLAD</h3>
                            <div className="flex items-center gap-2 mt-2">
                              {/* Pulse indicators */}
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

                  <TransactionHistory transactions={transactions} />
                </div>

                {/* Dashboard Right: Quick Actions */}
                <div className="space-y-8">
                  <GlassCard className="h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <h3 className="text-lg font-display font-bold uppercase tracking-widest">Command Center</h3>
                    </div>
                    
                    <ActionPanel 
                      onTransfer={() => setIsTransferModalOpen(true)} 
                      onReverse={handleReverse}
                    />

                    <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold tracking-wider opacity-60 uppercase">Market Insights</span>
                      </div>
                      <p className="text-xs leading-relaxed text-white/40">
                        "The best investment you can make is in a high-quality suit and a legendary wingman."
                      </p>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TransferModal 
        isOpen={isTransferModalOpen} 
        onClose={() => setIsTransferModalOpen(false)} 
        onComplete={handleTransferComplete}
      />

      {/* Custom Cursor Overlay (Purely visual fallback if no real custom cursor) */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-20">
         <div className="absolute w-full h-full bg-radial-gradient from-primary/5 to-transparent blend-soft-light" />
      </div>
    </div>
  );
}
