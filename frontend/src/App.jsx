import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import IntroScreen from "./components/IntroScreen";
import SuitUpAnimation from "./components/SuitUpAnimation";
import CursorGlow from "./components/CursorGlow";
import Register from "./components/Register";
import SmoothScroll from "./components/SmoothScroll";
import { AnimatePresence } from "framer-motion";

import MainLayout from "./layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import TransferPage from "./pages/TransferPage";
import TransactionsPage from "./pages/TransactionsPage";
import ProfilePage from "./pages/ProfilePage";

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
            <Routes key="dashboard">
              <Route element={<MainLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transfer" element={<TransferPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}

