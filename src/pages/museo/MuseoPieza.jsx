import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download, ExternalLink, FileText, Play } from 'lucide-react';
import {
  getPieza,
  getSala,
  relacionadasDe,
  piezasDeSala,
  firmaDe,
  assetUrl,
  esVideo,
  esAudio,
  esPdf,
  urlEmbed,
  parrafos,
  config,
  tipoDe,
} from '../../museo/datos';
import {
  MuseoNav,
  EtiquetaTipo,
  Img,
  SinImagen,
  ImagenAmpliable,
  Galeria,
  VisorPaginas,
  Carrusel,
  useMetaPagina,
  useScrollArriba,
} from '../../museo/componentes';
import NoEncontrado from './NoEncontrado';

/** Juego o experiencia interactiva: se carga dentro del museo recién al tocar «Jugar». */
function Juego({ pieza }) {
  const [jugando, setJugando] = useState(false);
  if (jugando) {
    return (
      <div className="mv-juego">
        <iframe src={pieza.juego} title={pieza.titulo} allow="fullscreen; autoplay; clipboard-write" allowFullScreen />
      </div>
    );
  }
  return (
    <button type="button" className="mv-juego mv-juego--portada" onClick={() => setJugando(true)}>
      {pieza.imagen && <Img src={pieza.imagen} alt={pieza.imagenAlt} prioridad />}
      <span className="mv-juego-jugar">
        <Play size={22} fill="currentColor" aria-hidden="true" /> Jugar
      </span>
    </button>
  );
}

