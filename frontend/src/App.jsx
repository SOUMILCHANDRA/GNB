import { useState } from "react";
import IntroScreen from "./components/IntroScreen";
import SuitUpAnimation from "./components/SuitUpAnimation";
import Dashboard from "./components/Dashboard";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [stage, setStage] = useState("intro"); // "intro", "anim", "dashboard"

  return (
    <div className="bg-black min-h-screen text-white">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <IntroScreen key="intro" onStart={() => setStage("anim")} />
        )}
        
        {stage === "anim" && (
          <SuitUpAnimation key="anim" onComplete={() => setStage("dashboard")} />
        )}
        
        {stage === "dashboard" && (
          <Dashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}
