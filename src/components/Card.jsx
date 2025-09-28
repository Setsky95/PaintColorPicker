import { useState } from "react";


export default function Card({ item, style, onClick, isActive }) {
  const W = 360; 
  const H = 88; 
  const R = H / 2;
  const CAP = 76; 

  const [hovered, setHovered] = useState(false);

  const scale = isActive ? 1.3 : 1;
  const hoverShift = hovered && !isActive ? "calc(-0.20 * var(--inner-radius))" : "0px";

  const dotColor =
    item.hex || (item.code ? (item.code.startsWith("#") ? item.code : `#${item.code}`) : "#000");

  const dotScale = isActive ? 1.3 : 1;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Elegir ${item.name}`}
      style={{ ...style, width: W, height: H, userSelect: "none", background: "none" }}
      className="focus:outline-none"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `translateX(${hoverShift}) scale(${scale})`,
          transformOrigin: "center",
          transition: "transform 1000ms ease",
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: R,
            border: "1.5px solid rgba(0,0,0,0.1)",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -2,
              top: 2,
              width: CAP - 12,
              height: CAP - 12,
              borderRadius: (CAP - 12) / 2,
              display: "grid",
              placeItems: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 21,
                height: 21,
                borderRadius: "9999px",
                backgroundColor: dotColor,
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
                transform: `scale(${dotScale})`,           
                transformOrigin: "center",
                transition: "transform 300ms ease",       
              }}
            />
          </div>

          
          <div
            style={{
              position: "absolute",
              left: CAP - 18,
              right: 0,
              top: 0,
              bottom: 0,
              background: item.hex,
              borderRadius: R - 10,
              display: "flex",
              alignItems: "center",
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: 32,
              }}
            >
              {item.name}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
