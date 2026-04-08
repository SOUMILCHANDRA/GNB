import { useState, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import SuitUpAnimation from "./components/SuitUpAnimation";
import Dashboard from "./components/Dashboard";
import CursorGlow from "./components/CursorGlow";
import Register from "./components/Register";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [stage, setStage] = useState("intro"); // "intro", "anim", "dashboard"
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("gnb_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <div className="bg-black min-h-screen text-white">
        <CursorGlow />
        <Register onRegister={(userData) => setUser(userData)} />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
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
  );
}
