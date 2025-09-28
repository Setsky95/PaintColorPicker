// App.jsx
import { useState, useEffect } from "react";
import Title from "./components/Title";
import ColorWheel from "./components/ColorWheel";
import "./App.css";
import RainbowBG from "./components/RainbowBG";

function hexToRgba(hex, alpha = 0.15) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function App() {
  const [active, setActive] = useState(null); // 

  useEffect(() => {
    if (!active?.hex) return;
    const root = document.documentElement;
    root.style.setProperty("--active-color", active.hex);
    root.style.setProperty("--active-color-15a", hexToRgba(active.hex, 0.15));
  }, [active]);

  return (
    <>
      <RainbowBG /> 
      <Title
        text={
          <>
            Decorá. Renová. <b>Disfrutá.</b>
          </>
        }
        underlineColor={active?.hex || "#474c52ff"}
      />

      <ColorWheel
        wheelRadius={220}
        centerSize={320}
        wheelScale={0.6}
        onActiveChange={setActive}
      />
    </>
  );
}