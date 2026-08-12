"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import type { CoverageLocation } from "@/lib/api";
import statesGeo from "@/data/nl-coahuila.geo.json";

/**
 * Mapa de cobertura: siluetas geográficas reales de Nuevo León y Coahuila
 * (GeoJSON simplificado, ~13 KB) con las localidades del CMS remarcadas.
 * Visor a ancho completo con zoom (botones, Ctrl+rueda, doble clic, pellizco)
 * y arrastre. Marcadores, etiquetas y tooltip mantienen tamaño constante al
 * acercar (contra-escala 1/k); las siluetas sí se amplían.
 */

interface StateShape {
  name: string;
  rings: [number, number][][];
}

const WIDTH = 900;
const PADDING = 40;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

// Ajuste fino de la etiqueta de cada estado (px del viewBox)
const LABEL_OFFSET: Record<string, { dx: number; dy: number }> = {
  "Nuevo León": { dx: 45, dy: 175 },
  "Coahuila": { dx: -20, dy: 0 },
};

export default function CoverageMap({ locations }: { locations: CoverageLocation[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; k: number } | null>(null);

  const { height, statePaths, stateLabels, points, initialView } = useMemo(() => {
    const shapes = statesGeo as StateShape[];
    const allPoints = shapes.flatMap((s) => s.rings.flat());

    const lngs = allPoints.map(([lng]) => lng);
    const lats = allPoints.map(([, lat]) => lat);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const lngRange = maxLng - minLng;
    const latRange = maxLat - minLat;
    const midLatRad = ((minLat + maxLat) / 2) * (Math.PI / 180);
    const innerWidth = WIDTH - PADDING * 2;
    const innerHeight = innerWidth * (latRange / (lngRange * Math.cos(midLatRad)));
    const height = innerHeight + PADDING * 2;

    const project = ([lng, lat]: [number, number]): [number, number] => [
      PADDING + ((lng - minLng) / lngRange) * innerWidth,
      PADDING + ((maxLat - lat) / latRange) * innerHeight,
    ];

    const statePaths = shapes.map((shape) => ({
      name: shape.name,
      d: shape.rings
        .map((ring) => {
          const coords = ring.map(project);
          return `M ${coords.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")} Z`;
        })
        .join(" "),
    }));

    const stateLabels = shapes.map((shape) => {
      const ring = shape.rings[0];
      const projected = ring.map(project);
      const cx = projected.reduce((s, [x]) => s + x, 0) / projected.length;
      const cy = projected.reduce((s, [, y]) => s + y, 0) / projected.length;
      const offset = LABEL_OFFSET[shape.name] ?? { dx: 0, dy: 0 };
      return { name: shape.name, x: cx + offset.dx, y: cy + offset.dy };
    });

    const points = locations.map((location, i) => {
      const [x, y] = project([location.lng, location.lat]);
      return { ...location, index: i, x, y };
    });

    // Encuadre inicial: acercado a la zona donde están las localidades
    let initialView = { k: 1, tx: 0, ty: 0 };
    if (points.length > 0) {
      const xs = points.map((p) => p.x);
      const ys = points.map((p) => p.y);
      const bw = Math.max(Math.max(...xs) - Math.min(...xs), 40);
      const bh = Math.max(Math.max(...ys) - Math.min(...ys), 40);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
      const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.min(WIDTH / (bw * 1.9), height / (bh * 1.9))));
      initialView = {
        k,
        tx: Math.min(0, Math.max(WIDTH * (1 - k), WIDTH / 2 - k * cx)),
        ty: Math.min(0, Math.max(height * (1 - k), height / 2 - k * cy)),
      };
    }

    return { height, statePaths, stateLabels, points, initialView };
  }, [locations]);

  const [active, setActive] = useState<number | null>(null);
  const [view, setView] = useState(initialView);
  const [dragging, setDragging] = useState(false);
  // Escala real px-de-pantalla / unidad-de-viewBox (varía con el tamaño del visor)
  const [screenScale, setScreenScale] = useState(0.5);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const measure = () => {
      const rect = svg.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setScreenScale(Math.min(rect.width / WIDTH, rect.height / height));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
  }, [height]);

  // Garantiza el encuadre inicial en el cliente aunque la hidratación se
  // interrumpa, y lo actualiza si cambian las localidades del CMS.
  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  // La rueda se registra como listener no-pasivo: React la adjunta pasiva y
  // preventDefault (necesario para no hacer scroll al usar Ctrl+rueda) falla.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const handler = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const s = Math.min(rect.width / WIDTH, rect.height / (svg.viewBox.baseVal.height || 1));
      const ox = (rect.width - WIDTH * s) / 2;
      const oy = (rect.height - svg.viewBox.baseVal.height * s) / 2;
      const vx = (e.clientX - rect.left - ox) / s;
      const vy = (e.clientY - rect.top - oy) / s;
      const factor = e.deltaY < 0 ? 1.25 : 0.8;
      setView((prev) => {
        const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.k * factor));
        const ratio = k / prev.k;
        const H = svg.viewBox.baseVal.height;
        const tx = vx - (vx - prev.tx) * ratio;
        const ty = vy - (vy - prev.ty) * ratio;
        return {
          k,
          tx: Math.min(0, Math.max(WIDTH * (1 - k), tx)),
          ty: Math.min(0, Math.max(H * (1 - k), ty)),
        };
      });
    };
    svg.addEventListener("wheel", handler, { passive: false });
    return () => svg.removeEventListener("wheel", handler);
  }, []);

  if (locations.length === 0) {
    return null;
  }

  /** Limita el encuadre para que el mapa siempre cubra el visor. */
  const clampView = (k: number, tx: number, ty: number) => ({
    k,
    tx: Math.min(0, Math.max(WIDTH * (1 - k), tx)),
    ty: Math.min(0, Math.max(height * (1 - k), ty)),
  });

  /** Convierte un punto del cliente (px) a coordenadas del viewBox. */
  const toViewBox = (clientX: number, clientY: number) => {
    const svg = svgRef.current!;
    const rect = svg.getBoundingClientRect();
    const s = Math.min(rect.width / WIDTH, rect.height / height);
    const ox = (rect.width - WIDTH * s) / 2;
    const oy = (rect.height - height * s) / 2;
    return {
      x: (clientX - rect.left - ox) / s,
      y: (clientY - rect.top - oy) / s,
      s,
    };
  };

  /** Acerca/aleja alrededor de un punto del viewBox. */
  const zoomAt = (factor: number, vx: number, vy: number) => {
    setView((prev) => {
      const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.k * factor));
      const ratio = k / prev.k;
      return clampView(k, vx - (vx - prev.tx) * ratio, vy - (vy - prev.ty) * ratio);
    });
  };

  const zoomCenter = (factor: number) => zoomAt(factor, WIDTH / 2, height / 2);

  const onDoubleClick = (e: React.MouseEvent) => {
    const { x, y } = toViewBox(e.clientX, e.clientY);
    zoomAt(1.6, x, y);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), k: view.k };
    } else {
      setDragging(true);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      // Pellizco: escala alrededor del punto medio
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = toViewBox((a.x + b.x) / 2, (a.y + b.y) / 2);
      const target = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchStart.current.k * (dist / pinchStart.current.dist)));
      setView((v) => {
        const ratio = target / v.k;
        return clampView(target, mid.x - (mid.x - v.tx) * ratio, mid.y - (mid.y - v.ty) * ratio);
      });
      return;
    }

    if (pointers.current.size === 1) {
      const { s } = toViewBox(e.clientX, e.clientY);
      const dx = (e.clientX - prev.x) / s;
      const dy = (e.clientY - prev.y) / s;
      setView((v) => clampView(v.k, v.tx + dx, v.ty + dy));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) setDragging(false);
  };

  const { k, tx, ty } = view;
  const s = screenScale || 0.5;
  // ui: los elementos con esta escala se dimensionan en píxeles REALES de pantalla
  const ui = 1 / (k * s);
  // Pin estilo Google Maps (dibujado con 22 unidades de alto, punta en 0,0).
  // Crece con el zoom de forma amortiguada y un 40% extra al pasar el cursor.
  const pinHeightPx = 18 * Math.pow(k, 0.4); // alto del pin en px de pantalla
  const pinScale = (pinHeightPx / 22) / (k * s);
  const markerHalf = pinHeightPx * 0.4; // separación del tooltip respecto al pin
  const activePoint = active !== null ? points[active] : null;

  return (
    <div className="relative w-full h-[70vh] min-h-[440px] max-h-[820px] overflow-hidden select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className={`w-full h-full ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        role="group"
        aria-label="Mapa de Nuevo León y Coahuila con las localidades atendidas"
        style={{ touchAction: "none" }}
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          <pattern id="coverage-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#E8FFC0" opacity="0.1" />
          </pattern>
        </defs>

        <g transform={`translate(${tx} ${ty}) scale(${k})`}>
          <rect x={-WIDTH} y={-height} width={WIDTH * 3} height={height * 3} fill="url(#coverage-grid)" />

          {/* Siluetas de los estados con su división */}
          {statePaths.map((state) => (
            <path
              key={state.name}
              d={state.d}
              fill={state.name === "Nuevo León" ? "rgba(176,191,146,0.22)" : "rgba(176,191,146,0.10)"}
              stroke="#B0BF92"
              strokeWidth={1.6 * ui}
              strokeLinejoin="round"
            />
          ))}

          {/* Etiquetas de estado (tamaño constante) */}
          {stateLabels.map((label) => (
            <text
              key={label.name}
              x={0}
              y={0}
              transform={`translate(${label.x} ${label.y}) scale(${ui})`}
              textAnchor="middle"
              className="font-title"
              fill="#B0BF92"
              fontSize="15"
              fontWeight="700"
              letterSpacing="3"
            >
              {label.name.toUpperCase()}
            </text>
          ))}

          {/* Marcadores (tamaño constante) */}
          {points.map((point) => {
            const isActive = active === point.index;
            return (
              <g
                key={`${point.name}-${point.index}`}
                tabIndex={0}
                role="button"
                aria-label={`${point.name}, ${point.state}`}
                className="cursor-pointer outline-none"
                style={{
                  transform: `translate(${point.x}px, ${point.y}px) scale(${pinScale * (isActive ? 1.4 : 1)})`,
                  transition: "transform 0.15s ease-out",
                }}
                onMouseEnter={() => setActive(point.index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(point.index)}
                onBlur={() => setActive(null)}
              >
                {/* Pin tipo Google Maps: gota con punta en (0,0) */}
                <path
                  d="M 0 0 C -1.6 -4.5 -8 -9.5 -8 -14.8 A 8 8 0 1 1 8 -14.8 C 8 -9.5 1.6 -4.5 0 0 Z"
                  fill={isActive ? "#E8FFC0" : "#FFFFFF"}
                  stroke="#004431"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  style={{ transition: "fill 0.2s" }}
                />
                <circle cx="0" cy="-14.8" r="3.1" fill="#004431" />
              </g>
            );
          })}

          {/* Tooltip de la localidad activa (tamaño constante) */}
          {activePoint && (
            <g transform={`translate(${activePoint.x} ${activePoint.y}) scale(${ui})`} pointerEvents="none">
              {(() => {
                const label = activePoint.name;
                const w = Math.max(label.length * 14 + 48, 180);
                const gap = markerHalf + 12; // libra el rombo, que crece con el zoom
                const flipX = activePoint.x * k + tx + (w + gap) / s > WIDTH;
                const x0 = flipX ? -w - gap : gap;
                const y0 = activePoint.y * k + ty - 40 / s < 0 ? 16 : -36;
                return (
                  <>
                    <path d={`M ${x0} ${y0} H ${x0 + w} V ${y0 + 56} L ${x0 + w - 16} ${y0 + 72} H ${x0} Z`} fill="#FFFFFF" />
                    <rect x={x0} y={y0} width="5" height="72" fill="#E8FFC0" />
                    <text x={x0 + 21} y={y0 + 31} className="font-title" fill="#004431" fontSize="22" fontWeight="700">
                      {label.toUpperCase()}
                    </text>
                    <text x={x0 + 21} y={y0 + 56} fill="#4F5054" fontSize="14.5" letterSpacing="2">
                      {activePoint.state.toUpperCase()}
                    </text>
                  </>
                );
              })()}
            </g>
          )}
        </g>
      </svg>

      {/* Controles de zoom */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5">
        <button
          type="button"
          aria-label="Acercar"
          onClick={() => zoomCenter(1.5)}
          className="w-10 h-10 flex items-center justify-center bg-white text-primary hover:bg-accent transition-colors clip-notch-br-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          aria-label="Alejar"
          onClick={() => zoomCenter(0.66)}
          className="w-10 h-10 flex items-center justify-center bg-white text-primary hover:bg-accent transition-colors clip-notch-br-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Minus size={18} />
        </button>
        <button
          type="button"
          aria-label="Restablecer vista"
          onClick={() => setView(initialView)}
          className="w-10 h-10 flex items-center justify-center bg-white/80 text-primary hover:bg-accent transition-colors clip-notch-br-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
