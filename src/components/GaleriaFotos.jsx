import React, { useMemo, useState } from "react";
import "./galeriafotos.css";

/* ...tu código previo sin cambios... */

export default function GaleriaFotos({
  galeria,
  mapping = { tl: 1, bl: 2, center: 3, rt: 4, rm: 5, rb: 6 },
  baseFolderName = "Fotos-galeria",
  extension = "webp",
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
    const n = candidates[0];
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

  // Tile con animación on-load + skeleton mientras carga
  const Tile = ({ src, altText, extraClass = "", delayMs = 0 }) => {
    const [broken, setBroken] = useState(false);
    const [loaded, setLoaded] = useState(false);
    if (!src || broken) return null;

    return (
      <div
        className={`gf-tile ${extraClass} ${loaded ? "is-loaded" : ""}`}
        style={{ "--gf-delay": `${delayMs}ms` }}
        aria-busy={!loaded}
      >
        <img
          src={src}
          alt={altText || "Imagen de galería"}
          loading="lazy"
          onLoad={() => setLoaded(true)}
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
        <Tile src={urls.tl} altText={`${slug} top-left`}   extraClass="gf-tl" delayMs={120} />
        <Tile src={urls.bl} altText={`${slug} bottom-left`} extraClass="gf-bl" delayMs={190} />
      </div>

      <div className="gf-col gf-center">
        <Tile src={urls.center} altText={`${slug} center`} extraClass="gf-center-tile" delayMs={150} />
      </div>

      <div className="gf-col gf-right">
        <Tile src={urls.rt} altText={`${slug} right-top`}    extraClass="gf-rt" delayMs={120} />
        <Tile src={urls.rm} altText={`${slug} right-mid`}    extraClass="gf-rm" delayMs={160} />
        <Tile src={urls.rb} altText={`${slug} right-bottom`} extraClass="gf-rb" delayMs={190} />
      </div>
    </section>
  );
}
