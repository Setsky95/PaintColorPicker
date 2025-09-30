import { useEffect, useState } from "react";
import Card from "./Card";
import Data from "./Data";            
import "./colorwheel.css";
import GaleriaFotos from "./GaleriaFotos";
import GaleriaTitle from "./GaleriaTitle";
export default function ColorWheel({
  jsonUrl = "/colors.json",
  wheelRadius = 220,
  centerSize = 320,
  wheelScale = 0.6,                   
  onActiveChange = () => {},          
}) {
  const [items, setItems] = useState([]);
  const [activeIdx, setActiveIdx] = useState();
  const activeItem = items[activeIdx];

  useEffect(() => {
    let alive = true;
    fetch(jsonUrl)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        const normalized = data.map((d) => ({
          name: d.name ?? d.nombre ?? "Unnamed",
          hex: (d.hex ?? d.color ?? "#999999").toString().startsWith("#")
            ? (d.hex ?? d.color)
            : `#${d.hex ?? d.color}`,
          code: d.code ?? d.codigo ?? (d.hex ?? d.color)?.replace("#", ""),
          image: d.image ?? d.imagen ?? "",
          galeria: d.galeria ?? d.galeria ?? "",
          description: d.description ?? "",
        }));
        setItems(normalized);
      setActiveIdx(2);
if (normalized[2]) onActiveChange(normalized[2]);

      })
      .catch((e) => console.error("Error cargando colors.json", e));
    return () => { alive = false; };
  }, [jsonUrl, onActiveChange]);

  useEffect(() => {
    if (activeItem) onActiveChange(activeItem);
  }, [activeIdx, items, activeItem, onActiveChange]);

  const step = items.length ? 360 / items.length : 0;

  const CARD_H = 88;
  const GAP = -170;
  const innerRadius = wheelRadius - CARD_H / 2 - GAP;

  const wrapW = centerSize + wheelRadius * 2;
  const wrapH = centerSize + wheelRadius * 2;
  const circleSize = wheelRadius * 2 + 100;

  return (
    <div className="wrapper">
    <div className="cw-root">
      <div
        className="wheel-wrap"
        style={{
          "--wrap-w": `${wrapW}px`,
          "--wrap-h": `${wrapH}px`,
          "--circle-size": `${circleSize}px`,
          "--center-size": `${centerSize}px`,
          "--inner-radius": `${innerRadius}px`,
          "--wheel-scale": wheelScale,   
        }}
      >
        <div className="wheel-bg" />

        <div className="wheel-ring">
          {items.map((item, i) => {
            const angle = -90 + i * step;
            return (
              <div
                key={`${item.code}-${i}`}
                className="wheel-card-pos"
                style={{ "--angle": `${angle}deg` }}
              >
                <Card
                  item={item}
                  style={{}}                 
                  onClick={() => setActiveIdx(i)}
                  isActive={i === activeIdx}
                />
              </div>
            );
          })}
        </div>

        <div className="wheel-center">
          <div className="wheel-center-inner">
            {activeItem?.image ? <img alt={activeItem.name} src={activeItem.image} /> : null}
          </div>
        </div>
      </div>

      {activeItem && (
        <Data
          name={activeItem.name}
          code={activeItem.code}
          hex={activeItem.hex}
          description={activeItem.description}
          galeria={activeItem.galeria}
        />
      )}



    </div>      <div className="galeria">
  {activeItem ? (
    <>
      <GaleriaTitle
        name={activeItem.name ?? ""}
        code={activeItem.code ?? ""}
        hex={activeItem.hex ?? "#000"}
        description={activeItem.description ?? ""}
        galeria={(activeItem.galeriaSlug ?? activeItem.galeria ?? "")}
      />

      {(activeItem.galeriaSlug || activeItem.galeria) ? (
        <GaleriaFotos
          galeria={(activeItem.galeriaSlug || activeItem.galeria).toLowerCase()}
          mapping={{ tl: 1, bl: 2, center: 3, rt: 4, rm: 6, rb: 5 }}
          baseFolderName="Fotos-galeria"
          extension="png"
        />
      ) : (
        <div style={{ opacity: 0.7 }}>Sin galería para este color.</div>
      )}
    </>
  ) : (
    <div style={{ opacity: 0.7 }}>Cargando color…</div>
  )}
</div>

      </div>
  );
}
