import { Link } from 'react-router-dom';
import { config, salas, piezas, piezasDeSala, FILTROS, TIPOS } from '../../museo/datos';
import {
  MuseoNav,
  SliderDestacados,
  Carrusel,
  useMetaPagina,
  useScrollArriba,
} from '../../museo/componentes';

/** Íconos de cada categoría: se toman del primer tipo que pertenece al filtro. */
const iconoDeFiltro = (id) => Object.values(TIPOS).find((t) => t.filtro === id)?.icon;

export default function MuseoInicio() {
  useMetaPagina('', config.descripcion);
  useScrollArriba('inicio');

  const destacadas = piezas.filter((p) => p.destacada && !p.demo);
  const categorias = FILTROS.map((f) => ({
    ...f,
    icon: iconoDeFiltro(f.id),
    total: piezas.filter((p) => TIPOS[p.tipo].filtro === f.id).length,
  })).filter((f) => f.total > 0);

  return (
    <div className="mv">
      <MuseoNav />

      <SliderDestacados piezas={destacadas.length ? destacadas : piezas.slice(0, 5)} />

      {/* Categorías */}
      <section className="mv-categorias" aria-label="Explorar por formato">
        <div className="mv-contenedor">
          <ul className="mv-categorias-lista">
            {categorias.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.id}>
                  <Link to={`/museo-virtual/archivo?formato=${c.id}`} className="mv-categoria">
                    <span className="mv-categoria-icono">{Icon && <Icon size={22} strokeWidth={1.6} aria-hidden="true" />}</span>
                    <span className="mv-categoria-nombre">{c.label}</span>
                    <span className="mv-categoria-total">{c.total} {c.total === 1 ? 'pieza' : 'piezas'}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Una estantería por sala */}
      <div className="mv-contenedor mv-estantes">
        {salas.map((s) => (
          <Carrusel
            key={s.slug}
            titulo={s.titulo}
            bajada={s.bajada}
            verTodo={`/museo-virtual/salas/${s.slug}`}
            piezas={piezasDeSala(s.slug)}
          />
        ))}
      </div>
    </div>
  );
}
