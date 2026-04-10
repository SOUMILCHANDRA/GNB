import { motion } from "framer-motion";
import { History, Download, Filter, Search } from "lucide-react";
import TransactionHistory from "../components/TransactionHistory";
import GlassCard from "../components/ui/GlassCard";
import { useBankingStore } from "../store/useBankingStore";

export default function TransactionsPage() {
  const { transactions } = useBankingStore();

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-black tracking-tighter uppercase">Transaction Archive</h1>
            <p className="text-sm text-white/40 font-bold tracking-widest uppercase">Full immutable ledger records</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                 placeholder="SEARCH LEDGER..."
                 className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs font-mono focus:outline-none focus:border-primary/50 transition-all w-48 md:w-64"
              />
           </div>
           <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4 text-white/60" />
           </button>
           <button className="p-2.5 rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-colors text-primary">
              <Download className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
               <p className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase mb-1">Total Volume (30D)</p>
               <h3 className="text-2xl font-display font-black tracking-tight text-primary">$452,102.50</h3>
            </GlassCard>
            <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
               <p className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase mb-1">Outbound Flow</p>
               <h3 className="text-2xl font-display font-black tracking-tight text-secondary">$125,000.00</h3>
            </GlassCard>
            <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
               <p className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase mb-1">Success Rate</p>
               <h3 className="text-2xl font-display font-black tracking-tight text-green-500">100.0%</h3>
            </GlassCard>
         </div>

         <div className="rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
               <h3 className="text-sm font-bold tracking-widest uppercase">Ledger Stream</h3>
               <span className="text-[10px] font-mono text-white/20 uppercase">Showing {transactions.length} Records</span>
            </div>
            <div className="p-6">
               <TransactionHistory transactions={transactions} />
            </div>
         </div>
      </div>

      <div className="mt-12 text-center">
         <p className="text-[10px] font-mono text-white/10 tracking-[1em] uppercase">SYSTEM END OF CHAIN REACHED</p>
      </div>
    </div>
  );
}
