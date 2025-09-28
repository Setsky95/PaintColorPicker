import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'import "./data.css";

export default function Data({ name, code, hex, description }) {
  if (!name && !code) return null;

  const color = hex ?? (code ? (code.startsWith("#") ? code : `#${code}`) : "#000");

  return (
    <div className="cw-legend">
      <div className="cw-legend-color-bar" style={{ backgroundColor: color }} />

      {name && <div className="cw-legend-name">{name}</div>}

      {code && <div className="cw-legend-code">{code}</div>}


      {description && (
        <div className="cw-legend-description">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
