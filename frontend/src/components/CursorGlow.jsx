import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    // Check if glow already exists to avoid duplicates
    let glow = document.querySelector(".cursor-glow");
    if (!glow) {
      glow = document.createElement("div");
      glow.className = "cursor-glow";
      document.body.appendChild(glow);
    }

    const moveGlow = (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
      if (glow && glow.parentNode) {
        glow.parentNode.removeChild(glow);
      }
    };
  }, []);

  return null;
}
