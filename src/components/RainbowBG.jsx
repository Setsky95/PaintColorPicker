// RainbowBG.jsx
import "./rainbow.css";

export default function RainbowBG({ stripes = 48, duration = 270, className = "" }) {
  return (
    <div className={`rainbow-layer ${className}`} aria-hidden="true">
      {Array.from({ length: stripes }).map((_, i) => {
        const seq = (i % 6) + 1;
        return (
          <div
            key={i}
            className={`rainbow seq${seq}`}
            style={{ "--i": i + 1, "--len": stripes, "--dur": `${duration}s` }}
          />
        );
      })}
      <div className="h" />
      <div className="v" />
    </div>
  );
}
