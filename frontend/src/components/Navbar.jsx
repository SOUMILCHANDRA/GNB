import { motion } from "framer-motion";
import { Shield, LayoutDashboard, Send, History, CircleUser, Terminal } from "lucide-react";
import { cn } from "../lib/utils";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navItems = [
    { path: "/", label: "SYSTEM", icon: LayoutDashboard },
    { path: "/transfer", label: "TRANSFER_PROTOCOL", icon: Send },
    { path: "/transactions", label: "LEDGER_ARCHIVE", icon: History },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card px-4 py-2 rounded-full flex items-center gap-1 md:gap-2 border-white/20 backdrop-blur-3xl bg-black/60 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-4 px-4 border-r border-white/10 mr-2 cursor-pointer group"
        >
          <div className="relative">
             <Shield className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
             <div className="absolute inset-0 bg-primary/20 blur-lg animate-pulse rounded-full" />
          </div>
          <div className="hidden lg:block">
            <span className="font-display font-black tracking-tighter text-sm block">GNB_CORE</span>
            <span className="text-[8px] font-mono text-white/20 block tracking-widest leading-none">V2.4.0</span>
          </div>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-500 relative group overflow-hidden",
              isActive ? "text-primary" : "text-white/40 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("w-4 h-4 z-10", isActive && "animate-pulse")} />
                <span className="text-[10px] font-black tracking-[0.2em] z-10 hidden md:block">{item.label}</span>
                
                {/* Micro glow effect */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-primary shadow-[0_0_10px_#00ffff]" />
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="ml-2 pl-4 border-l border-white/10 flex items-center gap-3">
          <div className="hidden xl:flex flex-col items-end mr-2">
             <span className="text-[8px] font-black text-white/20 tracking-tighter uppercase">Net_Status</span>
             <span className="text-[8px] font-mono text-green-500 uppercase tracking-widest animate-pulse">Encrypted</span>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 border border-white/10 hover:border-secondary/50 hover:text-secondary transition-all hover:scale-110 group"
          >
            <CircleUser className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(112,0,255,0.8)]" />
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;