/** Elige cómo mostrar el material según lo que tenga cargado la pieza. */
function Media({ pieza }) {
  const { archivo, videoExterno, paginas, galeria, imagen, imagenAlt, titulo } = pieza;

  if (pieza.juego) return <Juego pieza={pieza} />;

  if (videoExterno) {
    return (
      <div className="mv-media-video">
        <iframe
          src={urlEmbed(videoExterno)}
          title={titulo}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (archivo && esVideo(archivo)) {
    return (
      <div className="mv-media-video">
        <video controls preload="metadata" poster={imagen ? assetUrl(imagen) : undefined}>
          <source src={assetUrl(archivo)} />
          Tu navegador no puede reproducir este video. <a href={assetUrl(archivo)}>Abrir el archivo</a>.
        </video>
      </div>
    );
  }

  if (archivo && esAudio(archivo)) {
    return (
      <div className="mv-media-audio">
        <div className="mv-media-audio-tapa">
          {imagen ? <Img src={imagen} alt={imagenAlt} prioridad /> : <SinImagen pieza={pieza} />}
        </div>
        <div className="mv-media-audio-reproductor">
          <EtiquetaTipo pieza={pieza} />
          <p className="mv-media-audio-titulo">{titulo}</p>
          <audio controls preload="metadata" src={assetUrl(archivo)}>
            Tu navegador no puede reproducir este audio. <a href={assetUrl(archivo)}>Abrir el archivo</a>.
          </audio>
        </div>
      </div>
    );
  }

  if (paginas.length > 0) return <VisorPaginas paginas={paginas} titulo={titulo} />;

  if (galeria.length > 0) {
    return <Galeria items={galeria.map((g) => ({ src: g.imagen, alt: g.pie || imagenAlt, pie: g.pie }))} />;
  }

  if (imagen) return <ImagenAmpliable src={imagen} alt={imagenAlt} />;

  if (archivo && esPdf(archivo)) {
    return (
      <object className="mv-media-pdf" data={assetUrl(archivo)} type="application/pdf" aria-label={titulo}>
        <p>
          No se puede mostrar el documento aquí. <a href={assetUrl(archivo)}>Abrir el PDF</a>.
        </p>
      </object>
    );
  }

  return <SinImagen pieza={pieza} />;
}

/** Fila de créditos. Si está vacía, se oculta (o se marca como pendiente). */
function Dato({ etiqueta, children, vacio, pendiente = false }) {
  if (vacio) {
    if (!pendiente || !config.mostrarPendientes) return null;
    return (
      <div className="mv-dato mv-dato--pendiente">
        <dt>{etiqueta}</dt>
        <dd>Dato a completar</dd>
      </div>
    );
  }
  return (
    <div className="mv-dato">
      <dt>{etiqueta}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function MuseoPieza() {
  const { slug } = useParams();
  const pieza = getPieza(slug);
  const [leerMas, setLeerMas] = useState(false);
  useMetaPagina(pieza?.titulo, pieza?.resumen || pieza?.descripcion);
  useScrollArriba(slug);

  if (!pieza) return <NoEncontrado que="pieza" />;

  const sala = getSala(pieza.sala);
  const Icon = tipoDe(pieza).icon;
  const relacionadas = relacionadasDe(pieza, 8);
  const masDeSala = piezasDeSala(pieza.sala).filter((p) => p.slug !== pieza.slug && !relacionadas.includes(p));
  const descarga = pieza.descargable ? pieza.archivo || pieza.imagen : '';
  const pdf = esPdf(pieza.archivo) ? pieza.archivo : '';
  const firma = firmaDe(pieza);
  const texto = parrafos(pieza.descripcion || pieza.resumen);

  return (
    <div className="mv">
      <MuseoNav />

      <article>
        <div className="mv-escenario">
          {pieza.imagen && <img className="mv-escenario-fondo" src={assetUrl(pieza.imagen)} alt="" aria-hidden="true" />}
          <div className="mv-contenedor mv-escenario-media">
            <Media pieza={pieza} />
          </div>
        </div>

        <div className="mv-contenedor mv-ficha">
          <p className="mv-ficha-meta">
            <span className="mv-ficha-tipo"><Icon size={15} aria-hidden="true" /> {tipoDe(pieza).label}</span>
            {sala && <Link to={`/museo-virtual/salas/${sala.slug}`}>{sala.titulo}</Link>}
            {pieza.demo && <span className="mv-demo-tag">Demo</span>}
          </p>
          <h1 className="mv-ficha-titulo">{pieza.titulo}</h1>
          {pieza.subtitulo && <p className="mv-ficha-subtitulo">{pieza.subtitulo}</p>}
          {firma && <p className="mv-ficha-firma">{firma}</p>}

          {(descarga || pdf || pieza.enlaces.length > 0) && (
            <div className="mv-ficha-acciones">
              {descarga && (
                <a href={assetUrl(descarga)} download className="mv-boton mv-boton--claro">
                  <Download size={18} aria-hidden="true" /> Descargar
                </a>
              )}
              {pdf && (
                <a href={assetUrl(pdf)} target="_blank" rel="noopener noreferrer" className="mv-boton">
                  <FileText size={18} aria-hidden="true" /> PDF
                </a>
              )}
              {pieza.enlaces.map((e) => (
                <a key={e.url} href={e.url} target="_blank" rel="noopener noreferrer" className="mv-boton">
                  {e.etiqueta || 'Enlace'} <ExternalLink size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}

          {texto.length > 0 && (
            <div className={`mv-ficha-texto ${leerMas ? 'abierto' : ''}`}>
              {texto.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
          )}
          {texto.join(' ').length > 220 && (
            <button type="button" className="mv-leer-mas" onClick={() => setLeerMas((v) => !v)} aria-expanded={leerMas}>
              {leerMas ? 'Leer menos' : 'Leer más'}
            </button>
          )}

          <details className="mv-creditos">
            <summary>Créditos</summary>
            <dl className="mv-datos">
              <Dato etiqueta="Autoría" vacio={!pieza.autores.length} pendiente>
                {pieza.autores.map((a) => (
                  <span key={a.nombre} className="mv-dato-linea">
                    {a.nombre}
                    {a.rol && <span className="mv-rol"> · {a.rol}</span>}
                  </span>
                ))}
              </Dato>
              {pieza.creditos.map((c) => (
                <Dato key={c.rol + c.nombre} etiqueta={c.rol || 'Créditos'} vacio={false}>{c.nombre}</Dato>
              ))}
              <Dato etiqueta="Imagen / audiovisual" vacio={!pieza.creditoImagen}>{pieza.creditoImagen}</Dato>
              <Dato etiqueta="Fecha" vacio={!pieza.fecha} pendiente>{pieza.fecha}</Dato>
              <Dato etiqueta="Procedencia" vacio={!pieza.procedencia} pendiente>{pieza.procedencia}</Dato>
              <Dato etiqueta="Fuentes" vacio={!pieza.fuentes.length}>
                {pieza.fuentes.map((f) => (
                  <span key={f} className="mv-dato-linea">{f}</span>
                ))}
              </Dato>
              <Dato etiqueta="Derechos de uso" vacio={!pieza.derechos} pendiente>{pieza.derechos}</Dato>
              <Dato etiqueta="Licencia" vacio={!pieza.licencia}>{pieza.licencia}</Dato>
            </dl>
          </details>
        </div>
      </article>

      <div className="mv-filas mv-filas--ficha">
        <Carrusel titulo="Más para ver" piezas={relacionadas} />
        {sala && <Carrusel titulo={`Más de ${sala.titulo}`} verTodo={`/museo-virtual/salas/${sala.slug}`} piezas={masDeSala} />}
      </div>
    </div>
  );
}
