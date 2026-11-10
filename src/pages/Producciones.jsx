import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { piezas, salas, FILTROS, TIPOS, config } from '../producciones/datos';
import { GrillaPiezas, useMetaPagina } from '../producciones/componentes';

const normalizar = (t = '') => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const iconoDeFiltro = (id) => Object.values(TIPOS).find((t) => t.filtro === id)?.icon;

export default function Producciones() {
  useMetaPagina('Producciones de estudiantes', config.descripcion);
  const [params, setParams] = useSearchParams();
  const formato = params.get('formato') || '';
  const eje = params.get('eje') || '';
  const q = params.get('q') || '';

  const cambiar = (clave, valor) => {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    setParams(nuevos, { replace: true });
  };

  const resultado = useMemo(() => {
    const busqueda = normalizar(q.trim());
    return piezas.filter((p) => {
      if (formato && TIPOS[p.tipo].filtro !== formato) return false;
      if (eje && p.sala !== eje) return false;
      if (busqueda) {
        const pajar = normalizar(
          [
            p.titulo,
            p.subtitulo,
            p.resumen,
            p.descripcion,
            p.materia,
            p.docente,
            p.anio,
            ...p.autores.map((a) => a.nombre),
            ...p.creditos.map((c) => c.nombre),
            ...p.etiquetas,
          ].join(' ')
        );
        if (!pajar.includes(busqueda)) return false;
      }
      return true;
    });
  }, [formato, eje, q]);

  const formatos = FILTROS.filter((f) => piezas.some((p) => TIPOS[p.tipo].filtro === f.id));
  const hayFiltros = formato || eje || q;

  return (
    <>
      <section className="cabecera-pagina">
        <div className="contenedor">
          <p className="etiqueta-seccion">Hechas en la UNPILAR</p>
          <h1 className="titulo titulo--xl">{config.nombre}</h1>
          <p className="bajada">{config.descripcion}</p>
        </div>
      </section>

      <section className="seccion seccion--pegada">
        <div className="contenedor">
          <div className="filtros">
            <label className="buscador">
              <span className="solo-lectores">Buscar producciones</span>
              <Search size={20} aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar por título, autor/a, materia o tema"
                value={q}
                onChange={(e) => cambiar('q', e.target.value)}
              />
            </label>

            <div className="chips" role="group" aria-label="Formato">
              <span className="chips-etiqueta">Formato</span>
              <button type="button" className={`chip ${!formato ? 'activo' : ''}`} aria-pressed={!formato} onClick={() => cambiar('formato', '')}>
                Todos
              </button>
              {formatos.map((f) => {
                const Icon = iconoDeFiltro(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`chip ${formato === f.id ? 'activo' : ''}`}
                    aria-pressed={formato === f.id}
                    onClick={() => cambiar('formato', formato === f.id ? '' : f.id)}
                  >
                    {Icon && <Icon size={16} aria-hidden="true" />} {f.label}
                  </button>
                );
              })}
            </div>

            <div className="chips" role="group" aria-label="Eje temático">
              <span className="chips-etiqueta">Tema</span>
              {salas.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  className={`chip ${eje === s.slug ? 'activo' : ''}`}
                  aria-pressed={eje === s.slug}
                  onClick={() => cambiar('eje', eje === s.slug ? '' : s.slug)}
                >
                  {s.titulo}
                </button>
              ))}
            </div>

            <div className="filtros-estado">
              <p aria-live="polite">
                {resultado.length} {resultado.length === 1 ? 'producción' : 'producciones'}
              </p>
              {hayFiltros && (
                <button type="button" className="limpiar" onClick={() => setParams({}, { replace: true })}>
                  <X size={15} aria-hidden="true" /> Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {resultado.length > 0 ? (
            <GrillaPiezas piezas={resultado} />
          ) : (
            <p className="vacio">No hay producciones que coincidan con la búsqueda.</p>
          )}
        </div>
      </section>
    </>
  );
}
