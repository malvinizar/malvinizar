import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';
import { historiaData } from '../data/historiaData';
import { produccionesDeHito } from '../producciones/datos';
import { GrillaPiezas, useMetaPagina } from '../producciones/componentes';

const ETAPAS = [
  { id: 'todos', label: 'Todos los hitos' },
  { id: 'antecedentes', label: 'Antecedentes' },
  { id: 'diplomacia', label: 'Diplomacia y ONU' },
  { id: 'conflicto', label: 'Conflicto de 1982' },
  { id: 'memoria', label: 'Memoria y democracia' },
  { id: 'soberania', label: 'Soberanía actual' },
];

function Hito({ hito, abierto, onAlternar }) {
  const producciones = produccionesDeHito(hito);
  return (
    <li className={`hito ${abierto ? 'abierto' : ''}`} id={`hito-${hito.id}`}>
      <div className="hito-marca" aria-hidden="true">
        <span />
      </div>
      <div className="hito-tarjeta panel">
        <div className="hito-cabecera">
          <img src={`${import.meta.env.BASE_URL}${hito.image}`} alt={hito.imageAlt} loading="lazy" className="hito-imagen" />
          <div>
            <p className="hito-anio">{hito.year}</p>
            <h2 className="hito-titulo">{hito.title}</h2>
            <p className="hito-etapa">{hito.categoriaLabel}</p>
            <p className="hito-resumen">{hito.resumen}</p>
          </div>
        </div>

        <button
          type="button"
          className="hito-mas"
          onClick={onAlternar}
          aria-expanded={abierto}
          aria-controls={`hito-detalle-${hito.id}`}
        >
          {abierto ? 'Ver menos' : 'Contexto, qué ocurrió y por qué importa'}
          <ChevronDown size={18} aria-hidden="true" />
        </button>

        {abierto && (
          <div className="hito-detalle" id={`hito-detalle-${hito.id}`}>
            <div>
              <h3>Contexto</h3>
              <p>{hito.contexto}</p>
            </div>
            <div>
              <h3>Qué ocurrió</h3>
              <p>{hito.queOcurrio}</p>
            </div>
            <div>
              <h3>Por qué es importante</h3>
              <p>{hito.porQueImportante}</p>
            </div>
            {hito.fuente && (
              <p className="hito-fuente">
                Fuente: {hito.fuente.institucion} — {hito.fuente.descripcion}.{' '}
                {hito.fuente.url && (
                  <a href={hito.fuente.url} target="_blank" rel="noopener noreferrer">
                    Ver fuente <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
              </p>
            )}
          </div>
        )}

        {producciones.length > 0 && (
          <div className="hito-producciones">
            <h3>Producciones sobre este tema</h3>
            <GrillaPiezas piezas={producciones} compacta />
          </div>
        )}
      </div>
    </li>
  );
}

export default function Historia() {
  useMetaPagina('Historia', 'Cronología de la cuestión Malvinas, con las producciones de estudiantes de la UNPILAR que trabajan cada hito.');
  const [params, setParams] = useSearchParams();
  const hitoParam = params.get('hito') || '';
  const etapa = params.get('etapa') || 'todos';
  const [abiertos, setAbiertos] = useState(() => (hitoParam ? { [hitoParam]: true } : {}));

  // Si se llega desde una producción (?hito=09), se abre ese hito y se lo muestra.
  useEffect(() => {
    if (!hitoParam) return;
    setAbiertos((a) => ({ ...a, [hitoParam]: true }));
    const t = setTimeout(() => {
      document.getElementById(`hito-${hitoParam}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => clearTimeout(t);
  }, [hitoParam]);

  const visibles = historiaData.filter(
    (h) => etapa === 'todos' || h.categoria === etapa || h.categoriaSecundaria === etapa
  );

  const elegirEtapa = (id) => {
    const nuevos = new URLSearchParams();
    if (id !== 'todos') nuevos.set('etapa', id);
    setParams(nuevos, { replace: true });
  };

  return (
    <>
      <section className="cabecera-pagina">
        <div className="contenedor">
          <p className="etiqueta-seccion">Cronología</p>
          <h1 className="titulo titulo--xl">Historia de Malvinas</h1>
          <p className="bajada">
            Catorce hitos, desde los primeros asentamientos hasta hoy. Cada uno enlaza las producciones de estudiantes
            que trabajan ese tema.
          </p>
        </div>
      </section>

      <section className="seccion seccion--gris">
        <div className="contenedor contenedor--medio">
          <div className="chips chips--centradas" role="group" aria-label="Etapas">
            {ETAPAS.map((e) => (
              <button
                key={e.id}
                type="button"
                className={`chip ${etapa === e.id ? 'activo' : ''}`}
                aria-pressed={etapa === e.id}
                onClick={() => elegirEtapa(e.id)}
              >
                {e.label}
              </button>
            ))}
          </div>

          <ol className="linea-tiempo">
            {visibles.map((h) => (
              <Hito
                key={h.id}
                hito={h}
                abierto={!!abiertos[h.id]}
                onAlternar={() => setAbiertos((a) => ({ ...a, [h.id]: !a[h.id] }))}
              />
            ))}
          </ol>

          <div className="banda historia-cierre">
            <div>
              <p className="etiqueta-seccion">El juego</p>
              <h2 className="titulo titulo--md">¿Querés poner a prueba lo que sabés?</h2>
            </div>
            <Link to="/juego" className="btn btn--blanco">
              Ir al juego <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
