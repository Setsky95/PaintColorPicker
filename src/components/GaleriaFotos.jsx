import React, { useMemo, useState } from "react";
import "./galeriafotos.css";

/**
 * Construye rutas: /img/Fotos-galeria/<galeria>/<n>.png
 * mapping define qué nro de archivo va en cada tile.
 */
export default function GaleriaFotos({
  galeria,                           // ej: "yellow-chalk"
  mapping = { tl: 1, bl: 2, center: 3, rt: 4, rm: 5, rb: 6 },
  baseFolderName = "Fotos-galeria",  // <-- carpeta renombrada
  extension = "png",
  className = "",
}) {
  const slug = (galeria || "").toString().trim().toLowerCase();

  const toList = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "number") return [val];
    if (typeof val === "string") return val.split(",").map(s => s.trim()).filter(Boolean);
    return [];
  };

  const buildSrc = (slot) => {
    const candidates = toList(mapping?.[slot]);
    if (!candidates.length) return null;
    const n = candidates[0]; // podrías intentar varios si querés
    return `/img/${baseFolderName}/${slug}/${n}.${extension}`;
  };

  const urls = useMemo(() => ({
    tl: buildSrc("tl"),
    bl: buildSrc("bl"),
    center: buildSrc("center"),
    rt: buildSrc("rt"),
    rm: buildSrc("rm"),
    rb: buildSrc("rb"),
  }), [slug, baseFolderName, extension, mapping]);

  // Tile que se oculta con estado si la imagen falla (sin tocar el DOM manualmente)
  const Tile = ({ src, altText, extraClass = "" }) => {
    const [broken, setBroken] = useState(false);
    if (!src || broken) return null;
    return (
      <div className={`gf-tile ${extraClass}`}>
        <img
          src={src}
          alt={altText || "Imagen de galería"}
          loading="lazy"
          onError={() => setBroken(true)}
        />
      </div>
    );
  };

  if (!slug) {
    return <section className={`gf-wrapper ${className}`}>Sin galería definida</section>;
  }

  return (
    <section className={`gf-wrapper ${className}`}>
      <div className="gf-col gf-left">
        <Tile src={urls.tl} altText={`${slug} top-left`} extraClass="gf-tl" />
        <Tile src={urls.bl} altText={`${slug} bottom-left`} extraClass="gf-bl" />
      </div>

      <div className="gf-col gf-center">
        <Tile src={urls.center} altText={`${slug} center`} extraClass="gf-center-tile" />
      </div>

      <div className="gf-col gf-right">
        <Tile src={urls.rt} altText={`${slug} right-top`} extraClass="gf-rt" />
        <Tile src={urls.rm} altText={`${slug} right-mid`} extraClass="gf-rm" />
        <Tile src={urls.rb} altText={`${slug} right-bottom`} extraClass="gf-rb" />
      </div>
    </section>
  );
}
