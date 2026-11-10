/**
 * Producciones de estudiantes — componentes reutilizables (tarjetas y visores de material).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { assetUrl, tipoDe, firmaDe } from './datos';
import { GAME_URL } from '../config/site';
import { PortadaTrivia } from '../components/marca/Marca';

/** La trivia (juego principal) usa la portada dibujada con la identidad del juego. */
export const esTrivia = (pieza) => pieza?.juego === GAME_URL;
import '../styles/producciones.css';

/* ---------- SEO básico ---------- */

const TITULO_SITIO = 'MalvinizAR';

/** Actualiza <title> y la meta description de cada página. */
export function useMetaPagina(titulo, descripcion) {
  useEffect(() => {
    const anterior = document.title;
    document.title = titulo ? `${titulo} | ${TITULO_SITIO}` : `${TITULO_SITIO} | Producciones sobre Malvinas de estudiantes de la UNPILAR`;
    const meta = document.querySelector('meta[name="description"]');
    const descAnterior = meta?.getAttribute('content');
    if (meta && descripcion) meta.setAttribute('content', descripcion.slice(0, 160));
    return () => {
      document.title = anterior;
      if (meta && descAnterior) meta.setAttribute('content', descAnterior);
    };
  }, [titulo, descripcion]);
}

/** Vuelve arriba al cambiar de página. */
export function useScrollArriba(clave) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [clave]);
}

/* ---------- Etiquetas ---------- */

export function EtiquetaTipo({ pieza, solida = false }) {
  const t = tipoDe(pieza);
  const Icon = t.icon;
  return (
    <span className={`mv-tipo ${solida ? 'mv-tipo--solida' : ''}`}>
      <Icon size={13} aria-hidden="true" /> {t.label}
    </span>
  );
}

export function EtiquetaDemo({ visible }) {
  if (!visible) return null;
  return <span className="mv-demo-tag">Demo</span>;
}

/* ---------- Imágenes ---------- */

/** Imagen con carga diferida y fundido suave al aparecer. */
export function Img({ src, alt = '', className = '', prioridad = false, ...resto }) {
  const [lista, setLista] = useState(false);
  if (!src) return null;
  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      loading={prioridad ? 'eager' : 'lazy'}
      decoding="async"
      className={`mv-img ${lista ? 'mv-img--lista' : ''} ${className}`}
      onLoad={() => setLista(true)}
      {...resto}
    />
  );
}

/** Marco para piezas sin imagen (por ejemplo, un audio). */
export function SinImagen({ pieza }) {
  const Icon = tipoDe(pieza).icon;
  return (
    <div className="mv-sin-imagen" aria-hidden="true">
      <Icon size={40} strokeWidth={1.25} />
    </div>
  );
}

/* ---------- Tarjeta de producción ---------- */

/**
 * Tarjeta de una producción: imagen completa (sin recortes, con el mismo material
 * desenfocado de fondo) y una base crema con título, autoría, materia y año.
 */
export function TarjetaPieza({ pieza, compacta = false }) {
  const t = tipoDe(pieza);
  const Icon = t.icon;
  const firma = firmaDe(pieza);
  const contexto = [pieza.materia, pieza.anio].filter(Boolean).join(' · ');
  return (
    <article className={`tarjeta-prod ${compacta ? 'tarjeta-prod--compacta' : ''}`}>
      <Link to={`/producciones/${pieza.slug}`} className="tarjeta-prod-enlace">
        <div className="tarjeta-prod-media">
          {esTrivia(pieza) ? (
            <PortadaTrivia />
          ) : pieza.imagen ? (
            <>
              <img className="tarjeta-prod-fondo" src={assetUrl(pieza.imagen)} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              <Img src={pieza.imagen} alt="" className="tarjeta-prod-img" />
            </>
          ) : (
            <SinImagen pieza={pieza} />
          )}
          <span className="tarjeta-prod-formato">
            <Icon size={14} aria-hidden="true" /> {t.label}
          </span>
        </div>
        <div className="tarjeta-prod-cuerpo">
          <h3 className="tarjeta-prod-titulo">{pieza.titulo}</h3>
          {!compacta && firma && <p className="tarjeta-prod-firma">{firma}</p>}
          {!compacta && contexto && <p className="tarjeta-prod-contexto">{contexto}</p>}
        </div>
      </Link>
    </article>
  );
}

export function GrillaPiezas({ piezas, compacta = false }) {
  return (
    <div className={`grilla-prod ${compacta ? 'grilla-prod--compacta' : ''}`}>
      {piezas.map((p) => (
        <TarjetaPieza key={p.slug} pieza={p} compacta={compacta} />
      ))}
    </div>
  );
}

/* ---------- Visor ampliado (lightbox) ---------- */

/**
 * Visor a pantalla completa con zoom.
 * items: [{ src, alt, pie }]
 */
