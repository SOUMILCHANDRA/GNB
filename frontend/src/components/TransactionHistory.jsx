import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import { formatCurrency, cn } from "../lib/utils";
import { ArrowUpRight, ArrowDownLeft, Wallet, ShieldCheck } from "lucide-react";

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-bold">Transaction Feed</h3>
        <button className="text-xs text-primary hover:underline font-medium tracking-widest uppercase">View All Ledger</button>
      </div>
      
      <div 
        data-lenis-prevent
        className="space-y-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar"
      >
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                  tx.amount > 0 ? "bg-primary/10 text-primary border border-primary/20" : "bg-white/5 text-white/40 border border-white/10"
                )}>
                  {tx.type === "Deposit" && <ArrowDownLeft className="w-6 h-6" />}
                  {tx.type === "Withdraw" && <ArrowUpRight className="w-6 h-6" />}
                  {tx.type === "Transfer" && <Wallet className="w-6 h-6" />}
                  {tx.type === "Purchase" && <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-bold text-white/90">{tx.note}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{tx.type}</span>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{tx.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "text-lg font-display font-bold",
                  tx.amount > 0 ? "text-primary" : "text-white"
                )}>
                  {tx.amount > 0 ? "+" : ""}{formatCurrency(tx.amount)}
                </div>
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Confirmed</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
