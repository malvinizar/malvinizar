import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { piezas, salas, FILTROS, TIPOS } from '../../museo/datos';
import { MuseoNav, Migas, GrillaPiezas, useMetaPagina, useScrollArriba } from '../../museo/componentes';

const normalizar = (t = '') =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const ORDENES = [
  { id: '', label: 'Recomendado' },
  { id: 'az', label: 'Título A–Z' },
  { id: 'za', label: 'Título Z–A' },
];

export default function MuseoArchivo() {
  useMetaPagina('Catálogo', 'Todas las piezas del Museo Virtual: fotografías, videos, podcasts, presentaciones, documentos e infografías.');
  useScrollArriba('archivo');
  const [params, setParams] = useSearchParams();
  const formato = params.get('formato') || '';
  const sala = params.get('sala') || '';
  const q = params.get('q') || '';
  const orden = params.get('orden') || '';

  const cambiar = (clave, valor) => {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    setParams(nuevos, { replace: true });
  };

  const resultado = useMemo(() => {
    const busqueda = normalizar(q.trim());
    const lista = piezas.filter((p) => {
      if (formato && TIPOS[p.tipo].filtro !== formato) return false;
      if (sala && p.sala !== sala) return false;
      if (busqueda) {
        const pajar = normalizar(
          [
            p.titulo,
            p.subtitulo,
            p.resumen,
            p.descripcion,
            p.procedencia,
            ...p.autores.map((a) => a.nombre),
            ...p.creditos.map((c) => c.nombre),
            ...p.etiquetas,
          ].join(' ')
        );
        if (!pajar.includes(busqueda)) return false;
      }
      return true;
    });
    if (orden === 'az') lista.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
    if (orden === 'za') lista.sort((a, b) => b.titulo.localeCompare(a.titulo, 'es'));
    return lista;
  }, [formato, sala, q, orden]);

  const contar = (fn) => piezas.filter(fn).length;
  const hayFiltros = formato || sala || q;

  return (
    <div className="mv">
      <MuseoNav />

      <div className="mv-contenedor mv-seccion-catalogo">
        <Migas items={[{ to: '/museo-virtual', label: 'Museo' }, { label: 'Catálogo' }]} />
        <h1 className="mv-pagina-titulo">{q ? `Resultados para «${q}»` : 'Catálogo'}</h1>

        <div className="mv-catalogo">
          <aside className="mv-filtros" aria-label="Filtros">
            <div className="mv-filtro-grupo">
              <h2>Formato</h2>
              <ul>
                <li>
                  <button type="button" className={!formato ? 'activo' : ''} aria-pressed={!formato} onClick={() => cambiar('formato', '')}>
                    Todos <span>{piezas.length}</span>
                  </button>
                </li>
                {FILTROS.map((f) => {
                  const total = contar((p) => TIPOS[p.tipo].filtro === f.id);
                  if (!total) return null;
                  return (
                    <li key={f.id}>
                      <button type="button" className={formato === f.id ? 'activo' : ''} aria-pressed={formato === f.id} onClick={() => cambiar('formato', formato === f.id ? '' : f.id)}>
                        {f.label} <span>{total}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mv-filtro-grupo">
              <h2>Sala</h2>
              <ul>
                <li>
                  <button type="button" className={!sala ? 'activo' : ''} aria-pressed={!sala} onClick={() => cambiar('sala', '')}>
                    Todas <span>{piezas.length}</span>
                  </button>
                </li>
                {salas.map((s) => (
                  <li key={s.slug}>
                    <button type="button" className={sala === s.slug ? 'activo' : ''} aria-pressed={sala === s.slug} onClick={() => cambiar('sala', sala === s.slug ? '' : s.slug)}>
                      {s.titulo} <span>{contar((p) => p.sala === s.slug)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="mv-catalogo-resultados">
            <div className="mv-catalogo-barra">
              <label className="mv-campo mv-campo--busqueda">
                <span className="mv-solo-lectores">Buscar en el catálogo</span>
                <Search size={17} aria-hidden="true" />
                <input type="search" placeholder="Buscar por título, autor o tema" value={q} onChange={(e) => cambiar('q', e.target.value)} />
              </label>
              <label className="mv-campo mv-campo--orden">
                <span>Ordenar</span>
                <select value={orden} onChange={(e) => cambiar('orden', e.target.value)}>
                  {ORDENES.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mv-catalogo-estado">
              <p className="mv-resultados" aria-live="polite">
                {resultado.length} {resultado.length === 1 ? 'pieza' : 'piezas'}
              </p>
              {hayFiltros && (
                <button type="button" className="mv-limpiar" onClick={() => setParams(orden ? { orden } : {}, { replace: true })}>
                  <X size={15} aria-hidden="true" /> Limpiar filtros
                </button>
              )}
            </div>

            {resultado.length > 0 ? (
              <GrillaPiezas piezas={resultado} />
            ) : (
              <p className="mv-vacio">No hay piezas que coincidan con estos filtros.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
