import { Link, useParams } from 'react-router-dom';
import { getSala, salas, piezasDeSala, portadaDeSala, parrafos } from '../../museo/datos';
import {
  MuseoNav,
  Migas,
  Img,
  GrillaPiezas,
  EtiquetaDemo,
  useMetaPagina,
  useScrollArriba,
} from '../../museo/componentes';
import NoEncontrado from './NoEncontrado';

export default function MuseoSala() {
  const { slug } = useParams();
  const sala = getSala(slug);
  useMetaPagina(sala?.titulo, sala?.descripcion);
  useScrollArriba(slug);

  if (!sala) return <NoEncontrado que="sala" />;

  const lista = piezasDeSala(sala.slug);

  return (
    <div className="mv">
      <MuseoNav />

      <header className="mv-banner">
        <div className="mv-banner-imagen" aria-hidden="true">
          <Img src={portadaDeSala(sala)} alt="" prioridad />
        </div>
        <div className="mv-contenedor mv-banner-texto">
          <Migas items={[{ to: '/museo-virtual', label: 'Museo' }, { label: sala.titulo }]} />
          <p className="mv-banner-sobre">
            {sala.tipo === 'temporal' ? 'Exposición temporal' : 'Sala'}
            {sala.periodo && ` · ${sala.periodo}`}
          </p>
          <h1 className="mv-banner-titulo">{sala.titulo}</h1>
          {parrafos(sala.descripcion).map((p, k) => (
            <p key={k} className="mv-banner-desc">{p}</p>
          ))}
          <EtiquetaDemo visible={sala.demo} />
        </div>
      </header>

      <section className="mv-contenedor mv-seccion-catalogo">
        <div className="mv-catalogo-barra">
          <p className="mv-resultados">
            {lista.length} {lista.length === 1 ? 'pieza' : 'piezas'}
          </p>
          <nav className="mv-salas-chips" aria-label="Otras salas">
            {salas.map((s) => (
              <Link key={s.slug} to={`/museo-virtual/salas/${s.slug}`} className={s.slug === sala.slug ? 'activo' : ''} aria-current={s.slug === sala.slug ? 'page' : undefined}>
                {s.titulo}
              </Link>
            ))}
          </nav>
        </div>
        {lista.length > 0 ? (
          <GrillaPiezas piezas={lista} mostrarSala={false} />
        ) : (
          <p className="mv-vacio">Esta sala todavía no tiene piezas publicadas.</p>
        )}
      </section>
    </div>
  );
}
