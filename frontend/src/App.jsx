import { useState, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import SuitUpAnimation from "./components/SuitUpAnimation";
import Dashboard from "./components/Dashboard";
import CursorGlow from "./components/CursorGlow";
import Register from "./components/Register";
import SmoothScroll from "./components/SmoothScroll";
import { AnimatePresence } from "framer-motion";

import { authService } from "./services/authService";
import { bankingService } from "./services/bankingService";
import { useBankingStore } from "./store/useBankingStore";

export default function App() {
  const [stage, setStage] = useState("intro"); // "intro", "anim", "dashboard"
  const { user, setUser, clearStore } = useBankingStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          // Fetch full profile when logged in
          const profile = await bankingService.getUserProfile(session.user.id);
          setUser({ ...session.user, ...profile });
        } catch (err) {
          console.error("Failed to fetch profile:", err);
        }
      } else {
        clearStore();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser, clearStore]);

  if (loading) return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    return (
      <div className="bg-black min-h-screen text-white">
        <CursorGlow />
        <Register onRegister={(userData) => setUser(userData)} />
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen text-white relative">
        <div className="fixed inset-0 bg-black z-[-20]" />
        <CursorGlow />
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <IntroScreen 
              key="intro" 
              user={user} 
              onStart={() => setStage("anim")} 
            />
          )}
          
          {stage === "anim" && (
            <SuitUpAnimation 
              key="anim" 
              user={user} 
              onComplete={() => setStage("dashboard")} 
            />
          )}
          
          {stage === "dashboard" && (
            <Dashboard key="dashboard" user={user} />
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