export function Visor({ items, indice, onCerrar, onCambiar }) {
  const [zoom, setZoom] = useState(false);
  const cerrarRef = useRef(null);
  const total = items.length;
  const item = items[indice];

  const ir = useCallback(
    (paso) => {
      setZoom(false);
      onCambiar((indice + paso + total) % total);
    },
    [indice, total, onCambiar]
  );

  useEffect(() => {
    const previo = document.activeElement;
    cerrarRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      previo?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onCerrar();
      if (e.key === 'ArrowRight' && total > 1) ir(1);
      if (e.key === 'ArrowLeft' && total > 1) ir(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ir, onCerrar, total]);

  if (!item) return null;

  // Se monta en <body> para quedar por encima de todo (los contenedores fijos crean capas propias).
  return createPortal(
    <div className="mv mv-visor" role="dialog" aria-modal="true" aria-label="Visor de imagen ampliada">
      <div className="mv-visor-barra">
        <span className="mv-visor-contador">{total > 1 ? `${indice + 1} / ${total}` : ''}</span>
        <div className="mv-visor-acciones">
          <button type="button" onClick={() => setZoom((z) => !z)} aria-pressed={zoom} aria-label={zoom ? 'Ajustar a la pantalla' : 'Ver en tamaño real'}>
            {zoom ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
          </button>
          <button type="button" ref={cerrarRef} onClick={onCerrar} aria-label="Cerrar visor">
            <X size={22} />
          </button>
        </div>
      </div>

      <div className={`mv-visor-escena ${zoom ? 'mv-visor-escena--zoom' : ''}`} onClick={(e) => e.target === e.currentTarget && onCerrar()}>
        <img
          src={assetUrl(item.src)}
          alt={item.alt || ''}
          onClick={() => setZoom((z) => !z)}
          className={zoom ? 'zoom' : ''}
        />
      </div>

      {total > 1 && (
        <>
          <button type="button" className="mv-visor-flecha mv-visor-flecha--izq" onClick={() => ir(-1)} aria-label="Anterior">
            <ChevronLeft size={28} />
          </button>
          <button type="button" className="mv-visor-flecha mv-visor-flecha--der" onClick={() => ir(1)} aria-label="Siguiente">
            <ChevronRight size={28} />
          </button>
        </>
      )}
      {item.pie && <p className="mv-visor-pie">{item.pie}</p>}
    </div>,
    document.body
  );
}

/** Imagen única que se amplía al hacer clic. */
export function ImagenAmpliable({ src, alt, pie }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <figure className="mv-ampliable">
      <button type="button" className="mv-ampliable-boton" onClick={() => setAbierto(true)} aria-label="Ampliar imagen">
        <Img src={src} alt={alt} prioridad />
        <span className="mv-ampliable-icono" aria-hidden="true">
          <Maximize2 size={18} />
        </span>
      </button>
      {pie && <figcaption>{pie}</figcaption>}
      {abierto && (
        <Visor items={[{ src, alt, pie }]} indice={0} onCerrar={() => setAbierto(false)} onCambiar={() => {}} />
      )}
    </figure>
  );
}

/** Galería: imagen grande + miniaturas. */
export function Galeria({ items }) {
  const [actual, setActual] = useState(0);
  const [abierto, setAbierto] = useState(false);
  const item = items[actual];
  return (
    <div className="mv-galeria">
      <button type="button" className="mv-ampliable-boton" onClick={() => setAbierto(true)} aria-label="Ampliar imagen">
        <Img key={item.src} src={item.src} alt={item.alt} prioridad />
        <span className="mv-ampliable-icono" aria-hidden="true">
          <Maximize2 size={18} />
        </span>
      </button>
      {item.pie && <p className="mv-galeria-pie">{item.pie}</p>}
      <div className="mv-galeria-miniaturas" role="list">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            role="listitem"
            className={i === actual ? 'activa' : ''}
            onClick={() => setActual(i)}
            aria-label={`Ver imagen ${i + 1} de ${items.length}`}
            aria-current={i === actual}
          >
            <Img src={it.src} alt="" />
          </button>
        ))}
      </div>
      {abierto && <Visor items={items} indice={actual} onCerrar={() => setAbierto(false)} onCambiar={setActual} />}
    </div>
  );
}

/** Visor de presentaciones y documentos a partir de las imágenes de sus páginas. */
export function VisorPaginas({ paginas, titulo }) {
  const [actual, setActual] = useState(0);
  const [abierto, setAbierto] = useState(false);
  const toque = useRef(null);
  const total = paginas.length;
  const ir = (paso) => setActual((i) => Math.min(total - 1, Math.max(0, i + paso)));
  const items = paginas.map((src, i) => ({ src, alt: `${titulo} — página ${i + 1} de ${total}` }));

  return (
    <div
      className="mv-paginas"
      role="region"
      aria-roledescription="visor de páginas"
      aria-label={titulo}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') ir(1);
        if (e.key === 'ArrowLeft') ir(-1);
      }}
    >
      <div
        className="mv-paginas-escena"
        onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toque.current === null) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
          toque.current = null;
        }}
      >
        <button type="button" className="mv-ampliable-boton" onClick={() => setAbierto(true)} aria-label="Ampliar página">
          <Img key={paginas[actual]} src={paginas[actual]} alt={items[actual].alt} prioridad />
          <span className="mv-ampliable-icono" aria-hidden="true">
            <Maximize2 size={18} />
          </span>
        </button>
      </div>
      <div className="mv-paginas-control">
        <button type="button" onClick={() => ir(-1)} disabled={actual === 0} aria-label="Página anterior">
          <ChevronLeft size={20} />
        </button>
        <span aria-live="polite">
          Página {actual + 1} de {total}
        </span>
        <button type="button" onClick={() => ir(1)} disabled={actual === total - 1} aria-label="Página siguiente">
          <ChevronRight size={20} />
        </button>
      </div>
      {total > 1 && (
        <div className="mv-paginas-tira">
          {paginas.map((p, i) => (
            <button
              key={p}
              type="button"
              className={i === actual ? 'activa' : ''}
              onClick={() => setActual(i)}
              aria-label={`Ir a la página ${i + 1}`}
              aria-current={i === actual}
            >
              <Img src={p} alt="" />
            </button>
          ))}
        </div>
      )}
      {abierto && <Visor items={items} indice={actual} onCerrar={() => setAbierto(false)} onCambiar={setActual} />}
    </div>
  );
}
