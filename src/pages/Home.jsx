import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import inicio from '../content/inicio.json';
import { piezas, assetUrl } from '../producciones/datos';
import { GrillaPiezas, useMetaPagina } from '../producciones/componentes';
import { Cinta, Logotipo, LogoUnpilar, SolDeMayo, CATEGORIAS_JUEGO, MedallonCategoria } from '../components/marca/Marca';

/** Portada: fotos reales de estudiantes que se alternan, con el texto fijo encima. */
function SliderPortada({ fotos, intervalo = 6500 }) {
  const [actual, setActual] = useState(0);
  const [pausa, setPausa] = useState(false);
  const toque = useRef(null);
  const total = fotos.length;

  useEffect(() => {
    const reducir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (pausa || total < 2 || reducir) return undefined;
    const t = setTimeout(() => setActual((i) => (i + 1) % total), intervalo);
    return () => clearTimeout(t);
  }, [actual, pausa, total, intervalo]);

  const ir = (i) => setActual((i + total) % total);

  return (
    <section
      className="portada"
      aria-roledescription="carrusel"
      aria-label="Fotos de estudiantes de la UNPILAR"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current === null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
        toque.current = null;
      }}
    >
      <div className="portada-fotos">
        {fotos.map((f, i) => (
          <img
            key={f.imagen}
            src={assetUrl(f.imagen)}
            alt={i === actual ? f.alt : ''}
            aria-hidden={i !== actual}
            className={`portada-foto ${i === actual ? 'activa' : ''}`}
            style={{ objectPosition: f.foco || '50% 50%' }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <div className="contenedor portada-contenido">
        <div className="portada-texto">
          <p className="portada-etiqueta">Producciones de estudiantes · UNPILAR</p>
          <h1 className="titulo titulo--xl">{inicio.titulo}</h1>
          <p className="portada-bajada">{inicio.texto}</p>
          <div className="portada-acciones">
            <Link to="/juego" className="btn btn--lg btn--blanco">
              <Play size={18} fill="currentColor" aria-hidden="true" /> El juego
            </Link>
            <Link to="/producciones" className="btn btn--lg btn--transparente">
              Ver producciones
            </Link>
          </div>
        </div>
      </div>

      <div className="contenedor portada-pie">
        <p className="portada-epigrafe" aria-live="polite">{fotos[actual]?.pie}</p>
        {total > 1 && (
          <div className="portada-puntos">
            {fotos.map((f, i) => (
              <button
                key={f.imagen}
                type="button"
                className={i === actual ? 'activo' : ''}
                onClick={() => ir(i)}
                aria-label={`Ver foto ${i + 1} de ${total}`}
                aria-current={i === actual}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  useMetaPagina('', inicio.texto);
  const destacadas = piezas.filter((p) => p.destacada && p.tipo !== 'juego').slice(0, 4);
  const collage = piezas.filter((p) => p.imagen && p.tipo !== 'juego').slice(0, 3);

  return (
    <>
      <SliderPortada fotos={inicio.fotos} />

      {/* Accesos directos */}
      <section className="seccion accesos" aria-label="Accesos directos">
        <div className="contenedor accesos-grid">
          <Link to="/juego" className="acceso acceso--juego tema-juego">
            <div className="acceso-juego-logo">
              <SolDeMayo className="acceso-juego-sol" />
              <Logotipo tamano="lg" />
              <Cinta as="span" className="acceso-juego-cinta">La trivia de Malvinas</Cinta>
            </div>
            <ul className="acceso-medallones" aria-label="Categorías del juego">
              {CATEGORIAS_JUEGO.map((c) => (
                <li key={c.id}><MedallonCategoria categoria={c} /></li>
              ))}
            </ul>
            <div className="acceso-texto">
              <h2>El juego</h2>
              <p>Girá la ruleta, respondé preguntas sobre Malvinas y llená el Malvinómetro.</p>
              <span className="btn3d">Cómo se juega <ArrowRight size={18} aria-hidden="true" /></span>
            </div>
          </Link>

          <Link to="/producciones" className="acceso acceso--producciones">
            <div className="acceso-collage" aria-hidden="true">
              {collage.map((p) => (
                <img key={p.slug} src={assetUrl(p.imagen)} alt="" loading="lazy" />
              ))}
            </div>
            <div className="acceso-texto">
              <h2>Producciones</h2>
              <p>
                {piezas.length} trabajos sobre Malvinas hechos en la UNPILAR: podcasts, videos, infografías,
                presentaciones y más.
              </p>
              <span className="btn">Ver producciones <ArrowRight size={18} aria-hidden="true" /></span>
            </div>
          </Link>
        </div>
      </section>

      {/* Algunas producciones */}
      <section className="seccion seccion--gris">
        <div className="contenedor">
          <header className="cabecera-seccion">
            <div>
              <p className="etiqueta-seccion">Producciones</p>
              <h2 className="titulo titulo--lg">Destacadas</h2>
            </div>
            <Link to="/producciones" className="enlace-flecha">
              Ver todas <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </header>
          <GrillaPiezas piezas={destacadas} />
        </div>
      </section>

      {/* Historia, como acceso secundario */}
      <section className="seccion">
        <div className="contenedor">
          <div className="banda">
            <div>
              <p className="etiqueta-seccion">Historia</p>
              <h2 className="titulo titulo--md">De 1764 a hoy, hito por hito</h2>
              <p>Una cronología breve de la cuestión Malvinas. Cada hito te lleva a las producciones que lo trabajan.</p>
            </div>
            <Link to="/historia" className="btn btn--blanco">Ver la cronología</Link>
          </div>
        </div>
      </section>

      <section className="seccion seccion--pegada" aria-label="Universidad Nacional de Pilar">
        <div className="contenedor unpilar-banda">
          <p>Una iniciativa de estudiantes de Comunicación Digital de la</p>
          <LogoUnpilar />
        </div>
      </section>
    </>
  );
}
