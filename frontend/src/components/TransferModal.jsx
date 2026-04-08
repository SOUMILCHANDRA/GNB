import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "./ui/Button";
import { X, User, DollarSign, Send, CheckCircle2 } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const TransferModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ id: "", amount: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate processing
    await new Promise(r => setTimeout(r, 2000));
    setIsLoading(false);
    setStep(2);
  };

  const handleFinish = () => {
    onComplete(formData);
    onClose();
    setTimeout(() => setStep(1), 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg"
          >
            <GlassCard className="p-8 border-white/20">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {step === 1 ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-display font-extrabold tracking-tight mb-2">INITIATE FLOW</h2>
                    <p className="text-white/40 text-sm font-medium">Make a bro’s life awesome. Send some capital.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-4">RELIABLE RECIPIENT ID</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <input 
                          required
                          type="text" 
                          placeholder="8008"
                          value={formData.id}
                          onChange={e => setFormData({...formData, id: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-4">CAPITAL AMOUNT ($)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <input 
                          required
                          type="number" 
                          placeholder="0.00"
                          value={formData.amount}
                          onChange={e => setFormData({...formData, amount: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full h-16" isLoading={isLoading}>
                      EXECUTE TRANSFER
                    </Button>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 neon-border-primary border-4">
                    <CheckCircle2 className="w-12 h-12 text-primary drop-shadow-[0_0_10px_#00E5FF]" />
                  </div>
                  <h2 className="text-4xl font-display font-bold mb-4">TRANSFER COMPLETE</h2>
                  <p className="text-xl text-white/60 mb-12">You're a legend, bro.</p>
                  <Button variant="secondary" size="lg" onClick={handleFinish} className="w-full">
                    BACK TO DASHBOARD
                  </Button>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransferModal;
