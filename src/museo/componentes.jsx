/**
 * Museo Virtual — componentes reutilizables.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Search,
  Play,
} from 'lucide-react';
import { assetUrl, tipoDe, config } from './datos';
import '../styles/museo.css';

/* ---------- SEO básico ---------- */

const TITULO_SITIO = 'MalvinizAR';

/** Actualiza <title> y la meta description de cada página del museo. */
export function useMetaPagina(titulo, descripcion) {
  useEffect(() => {
    const anterior = document.title;
    document.title = titulo ? `${titulo} · ${config.nombre} | ${TITULO_SITIO}` : `${config.nombre} | ${TITULO_SITIO}`;
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

/* ---------- Navegación del museo ---------- */

/** Barra del museo: secciones + buscador. En celular el buscador es un ícono. */
export function MuseoNav() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const buscar = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/museo-virtual/archivo?q=${encodeURIComponent(q.trim())}` : '/museo-virtual/archivo');
  };
  const clase = ({ isActive }) => (isActive ? 'activo' : undefined);
  return (
    <nav className="mv-nav" aria-label="Secciones del Museo Virtual">
      <div className="mv-contenedor mv-nav-inner">
        <ul>
          <li><NavLink to="/museo-virtual" end className={clase}>Inicio</NavLink></li>
          <li><NavLink to="/museo-virtual/archivo" className={clase}>Catálogo</NavLink></li>
        </ul>
        <form className="mv-nav-buscar" role="search" onSubmit={buscar}>
          <Search size={17} aria-hidden="true" />
          <label className="mv-solo-lectores" htmlFor="mv-buscar">Buscar en el museo</label>
          <input id="mv-buscar" type="search" placeholder="Buscar" value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
        <Link to="/museo-virtual/archivo?buscar=1" className="mv-nav-lupa" aria-label="Buscar en el museo">
          <Search size={20} aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}

export function Migas({ items }) {
  return (
    <nav className="mv-migas" aria-label="Ubicación">
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
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

/* ---------- Póster (tarjeta) ---------- */

/**
 * Póster de una pieza: la producción ocupa toda la tarjeta, con el mismo
 * material desenfocado de fondo para que entre completa sin recortes.
 */
export function TarjetaPieza({ pieza }) {
  const Icon = tipoDe(pieza).icon;
  return (
    <article className="mv-poster">
      <Link to={`/museo-virtual/pieza/${pieza.slug}`} className="mv-poster-enlace" aria-label={`${pieza.titulo} — ${tipoDe(pieza).label}`}>
        <div className="mv-poster-media">
          {pieza.imagen ? (
            <>
              <img className="mv-poster-fondo" src={assetUrl(pieza.imagen)} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              <Img src={pieza.imagen} alt="" className="mv-poster-img" />
            </>
          ) : (
            <SinImagen pieza={pieza} />
          )}
          <span className="mv-poster-tipo" title={tipoDe(pieza).label}>
            <Icon size={15} aria-hidden="true" />
          </span>
          {pieza.demo && <span className="mv-poster-demo">Demo</span>}
        </div>
        <h3 className="mv-poster-titulo">{pieza.titulo}</h3>
      </Link>
    </article>
  );
}

export function GrillaPiezas({ piezas }) {
  return (
    <div className="mv-grilla">
      {piezas.map((p) => (
        <TarjetaPieza key={p.slug} pieza={p} />
      ))}
    </div>
  );
}

export function EnlaceFlecha({ to, children }) {
  return (
    <Link to={to} className="mv-enlace-flecha">
      {children} <ChevronRight size={16} aria-hidden="true" />
    </Link>
  );
}

/* ---------- Fila tipo Netflix ---------- */

export function Carrusel({ titulo, verTodo, piezas }) {
  const pista = useRef(null);
  const [bordes, setBordes] = useState({ inicio: true, fin: false });

  const medir = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    setBordes({
      inicio: el.scrollLeft <= 4,
      fin: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [medir, piezas]);

  const mover = (dir) => {
    const el = pista.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (!piezas.length) return null;

  return (
    <section className="mv-fila" aria-label={titulo}>
      <div className="mv-contenedor mv-fila-cabecera">
        <h2 className="mv-fila-titulo">
          {verTodo ? <Link to={verTodo}>{titulo} <ChevronRight size={20} aria-hidden="true" /></Link> : titulo}
        </h2>
      </div>
      <div className="mv-fila-cuerpo">
        <button type="button" className="mv-fila-flecha mv-fila-flecha--izq" onClick={() => mover(-1)} hidden={bordes.inicio} aria-label={`Anterior en ${titulo}`}>
          <ChevronLeft size={30} />
        </button>
        <div className="mv-fila-pista" ref={pista} onScroll={medir}>
          {piezas.map((p) => (
            <div className="mv-fila-item" key={p.slug}>
              <TarjetaPieza pieza={p} />
            </div>
          ))}
        </div>
        <button type="button" className="mv-fila-flecha mv-fila-flecha--der" onClick={() => mover(1)} hidden={bordes.fin} aria-label={`Siguiente en ${titulo}`}>
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
}

/* ---------- Portada grande con destacados ---------- */

export function SliderDestacados({ piezas, intervalo = 7000 }) {
  const [actual, setActual] = useState(0);
  const [pausa, setPausa] = useState(false);
  const toque = useRef(null);
  const total = piezas.length;

  useEffect(() => {
    const reducir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (pausa || total < 2 || reducir) return undefined;
    const t = setTimeout(() => setActual((i) => (i + 1) % total), intervalo);
    return () => clearTimeout(t);
  }, [actual, pausa, total, intervalo]);

  if (!total) return null;
  const ir = (i) => setActual((i + total) % total);

  return (
    <section
      className="mv-hero"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current === null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
        toque.current = null;
      }}
    >
      {piezas.map((p, i) => {
        const Icon = tipoDe(p).icon;
        return (
          <div
            key={p.slug}
            className={`mv-hero-slide ${i === actual ? 'activo' : ''}`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== actual}
          >
            {p.imagen && <img className="mv-hero-fondo" src={assetUrl(p.imagen)} alt="" aria-hidden="true" loading={i === 0 ? 'eager' : 'lazy'} />}
            <div className="mv-hero-pieza">
              {p.imagen ? <img src={assetUrl(p.imagen)} alt={p.imagenAlt} loading={i === 0 ? 'eager' : 'lazy'} /> : <SinImagen pieza={p} />}
            </div>
            <div className="mv-contenedor mv-hero-texto">
              <p className="mv-hero-tipo">
                <Icon size={15} aria-hidden="true" /> {tipoDe(p).label}
              </p>
              <h2 className="mv-hero-titulo">{p.titulo}</h2>
              <Link to={`/museo-virtual/pieza/${p.slug}`} className="mv-boton mv-boton--claro" tabIndex={i === actual ? 0 : -1}>
                <Play size={18} aria-hidden="true" fill="currentColor" /> Ver
              </Link>
            </div>
          </div>
        );
      })}

      {total > 1 && (
        <div className="mv-hero-puntos">
          {piezas.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              className={i === actual ? 'activo' : ''}
              onClick={() => ir(i)}
              aria-label={`Ver destacado ${i + 1}: ${p.titulo}`}
              aria-current={i === actual}
            />
          ))}
        </div>
      )}
    </section>
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
