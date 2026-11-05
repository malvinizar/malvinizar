import { Link } from 'react-router-dom';
import { config, salas, piezas, piezasDeSala, FILTROS, TIPOS } from '../../museo/datos';
import { MuseoNav, SliderDestacados, Carrusel, useMetaPagina, useScrollArriba } from '../../museo/componentes';

const iconoDeFiltro = (id) => Object.values(TIPOS).find((t) => t.filtro === id)?.icon;

export default function MuseoInicio() {
  useMetaPagina('', config.descripcion);
  useScrollArriba('inicio');

  const destacadas = piezas.filter((p) => p.destacada && !p.demo);
  const formatos = FILTROS.filter((f) => piezas.some((p) => TIPOS[p.tipo].filtro === f.id));

  return (
    <div className="mv">
      <MuseoNav />
      <SliderDestacados piezas={destacadas.length ? destacadas : piezas.slice(0, 5)} />

      <nav className="mv-contenedor mv-chips" aria-label="Explorar por formato">
        {formatos.map((f) => {
          const Icon = iconoDeFiltro(f.id);
          return (
            <Link key={f.id} to={`/museo-virtual/archivo?formato=${f.id}`} className="mv-chip">
              {Icon && <Icon size={16} aria-hidden="true" />} {f.label}
            </Link>
          );
        })}
      </nav>

      <div className="mv-filas">
        {salas.map((s) => (
          <Carrusel key={s.slug} titulo={s.titulo} verTodo={`/museo-virtual/salas/${s.slug}`} piezas={piezasDeSala(s.slug)} />
        ))}
      </div>
    </div>
  );
}
