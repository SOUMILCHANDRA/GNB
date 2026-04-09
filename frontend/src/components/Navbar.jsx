import { motion } from "framer-motion";
import { Shield, LayoutDashboard, Send, History, User, Eye } from "lucide-react";
import { cn } from "../lib/utils";

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "landing", label: "Home", icon: Shield },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transfer", label: "Transfer", icon: Send },
    { id: "history", label: "History", icon: History },
    { id: "void", label: "VOID", icon: Eye },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card px-4 py-2 rounded-full flex items-center gap-1 md:gap-2 border-white/20"
      >
        <div className="flex items-center gap-4 px-4 border-r border-white/10 mr-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-display font-bold tracking-tighter hidden md:block">GNB</span>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 relative",
              activeTab === item.id ? "text-primary" : "text-white/60 hover:text-white"
            )}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-medium hidden md:block">{item.label}</span>
          </button>
        ))}

        <div className="ml-2 pl-4 border-l border-white/10">
          <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20 hover:bg-primary/30 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
