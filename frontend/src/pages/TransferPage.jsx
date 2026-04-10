import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ShieldCheck, User, DollarSign, ArrowRight, CheckCircle2 } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import { useBankingStore } from "../store/useBankingStore";
import { bankingService } from "../services/bankingService";
import { useNavigate } from "react-router-dom";

export default function TransferPage() {
  const navigate = useNavigate();
  const { user, balance } = useBankingStore();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("idle"); // idle, processing, success, error

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    
    setStatus("processing");
    try {
      await bankingService.transfer(user.id, recipient, parseFloat(amount));
      setStatus("success");
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      alert(err.message);
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
          <Send className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-black tracking-tighter uppercase">Transfer Protocol</h1>
          <p className="text-sm text-white/40 font-bold tracking-widest uppercase">Encryption Layer: ACTIVE</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="md:col-span-2">
          <GlassCard className="p-8 border-white/10 bg-white/[0.02]">
            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-20 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">TRANSACTION SECURED</h2>
                <p className="text-white/40 font-medium">Funds successfully moved into the encrypted stream.</p>
                <motion.div 
                   animate={{ x: [0, 5, 0] }}
                   transition={{ duration: 1, repeat: Infinity }}
                   className="text-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2"
                >
                  Redirecting to Core <ArrowRight className="w-3 h-3" />
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleTransfer} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase ml-1">Recipient ID</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        required
                        placeholder="TARGET_SYSTEM_ID"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase ml-1">Volume (USD)</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <input 
                        required
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Network Fee</p>
                      <p className="text-sm font-mono text-secondary">0.00 GNB</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Available Balance</p>
                    <p className="text-sm font-mono text-white">${balance?.toLocaleString()}</p>
                  </div>
                </div>

                <motion.button
                  disabled={status === "processing"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 rounded-2xl bg-primary text-black font-black tracking-[0.3em] uppercase flex items-center justify-center gap-3 disabled:opacity-50 relative overflow-hidden group"
                >
                  {status === "processing" ? (
                    <span className="animate-pulse">ENCRYPTING...</span>
                  ) : (
                    <>
                      EXECUTE TRANSFER
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-secondary/20 bg-secondary/5">
            <h4 className="text-[10px] font-black text-secondary tracking-widest uppercase mb-4">Security Warning</h4>
            <p className="text-xs text-secondary/80 leading-relaxed font-bold">
              Initiating a transfer outside the internal firewall may result in temporary system exposure. Ensure recipient ID is verified.
            </p>
          </GlassCard>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-[10px] font-black text-white/40 tracking-widest uppercase mb-4">Recent Targets</h4>
            <div className="space-y-3">
              {[
                { name: "BARNEY STINSON", id: "555-SUIT-UP", date: "2m ago" },
                { name: "ROBIN SCHERBATSKY", id: "CAN-001", date: "1h ago" },
                { name: "MARSHALL ERIKSEN", id: "BIG-FOOT", date: "Yesterday" },
              ].map((target, i) => (
                <button 
                  key={i}
                  onClick={() => setRecipient(target.id)}
                  className="w-full p-3 rounded-xl hover:bg-white/5 transition-colors text-left group border border-transparent hover:border-white/10"
                >
                  <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">{target.name}</p>
                  <p className="text-[10px] font-mono text-white/20 uppercase mt-1">{target.id} • {target.date}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
