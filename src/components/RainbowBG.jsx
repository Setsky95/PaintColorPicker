// RainbowBG.jsx
import "./rainbow.css";

export default function RainbowBG({ className = "" }) {
  return (
    <div className={`rainbow-layer ${className}`} aria-hidden="true" />
  );
}
