
import './galeriatitle.css';

export default function GaleriaTitle
({ name, code, hex }) {
    if (!name && !code  ) return null;

  const color = hex ?? (code ? (code.startsWith("#") ? code : `#${code}`) : "#000");

    
    return (
          <div className="cw-legend-galeria">
            <div className="cw-legend-color-bar-galeria" style={{ backgroundColor: color }} />
      
            {name && <div className="cw-legend-name-galeria">{name}</div>}
            {code && <div className="cw-legend-code-galeria">{code}</div>}
      
      
           
          </div>
    );
};

