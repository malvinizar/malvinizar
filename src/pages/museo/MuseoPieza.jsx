import { Link, useParams } from 'react-router-dom';
import { Download, ExternalLink, FileText } from 'lucide-react';
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
} from '../../museo/datos';
import {
  MuseoNav,
  Migas,
  EtiquetaTipo,
  EtiquetaDemo,
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

/** Elige cómo mostrar el material según lo que tenga cargado la pieza. */
function Media({ pieza }) {
  const { archivo, videoExterno, paginas, galeria, imagen, imagenAlt, titulo } = pieza;

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
  useMetaPagina(pieza?.titulo, pieza?.resumen || pieza?.descripcion);
  useScrollArriba(slug);

  if (!pieza) return <NoEncontrado que="pieza" />;

  const sala = getSala(pieza.sala);
  const relacionadas = relacionadasDe(pieza, 8);
  const masDeSala = piezasDeSala(pieza.sala).filter((p) => p.slug !== pieza.slug && !relacionadas.includes(p));
  const descarga = pieza.descargable ? pieza.archivo || pieza.imagen : '';
  const pdf = esPdf(pieza.archivo) ? pieza.archivo : '';
  const firma = firmaDe(pieza);

  return (
    <div className="mv">
      <MuseoNav />

      <article className="mv-contenedor mv-seccion-catalogo">
        <Migas
          items={[
            { to: '/museo-virtual', label: 'Museo' },
            ...(sala ? [{ to: `/museo-virtual/salas/${sala.slug}`, label: sala.titulo }] : []),
            { label: pieza.titulo },
          ]}
        />

        <div className="mv-producto-pagina">
          <div className="mv-producto-galeria">
            <Media pieza={pieza} />
            {pieza.creditoImagen && <p className="mv-credito-imagen">{pieza.creditoImagen}</p>}
          </div>

          <div className="mv-producto-info">
            <div className="mv-producto-insignias mv-producto-insignias--estaticas">
              <EtiquetaTipo pieza={pieza} solida />
              {sala && (
                <Link to={`/museo-virtual/salas/${sala.slug}`} className="mv-producto-sala">
                  {sala.titulo}
                </Link>
              )}
              <EtiquetaDemo visible={pieza.demo} />
            </div>
            <h1 className="mv-producto-pagina-titulo">{pieza.titulo}</h1>
            {pieza.subtitulo && <p className="mv-producto-pagina-subtitulo">{pieza.subtitulo}</p>}
            {firma && <p className="mv-producto-firma mv-producto-firma--grande">{firma}</p>}

            {(descarga || pdf || pieza.enlaces.length > 0) && (
              <div className="mv-producto-acciones">
                {descarga && (
                  <a href={assetUrl(descarga)} download className="mv-boton mv-boton--primario mv-boton--ancho">
                    <Download size={18} aria-hidden="true" /> Descargar
                  </a>
                )}
                {pdf && (
                  <a href={assetUrl(pdf)} target="_blank" rel="noopener noreferrer" className="mv-boton mv-boton--ancho">
                    <FileText size={18} aria-hidden="true" /> Abrir PDF
                  </a>
                )}
                {pieza.enlaces.map((e) => (
                  <a key={e.url} href={e.url} target="_blank" rel="noopener noreferrer" className="mv-boton mv-boton--ancho">
                    {e.etiqueta || 'Enlace externo'} <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}

            <section className="mv-descripcion" aria-labelledby="descripcion-titulo">
              <h2 id="descripcion-titulo" className="mv-descripcion-titulo">Descripción</h2>
              <div className="mv-descripcion-texto">
                {parrafos(pieza.descripcion || pieza.resumen).map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>

              <h3 className="mv-descripcion-subtitulo">Créditos</h3>
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

              {pieza.etiquetas.length > 0 && (
                <ul className="mv-etiquetas" aria-label="Etiquetas">
                  {pieza.etiquetas.map((e) => (
                    <li key={e}>
                      <Link to={`/museo-virtual/archivo?q=${encodeURIComponent(e)}`}>#{e}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </article>

      <div className="mv-contenedor mv-estantes mv-estantes--ficha">
        <Carrusel titulo="También te puede interesar" piezas={relacionadas} mostrarSala />
        {sala && (
          <Carrusel titulo={`Más de ${sala.titulo}`} verTodo={`/museo-virtual/salas/${sala.slug}`} piezas={masDeSala} />
        )}
      </div>
    </div>
  );
}
