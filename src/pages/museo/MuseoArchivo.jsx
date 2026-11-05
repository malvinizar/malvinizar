import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { piezas, salas, FILTROS, TIPOS } from '../../museo/datos';
import { MuseoNav, GrillaPiezas, useMetaPagina, useScrollArriba } from '../../museo/componentes';

const normalizar = (t = '') =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const iconoDeFiltro = (id) => Object.values(TIPOS).find((t) => t.filtro === id)?.icon;

export default function MuseoArchivo() {
  useMetaPagina('Catálogo', 'Todas las piezas del Museo Virtual: fotografías, videos, podcasts, presentaciones, documentos e infografías.');
  useScrollArriba('archivo');
  const [params, setParams] = useSearchParams();
  const formato = params.get('formato') || '';
  const sala = params.get('sala') || '';
  const q = params.get('q') || '';
  const campo = useRef(null);

  // Desde la lupa del celular se llega con ?buscar=1: el cursor va directo al buscador.
  useEffect(() => {
    if (params.get('buscar')) campo.current?.focus();
  }, [params]);

  const cambiar = (clave, valor) => {
    const nuevos = new URLSearchParams(params);
    nuevos.delete('buscar');
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    setParams(nuevos, { replace: true });
  };

  const resultado = useMemo(() => {
    const busqueda = normalizar(q.trim());
    return piezas.filter((p) => {
      if (formato && TIPOS[p.tipo].filtro !== formato) return false;
      if (sala && p.sala !== sala) return false;
      if (busqueda) {
        const pajar = normalizar(
          [p.titulo, p.subtitulo, p.resumen, p.descripcion, p.procedencia, ...p.autores.map((a) => a.nombre), ...p.creditos.map((c) => c.nombre), ...p.etiquetas].join(' ')
        );
        if (!pajar.includes(busqueda)) return false;
      }
      return true;
    });
  }, [formato, sala, q]);

  const formatos = FILTROS.filter((f) => piezas.some((p) => TIPOS[p.tipo].filtro === f.id));
  const hayFiltros = formato || sala || q;

  return (
    <div className="mv">
      <MuseoNav />

      <div className="mv-contenedor mv-seccion mv-catalogo">
        <label className="mv-buscador">
          <span className="mv-solo-lectores">Buscar en el catálogo</span>
          <Search size={20} aria-hidden="true" />
          <input ref={campo} type="search" placeholder="Buscar por título, autor o tema" value={q} onChange={(e) => cambiar('q', e.target.value)} />
        </label>

        <div className="mv-chips mv-chips--filtro" role="group" aria-label="Formato">
          <button type="button" className={`mv-chip ${!formato ? 'activo' : ''}`} aria-pressed={!formato} onClick={() => cambiar('formato', '')}>
            Todo
          </button>
          {formatos.map((f) => {
            const Icon = iconoDeFiltro(f.id);
            return (
              <button key={f.id} type="button" className={`mv-chip ${formato === f.id ? 'activo' : ''}`} aria-pressed={formato === f.id} onClick={() => cambiar('formato', formato === f.id ? '' : f.id)}>
                {Icon && <Icon size={16} aria-hidden="true" />} {f.label}
              </button>
            );
          })}
        </div>

        <div className="mv-chips mv-chips--filtro" role="group" aria-label="Sala">
          {salas.map((s) => (
            <button key={s.slug} type="button" className={`mv-chip mv-chip--borde ${sala === s.slug ? 'activo' : ''}`} aria-pressed={sala === s.slug} onClick={() => cambiar('sala', sala === s.slug ? '' : s.slug)}>
              {s.titulo}
            </button>
          ))}
        </div>

        <div className="mv-catalogo-estado">
          <p className="mv-resultados" aria-live="polite">
            {resultado.length} {resultado.length === 1 ? 'pieza' : 'piezas'}
          </p>
          {hayFiltros && (
            <button type="button" className="mv-limpiar" onClick={() => setParams({}, { replace: true })}>
              <X size={15} aria-hidden="true" /> Limpiar
            </button>
          )}
        </div>

        {resultado.length > 0 ? <GrillaPiezas piezas={resultado} /> : <p className="mv-vacio">No hay piezas que coincidan.</p>}
      </div>
    </div>
  );
}
