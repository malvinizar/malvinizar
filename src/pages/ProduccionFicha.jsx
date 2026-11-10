import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download, ExternalLink, FileText, Play } from 'lucide-react';
import {
  getPieza,
  getSala,
  relacionadasDe,
  hitosDe,
  assetUrl,
  esVideo,
  esAudio,
  esPdf,
  urlEmbed,
  parrafos,
  config,
  tipoDe,
} from '../producciones/datos';
import {
  EtiquetaTipo,
  Img,
  SinImagen,
  ImagenAmpliable,
  Galeria,
  VisorPaginas,
  GrillaPiezas,
  useMetaPagina,
  esTrivia,
} from '../producciones/componentes';
import { PortadaTrivia } from '../components/marca/Marca';
import NoEncontrado from './NoEncontrado';

/** Juego o experiencia interactiva: se carga dentro de la ficha recién al tocar «Jugar». */
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
      {esTrivia(pieza) ? <PortadaTrivia /> : pieza.imagen && <Img src={pieza.imagen} alt={pieza.imagenAlt} prioridad />}
      <span className="mv-juego-jugar btn3d btn3d--lg">
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

/** Fila de la ficha técnica. Si está vacía, se oculta o se marca como pendiente. */
function Dato({ etiqueta, children, vacio, pendiente = false }) {
  if (vacio) {
    if (!pendiente || !config.mostrarPendientes) return null;
    return (
      <div className="dato dato--pendiente">
        <dt>{etiqueta}</dt>
        <dd>A completar</dd>
      </div>
    );
  }
  return (
    <div className="dato">
      <dt>{etiqueta}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function ProduccionFicha() {
  const { slug } = useParams();
  const pieza = getPieza(slug);
  const [leerMas, setLeerMas] = useState(false);
  useMetaPagina(pieza?.titulo, pieza?.resumen || pieza?.descripcion);

  if (!pieza) return <NoEncontrado que="producción" />;

  const sala = getSala(pieza.sala);
  const relacionadas = relacionadasDe(pieza, 4);
  const hitos = hitosDe(pieza.slug);
  const descarga = pieza.descargable ? pieza.archivo || pieza.imagen : '';
  const pdf = esPdf(pieza.archivo) ? pieza.archivo : '';
  const texto = parrafos(pieza.descripcion || pieza.resumen);
  const largo = texto.join(' ').length > 420;

  return (
    <article className="ficha">
      <div className="ficha-escenario">
 {pieza.imagen && !esTrivia(pieza) && <img className="ficha-escenario-fondo" src={assetUrl(pieza.imagen)} alt="" aria-hidden="true" />}
        <div className="contenedor">
          <nav className="migas" aria-label="Ubicación">
            <Link to="/">Inicio</Link> / <Link to="/producciones">Producciones</Link> / <span aria-current="page">{pieza.titulo}</span>
          </nav>
          <div className="mv ficha-media">
            <Media pieza={pieza} />
          </div>
        </div>
      </div>

      <div className="contenedor ficha-cuerpo">
        <div className="ficha-principal">
          <p className="ficha-meta">
            <EtiquetaTipo pieza={pieza} />
            {sala && <Link to={`/producciones?eje=${sala.slug}`}>{sala.titulo}</Link>}
          </p>
          <h1 className="ficha-titulo">{pieza.titulo}</h1>
          {pieza.subtitulo && <p className="ficha-subtitulo">{pieza.subtitulo}</p>}

          {texto.length > 0 && (
            <div className={`ficha-texto ${largo && !leerMas ? 'recortado' : ''}`}>
              {texto.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
          )}
          {largo && (
            <button type="button" className="leer-mas" onClick={() => setLeerMas((v) => !v)} aria-expanded={leerMas}>
              {leerMas ? 'Leer menos' : 'Leer más'}
            </button>
          )}

          {(descarga || pdf || pieza.enlaces.length > 0) && (
            <div className="ficha-acciones">
              {descarga && (
                <a href={assetUrl(descarga)} download className="btn">
                  <Download size={18} aria-hidden="true" /> Descargar
                </a>
              )}
              {pdf && (
                <a href={assetUrl(pdf)} target="_blank" rel="noopener noreferrer" className="btn btn--borde">
                  <FileText size={18} aria-hidden="true" /> Abrir PDF
                </a>
              )}
              {pieza.enlaces.map((e) => (
                <a key={e.url} href={e.url} target="_blank" rel="noopener noreferrer" className="btn btn--borde">
                  {e.etiqueta || 'Enlace'} <ExternalLink size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        <aside className="panel ficha-tecnica" aria-label="Ficha técnica">
          <h2 className="panel-titulo">Ficha técnica</h2>
          <dl className="datos">
            <Dato etiqueta="Título" vacio={false}>{pieza.titulo}</Dato>
            <Dato etiqueta={pieza.autores.length > 1 ? 'Autores/as' : 'Autor/a'} vacio={!pieza.autores.length} pendiente>
              {pieza.autores.map((a) => (
                <span key={a.nombre} className="dato-linea">{a.nombre}</span>
              ))}
            </Dato>
            <Dato etiqueta="Materia" vacio={!pieza.materia} pendiente>{pieza.materia}</Dato>
            <Dato etiqueta="Docente" vacio={!pieza.docente} pendiente>{pieza.docente}</Dato>
            <Dato etiqueta="Año" vacio={!pieza.anio} pendiente>{pieza.anio}</Dato>
            <Dato etiqueta="Formato" vacio={false}>{tipoDe(pieza).label}</Dato>
            {pieza.creditos.map((c) => (
              <Dato key={c.rol + c.nombre} etiqueta={c.rol || 'Créditos'} vacio={false}>{c.nombre}</Dato>
            ))}
            <Dato etiqueta="Fecha" vacio={!pieza.fecha}>{pieza.fecha}</Dato>
            <Dato etiqueta="Procedencia" vacio={!pieza.procedencia}>{pieza.procedencia}</Dato>
            <Dato etiqueta="Imagen / audiovisual" vacio={!pieza.creditoImagen}>{pieza.creditoImagen}</Dato>
            <Dato etiqueta="Fuentes" vacio={!pieza.fuentes.length}>
              {pieza.fuentes.map((f) => (
                <span key={f} className="dato-linea">{f}</span>
              ))}
            </Dato>
            <Dato etiqueta="Derechos de uso" vacio={!pieza.derechos}>{pieza.derechos}</Dato>
            <Dato etiqueta="Licencia" vacio={!pieza.licencia}>{pieza.licencia}</Dato>
          </dl>

          {hitos.length > 0 && (
            <div className="ficha-hitos">
              <h3>En la Historia</h3>
              <ul>
                {hitos.map((h) => (
                  <li key={h.id}>
                    <Link to={`/historia?hito=${h.id}`}>
                      <span className="ficha-hitos-anio">{h.year}</span> {h.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {relacionadas.length > 0 && (
        <section className="seccion seccion--gris ficha-relacionadas">
          <div className="contenedor">
            <header className="cabecera-seccion">
              <div>
                <p className="etiqueta-seccion">Seguí recorriendo</p>
                <h2 className="titulo titulo--md">Más producciones</h2>
              </div>
            </header>
            <GrillaPiezas piezas={relacionadas} />
          </div>
        </section>
      )}
    </article>
  );
}
