import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Trophy, ExternalLink, ArrowRight } from 'lucide-react';
import { GAME_URL, RANKING_URL } from '../config/site';
import { getPieza } from '../producciones/datos';
import { useMetaPagina } from '../producciones/componentes';
import {
  Cinta,
  Logotipo,
  LogoUnpilar,
  SolDeMayo,
  FondoSol,
  CATEGORIAS_JUEGO,
  MedallonCategoria,
} from '../components/marca/Marca';

const PASOS = [
  { n: 1, titulo: 'Girá la ruleta', texto: 'Tocá el Sol de Mayo y mirá en qué categoría cae.' },
  { n: 2, titulo: 'Respondé', texto: 'Elegí una de las cuatro opciones. Después ves la explicación y la fuente de cada respuesta.' },
  { n: 3, titulo: 'Sumá puntos', texto: 'Las preguntas más difíciles valen más y las rachas multiplican tu puntaje.' },
  { n: 4, titulo: 'Llená el Malvinómetro', texto: 'Cada acierto lo hace subir. ¿Hasta qué nivel llegás?' },
];

const NIVELES = ['Aprendiz', 'Conocedor', 'Memorioso', 'Guardián de la Memoria', 'Malvinizador'];

const PUNTOS = [
  { dificultad: 'Fácil', puntos: 100 },
  { dificultad: 'Media', puntos: 200 },
  { dificultad: 'Difícil', puntos: 300 },
  { dificultad: 'Experto', puntos: 500 },
];

/** Pantalla del juego dentro de la página: se carga recién al tocar «Jugar acá». */
function PantallaJuego() {
  const [jugando, setJugando] = useState(false);
  return (
    <div className="pantalla-juego">
      <div className="pantalla-juego-marco">
        {jugando ? (
          <iframe src={GAME_URL} title="MalvinizAR · La trivia de Malvinas" allow="fullscreen; autoplay" allowFullScreen />
        ) : (
          <button type="button" className="pantalla-juego-portada" onClick={() => setJugando(true)}>
            <SolDeMayo className="pantalla-juego-sol" />
            <Logotipo tamano="md" />
            <Cinta as="span" className="pantalla-juego-cinta">La trivia de Malvinas</Cinta>
            <span className="btn3d btn3d--verde pantalla-juego-boton">
              <Play size={18} fill="currentColor" aria-hidden="true" /> Jugar acá
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function Juego() {
  useMetaPagina('El juego', 'MalvinizAR · La trivia de Malvinas: girá la ruleta, respondé y llená el Malvinómetro.');
  const pieza = getPieza('trivia-malvinizar');
  const equipo = pieza?.autores.map((a) => a.nombre) || [];

  return (
    <div className="tema-juego">
      <FondoSol />
      <section className="juego-portada">
        <div className="contenedor juego-portada-grid">
          <div className="juego-portada-texto">
            <div className="juego-logo">
              <SolDeMayo className="juego-logo-sol" />
              <Logotipo tamano="xl" as="h1" />
              <Cinta as="p" className="juego-logo-cinta">La trivia de Malvinas</Cinta>
            </div>
            <p className="juego-bajada">
              Un juego de preguntas para aprender sobre Malvinas con la dinámica de una ruleta: historia, música, cine y
              fútbol, en partidas de 10 preguntas.
            </p>
            <div className="juego-acciones">
              <a href={GAME_URL} target="_blank" rel="noopener noreferrer" className="btn3d btn3d--xl btn3d--pulso">
                <Play size={26} fill="currentColor" aria-hidden="true" /> ¡Jugar!
              </a>
              <a href={RANKING_URL} target="_blank" rel="noopener noreferrer" className="btn3d btn3d--lg btn3d--celeste">
                <Trophy size={20} aria-hidden="true" /> Ranking
              </a>
            </div>
            <p className="juego-nota">
              Se abre en una pestaña nueva. Funciona en el celular y en la computadora.
            </p>
          </div>
          <PantallaJuego />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor juego-grid">
          <article className="tarjeta-crema juego-que-es">
            <Cinta as="h2" className="tarjeta-crema-cinta">¿De qué se trata?</Cinta>
            <p>
              <strong>MalvinizAR · La trivia de Malvinas</strong> es un juego educativo pensado para estudiantes de la
              escuela secundaria. Toma la dinámica de los juegos de preguntas por categorías y la pone al servicio de la
              memoria: cada respuesta viene con una explicación breve y la fuente de donde sale el dato.
            </p>
            <p>
              Lo desarrollaron estudiantes de la carrera de Comunicación Digital de la Universidad Nacional de Pilar como
              parte de sus prácticas profesionalizantes.
            </p>
            <ul className="juego-categorias" aria-label="Categorías">
              {CATEGORIAS_JUEGO.map((c) => (
                <li key={c.id}><MedallonCategoria categoria={c} /></li>
              ))}
            </ul>
          </article>

          <article className="tarjeta-crema juego-como">
            <Cinta as="h2" className="tarjeta-crema-cinta">¿Cómo se juega?</Cinta>
            <ol className="pasos">
              {PASOS.map((p) => (
                <li key={p.n}>
                  <span className="pasos-numero" aria-hidden="true">{p.n}</span>
                  <span>
                    <strong>{p.titulo}</strong>
                    <span>{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="seccion seccion--suave">
        <div className="contenedor juego-grid">
          <article className="panel-juego">
            <h2 className="titulo-juego titulo-juego--md">El Malvinómetro</h2>
            <p>Cada acierto lo hace subir. Según hasta dónde llegues, terminás la partida con uno de estos niveles:</p>
            <ol className="malvinometro">
              {NIVELES.map((n, i) => (
                <li key={n} style={{ '--nivel': i }}>
                  <span>{n}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="panel-juego">
            <h2 className="titulo-juego titulo-juego--md">Puntaje y rachas</h2>
            <dl className="puntos">
              {PUNTOS.map((p) => (
                <div key={p.dificultad}>
                  <dt>{p.dificultad}</dt>
                  <dd>{p.puntos} pts</dd>
                </div>
              ))}
            </dl>
            <p className="puntos-racha">
              <strong>3 aciertos seguidos:</strong> ×1,5 · <strong>5 o más:</strong> ×2
            </p>
            <p>
              Al terminar podés guardar tu puntaje en el <strong>ranking</strong> y filtrarlo por escuela para comparar con
              tu curso.
            </p>
          </article>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor creditos-juego">
          <div>
            <p className="sobretitulo-juego">Equipo</p>
            <p className="creditos-juego-nombres">{equipo.join(' · ')}</p>
            <p>Comunicación Digital · Universidad Nacional de Pilar · 2026</p>
          </div>
          <LogoUnpilar variante="blanco" />
          <div className="creditos-juego-enlaces">
            <Link to="/producciones/trivia-malvinizar" className="enlace-juego">
              Ficha de la producción <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={GAME_URL} target="_blank" rel="noopener noreferrer" className="enlace-juego">
              Abrir el juego <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
