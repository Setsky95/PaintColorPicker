// UpButton.jsx
import React from "react";
import "./upbutton.css";

export default function UpButton({
  hex,                  // único estilo que viaja desde el componente
  className = "",
  title = "Subir arriba" // accesibilidad / tooltip (no es estilo)
}) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`upbutton ${className}`}
      style={{ "--upbutton-bg": hex }}     // solo el fondo desde JSX
      aria-label={title}
      title={title}
      onClick={handleClick}
    >
      <svg className="upbutton__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
