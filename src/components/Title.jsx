// src/components/Title.jsx
import "./title.css";

export default function Title({
  text = "Renová, Decorá, Disfrutá.",
  underlineColor = "#1f2937",
}) {
  return (
    <div className="cw-title-wrap" style={{ "--underline-color": underlineColor }}>
      <h1 className="cw-title">{text}</h1>
    </div>
  );
}
