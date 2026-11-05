import { Link, useParams } from 'react-router-dom';
import { getSala, salas, piezasDeSala, portadaDeSala, assetUrl } from '../../museo/datos';
import { MuseoNav, GrillaPiezas, useMetaPagina, useScrollArriba } from '../../museo/componentes';
import NoEncontrado from './NoEncontrado';

export default function MuseoSala() {
  const { slug } = useParams();
  const sala = getSala(slug);
  useMetaPagina(sala?.titulo, sala?.descripcion);
  useScrollArriba(slug);

  if (!sala) return <NoEncontrado que="sala" />;

  const lista = piezasDeSala(sala.slug);
  const portada = portadaDeSala(sala);

  return (
    <div className="mv">
      <MuseoNav />

      <header className="mv-banner">
        {portada && <img className="mv-banner-fondo" src={assetUrl(portada)} alt="" aria-hidden="true" />}
        <div className="mv-contenedor mv-banner-texto">
          <p className="mv-banner-sobre">
            {sala.tipo === 'temporal' ? 'Exposición temporal' : 'Sala'} · {lista.length} {lista.length === 1 ? 'pieza' : 'piezas'}
          </p>
          <h1 className="mv-banner-titulo">{sala.titulo}</h1>
          {sala.bajada && <p className="mv-banner-desc">{sala.bajada}</p>}
          {sala.demo && <span className="mv-demo-tag">Demo</span>}
        </div>
      </header>

      <nav className="mv-contenedor mv-chips mv-chips--salas" aria-label="Salas">
        {salas.map((s) => (
          <Link key={s.slug} to={`/museo-virtual/salas/${s.slug}`} className={`mv-chip ${s.slug === sala.slug ? 'activo' : ''}`} aria-current={s.slug === sala.slug ? 'page' : undefined}>
            {s.titulo}
          </Link>
        ))}
      </nav>

      <section className="mv-contenedor mv-seccion">
        {lista.length > 0 ? <GrillaPiezas piezas={lista} /> : <p className="mv-vacio">Esta sala todavía no tiene piezas publicadas.</p>}
      </section>
    </div>
  );
}
