import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./data.css";

export default function Data({ name, code, hex, description, galeria }) {
  if (!name && !code) return null;

  const color =
    hex ?? (code ? (code.startsWith("#") ? code : `#${code}`) : "#000");

  return (
    <div className="cw-legend">
      <div className="cw-legend-color-bar" style={{ backgroundColor: color }} />

      {name && code && <div className="cw-legend-name">{name}</div>}

      {code && <div className="cw-legend-code">{code}</div>}

      {description && (
        <div className="cw-legend-description">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}
      <div className="data-atributos">
        <span className="data-atributo">Lavable</span>
        <span className="data-atributo">Alta adherencia</span>
        <span className="data-atributo">Impermeable</span>
      </div>
      {/*  <div className="data-buttons">
        <select className="data-atributo">
          <option value="1lt">1 lt</option>
          <option value="5lt">5 lt</option>
          <option value="20lt">20 lt</option>
        </select>
        <div className="agregarAlCarrito">
          <button
            className="data-atributo"
            style={{ backgroundColor: color }}
            onClick={() => alert("agregado ")} 
          >
            Agregar al carrito 
          </button>
        </div>
      </div> */}
    </div>
  );
}
