import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Video, BookOpen, MessageSquare, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { videos, diarioPaginas, testimonios } from '../data/museoData';

const TABS = [
  {
    id: 'audiovisual',
    label: 'Audiovisual',
    icon: Video,
    intro: 'Videos, documentales y registros audiovisuales sobre la historia de Malvinas.',
  },
  {
    id: 'diario',
    label: 'Diario digitalizado',
    icon: BookOpen,
    intro: 'Páginas y fragmentos de un diario histórico, digitalizados para su consulta.',
  },
  {
    id: 'testimonios',
    label: 'Testimonios',
    icon: MessageSquare,
    intro: 'Entrevistas, testimonios y relatos vinculados con la historia de Malvinas.',
  },
];

const youtubeEmbed = (id) => `https://www.youtube-nocookie.com/embed/${id}`;
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function Reservado({ icon: Icon, titulo, texto, variante = 'video' }) {
  return (
    <div className={`museo-reservado museo-reservado--${variante}`}>
      <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
      <p className="museo-reservado-titulo">{titulo}</p>
      <p className="museo-reservado-texto">{texto}</p>
    </div>
  );
}

function YouTubeFrame({ id, titulo }) {
  return (
    <div className="museo-video-frame">
      <iframe
        src={youtubeEmbed(id)}
        title={titulo}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function PanelAudiovisual() {
  if (videos.length === 0) {
    return (
      <Reservado
        icon={Video}
        titulo="Espacio reservado para videos"
        texto="Los videos del archivo audiovisual se publicarán próximamente."
      />
    );
  }
  return (
    <div className="museo-video-grid">
      {videos.map((v) => (
        <figure key={v.id} className="museo-video">
          <YouTubeFrame id={v.youtubeId} titulo={v.titulo} />
          <figcaption>
            <h3>{v.titulo}</h3>
            {v.descripcion && <p>{v.descripcion}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function PanelDiario() {
  const [indice, setIndice] = useState(0);
  const touchX = useRef(null);
  const total = diarioPaginas.length;

  const ir = useCallback(
    (paso) => setIndice((i) => (total ? (i + paso + total) % total : 0)),
    [total]
  );

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') ir(-1);
    if (e.key === 'ArrowRight') ir(1);
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const pagina = diarioPaginas[indice];

  return (
    <div
      className="museo-carrusel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Diario digitalizado"
      tabIndex={total ? 0 : -1}
      onKeyDown={onKeyDown}
    >
      <div className="museo-carrusel-escena">
        <button
          className="museo-carrusel-btn"
          onClick={() => ir(-1)}
          disabled={total < 2}
          aria-label="Página anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="museo-carrusel-hoja" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {pagina ? (
            <img src={assetUrl(pagina.imagen)} alt={pagina.titulo} />
          ) : (
            <Reservado
              icon={BookOpen}
              variante="hoja"
              titulo="Espacio reservado para el diario"
              texto="Las páginas digitalizadas se incorporarán próximamente."
            />
          )}
        </div>

        <button
          className="museo-carrusel-btn"
          onClick={() => ir(1)}
          disabled={total < 2}
          aria-label="Página siguiente"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {pagina && (
        <div className="museo-carrusel-pie" aria-live="polite">
          <div>
            <h3>{pagina.titulo}</h3>
            {pagina.fecha && <span className="museo-meta">{pagina.fecha}</span>}
            {pagina.descripcion && <p>{pagina.descripcion}</p>}
          </div>
          <span className="museo-contador">{indice + 1} / {total}</span>
        </div>
      )}

      {total > 1 && (
        <div className="museo-puntos">
          {diarioPaginas.map((p, i) => (
            <button
              key={p.id}
              className={i === indice ? 'activo' : ''}
              onClick={() => setIndice(i)}
              aria-label={`Ir a ${p.titulo}`}
              aria-current={i === indice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PanelTestimonios() {
  if (testimonios.length === 0) {
    return (
      <Reservado
        icon={MessageSquare}
        titulo="Espacio reservado para testimonios"
        texto="Las entrevistas y relatos se publicarán a medida que se incorporen al archivo."
      />
    );
  }
  return (
    <div className="museo-testimonios">
      {testimonios.map((t) => (
        <article key={t.id} className="museo-testimonio">
          {t.youtubeId && <YouTubeFrame id={t.youtubeId} titulo={`Testimonio de ${t.nombre}`} />}
          <div className="museo-testimonio-texto">
            {t.cita && <blockquote>«{t.cita}»</blockquote>}
            <h3>{t.nombre}</h3>
            {t.contexto && <span className="museo-meta">{t.contexto}</span>}
            {t.enlace && (
              <a href={t.enlace} target="_blank" rel="noopener noreferrer" className="museo-enlace">
                Ver entrevista completa <ExternalLink size={14} />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

const PANELES = {
  audiovisual: PanelAudiovisual,
  diario: PanelDiario,
  testimonios: PanelTestimonios,
};

export default function MuseoVirtual() {
  const [params, setParams] = useSearchParams();
  const pedido = params.get('sala');
  const activa = TABS.some((t) => t.id === pedido) ? pedido : TABS[0].id;
  const tab = TABS.find((t) => t.id === activa);
  const Panel = PANELES[activa];
  const tabsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const elegir = (id) => setParams({ sala: id }, { replace: true });

  const onTabKey = (e, i) => {
    let siguiente = null;
    if (e.key === 'ArrowRight') siguiente = (i + 1) % TABS.length;
    if (e.key === 'ArrowLeft') siguiente = (i - 1 + TABS.length) % TABS.length;
    if (siguiente !== null) {
      e.preventDefault();
      elegir(TABS[siguiente].id);
      tabsRef.current[siguiente]?.focus();
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Archivo de la memoria</span>
          <h1 className="section-title">Museo Virtual</h1>
          <p className="section-subtitle">
            Un espacio digital para preservar y compartir la memoria histórica de Malvinas.
          </p>
        </div>

        <div className="museo">
          <div className="museo-tabs" role="tablist" aria-label="Salas del Museo Virtual">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const sel = t.id === activa;
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabsRef.current[i] = el)}
                  id={`tab-${t.id}`}
                  role="tab"
                  aria-selected={sel}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={sel ? 0 : -1}
                  className={`museo-tab ${sel ? 'activa' : ''}`}
                  onClick={() => elegir(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <div
            className="museo-panel"
            role="tabpanel"
            id={`panel-${activa}`}
            aria-labelledby={`tab-${activa}`}
          >
            <p className="museo-panel-intro">{tab.intro}</p>
            <Panel />
          </div>
        </div>
      </div>
    </div>
  );
}
