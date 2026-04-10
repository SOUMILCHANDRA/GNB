import { useState, useEffect, useMemo } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ParticleBg from "../components/ParticleBg";
import SystemCore from "../components/SystemCore";
import CursorGlow from "../components/CursorGlow";
import SystemLoader from "../components/ui/SystemLoader";
import { useBankingStore } from "../store/useBankingStore";
import { cn } from "../lib/utils";


export default function MainLayout() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const { balance, systemStatus, isReversing } = useBankingStore();
  
  const isVoidMode = location.pathname === '/void';

  // Show loader on route change
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Dynamic animations based on route
  const pageTransition = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    };
    if (path === '/transfer') return {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
      transition: { duration: 0.5, ease: "anticipate" }
    };
    if (path === '/profile') return {
      initial: { opacity: 0, filter: "blur(20px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(20px)" },
      transition: { duration: 0.6 }
    };
    if (path === '/void') return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 1 }
    };
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4 }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* Background Layer 1: 3D System Core */}
      <SystemCore 
        isReversing={isReversing} 
        balance={balance} 
        systemStatus={systemStatus} 
        interactive={isVoidMode} 
      />
      
      {/* Background Layer 2: Connecting Particles */}
      <ParticleBg 
        balance={balance} 
        systemStatus={systemStatus} 
        interactive={isVoidMode} 
      />
      
      {/* Mid Layer: Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-5] opacity-20 bg-mesh" />

      {/* Persistent Global Interface Elements */}
      <CursorGlow />
      <Navbar />

      {/* Main Content Area */}
      <main className={cn(
        "container mx-auto px-6 pb-20 pt-28 relative z-10",
        isVoidMode && "pointer-events-none"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            {...pageTransition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Loading Transition Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <SystemLoader message={`ACCESSING ${location.pathname.substring(1).toUpperCase() || "DASHBOARD"}...`} />
        )}
      </AnimatePresence>

      {/* Decorative text at bottom */}
      <div className="fixed bottom-6 w-full text-center pointer-events-none opacity-10">
        <p className="text-[10px] tracking-[1em] uppercase font-bold text-white">
          GNB LEGENDARY INTERFACE v2.0 // SYSTEM STATUS: {systemStatus}
        </p>
      </div>
    </div>
  );
}


