import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBg({ balance = 0, interactive = false }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const balanceFactor = Math.min(Math.max(balance / 1000000, 0), 1);
  const isLowBalance = balance < 1000;

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: (isLowBalance ? "#ff007a" : "#00ffff") },
        links: {
          color: isLowBalance ? "#ff007a" : "#00ffff",
          distance: 150,
          enable: true,
          opacity: 0.2 + (balanceFactor * 0.3),
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 1 + (balanceFactor * 4),
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 40 + (balanceFactor * 80),
        },
        opacity: { value: 0.3 + (balanceFactor * 0.2) },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 + (balanceFactor * 2) } },
      },
      detectRetina: true,
    }),
    [balanceFactor, isLowBalance]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className={`absolute inset-0 z-0 transition-all duration-1000 ${interactive ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'}`}
      />
    );
  }

  return null;
}

