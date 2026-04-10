import { motion } from "framer-motion";
import { Eye, Terminal, ArrowLeft, MousePointer2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VoidPage() {
  const navigate = useNavigate();

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center relative">

       {/* Floating System Fragments */}
       <div className="absolute inset-0 pointer-events-none">
          {[1,2,3,4].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.2, 0],
                x: [Math.random() * 100, Math.random() * -100],
                y: [Math.random() * 100, Math.random() * -100]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity,
                delay: i * 2
              }}
              className="absolute text-[8px] font-mono text-cyan-500/30 whitespace-nowrap"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%` 
              }}
            >
              DETECTING_INTERFERENCE_0x0{i}f...
            </motion.div>
          ))}
       </div>

       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="text-center space-y-4 z-20"
       >
         <div className="flex justify-center mb-8">
            <div className="relative group">
               <Eye className="w-16 h-16 text-white/5 group-hover:text-primary/20 transition-colors duration-1000" />
               <motion.div 
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                  <Eye className="w-16 h-16 text-primary/40 blur-sm" />
               </motion.div>
            </div>
         </div>
         
         <h2 className="text-4xl font-display font-black tracking-[1em] text-white/10 uppercase">VOID_MODE</h2>
         <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-black">Reactive immersion active. Use cursor to influence core.</p>
         
         <div className="pt-12">
            <button 
              onClick={() => navigate('/')}
              className="group pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-primary/10 hover:border-primary/20 transition-all duration-500"
            >
               <ArrowLeft className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
               <span className="text-[10px] font-black tracking-widest text-white/40 group-hover:text-white uppercase transition-colors">Return to System</span>
            </button>
         </div>
       </motion.div>

       {/* Interactive Hints */}
       <div className="fixed bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-20 pointer-events-none">
          <div className="flex items-center gap-2">
             <MousePointer2 className="w-3 h-3" />
             <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Drag to rotate</span>
          </div>
          <div className="flex items-center gap-2">
             <Terminal className="w-3 h-3" />
             <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Click to pulse</span>
          </div>
       </div>
    </div>
  );
}
