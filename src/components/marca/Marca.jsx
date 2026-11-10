/**
 * Piezas de identidad compartidas con el juego (malvinizar/malvinizados):
 * Sol de Mayo, logotipo con la tipografía de MalvinizAR, cinta celeste y blanca
 * y logo de la Universidad Nacional de Pilar.
 */
import { useId } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/juego.css';

const RAYOS = 32;
const RAYO_RECTO = 'M-3.4,-25 L0,-58 L3.4,-25 Z';
const RAYO_FLAMIGERO =
  'M-2.6,-25 Q-6.2,-31 -1.8,-37 Q3.2,-43 -0.9,-51 L0.9,-51 Q5.6,-43 1.6,-37 Q-2.4,-31 2.6,-25 Z';

/** Sol de Mayo: 32 rayos que alternan rectos y flamígeros (mismo dibujo que el juego). */
export function SolDeMayo({ className = '', conCara = true }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`sol-${id}`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#ffe9a0" />
          <stop offset="55%" stopColor="#f5b921" />
          <stop offset="100%" stopColor="#d48c0c" />
        </radialGradient>
        <radialGradient id={`cara-${id}`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff1b8" />
          <stop offset="100%" stopColor="#f2b01c" />
        </radialGradient>
      </defs>
      <g fill={`url(#sol-${id})`} stroke="#b06e05" strokeWidth="0.9" strokeLinejoin="round">
        {Array.from({ length: RAYOS }, (_, i) => (
          <path key={i} d={i % 2 === 0 ? RAYO_RECTO : RAYO_FLAMIGERO} transform={`rotate(${(i * 360) / RAYOS})`} />
        ))}
      </g>
      <circle r="24" fill={`url(#cara-${id})`} stroke="#b06e05" strokeWidth="2" />
      {conCara && (
        <g fill="none" stroke="#9a5d04" strokeWidth="1.8" strokeLinecap="round">
          <path d="M-13,-9 Q-8,-13 -3,-9" />
          <path d="M3,-9 Q8,-13 13,-9" />
          <path d="M-12,-4 Q-8,-1 -4,-4" />
          <path d="M4,-4 Q8,-1 12,-4" />
          <path d="M0,-6 L-2,5 Q0,7 2,5" />
          <path d="M-7,11 Q0,16 7,11" />
        </g>
      )}
    </svg>
  );
}

/** Palabra MalvinizAR con la tipografía y el contorno del juego. */
export function Logotipo({ tamano = 'md', className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`logotipo logotipo--${tamano} ${className}`}>
      Malviniz<span className="logotipo-ar">AR</span>
    </Tag>
  );
}

/** Logo compacto para el encabezado: sol + palabra. */
export function LogoEncabezado({ onClick }) {
  return (
    <Link to="/" className="logo-encabezado" onClick={onClick} aria-label="MalvinizAR — Inicio">
      <SolDeMayo className="logo-encabezado-sol" conCara={false} />
      <Logotipo tamano="sm" />
    </Link>
  );
}

/** Cinta de título celeste y blanca (o dorada) con puntas plegadas. */
export function Cinta({ children, tono = 'celeste', as: Tag = 'span', className = '' }) {
  const c =
    tono === 'dorada'
      ? { cola: '#c47f08', pliegue: '#8f5b05', borde: '#f5b921', banda: '#fff4cc' }
      : { cola: '#3b8fc4', pliegue: '#2a6a96', borde: '#7ec8f0', banda: '#ffffff' };
  return (
    <div className={`cinta cinta--${tono} ${className}`}>
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 20 H38 V56 H0 L12 38 Z" fill={c.cola} />
        <path d="M300 20 H262 V56 H300 L288 38 Z" fill={c.cola} />
        <path d="M24 46 L38 56 V46 Z" fill={c.pliegue} />
        <path d="M276 46 L262 56 V46 Z" fill={c.pliegue} />
        <path d="M24 10 Q150 0 276 10 V46 Q150 36 24 46 Z" fill={c.borde} />
        <path d="M24 16 Q150 6 276 16 V40 Q150 30 24 40 Z" fill={c.banda} />
      </svg>
      <Tag className="cinta-texto">{children}</Tag>
    </div>
  );
}

/** Logo oficial de la Universidad Nacional de Pilar (versión azul o blanca). */
export function LogoUnpilar({ className = '', variante = 'azul' }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/unpilar-logo-${variante === 'blanco' ? 'blanco' : 'azul'}.png`}
      alt="Universidad Nacional de Pilar"
      className={`logo-unpilar ${className}`}
      width="607"
      height="84"
    />
  );
}

/** Fondo del juego: rayos de sol girando muy despacio, brillo central y viñeta. */
export function FondoSol() {
  return (
    <div className="fondo-sol" aria-hidden="true">
      <div className="fondo-sol-rayos" />
      <div className="fondo-sol-brillo" />
      <div className="fondo-sol-vineta" />
    </div>
  );
}

/* ---------- Íconos de las categorías del juego (dibujados por el equipo) ---------- */

export function LibroIcon(props) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M30.5 15 C23 9.5 12 9.5 5 12.5 V51 C12 48 23 48 30.5 53.5 Z M10 21 h15 v2.8 h-15 z M10 28 h15 v2.8 h-15 z M10 35 h15 v2.8 h-15 z M10 42 h10 v2.8 h-10 z" />
      <path fillRule="evenodd" d="M33.5 15 C41 9.5 52 9.5 59 12.5 V51 C52 48 41 48 33.5 53.5 Z M39 21 h15 v2.8 h-15 z M39 28 h15 v2.8 h-15 z M39 35 h15 v2.8 h-15 z M39 42 h10 v2.8 h-10 z" />
      <path d="M3 54 C14 50.5 24 51.5 32 56.5 C40 51.5 50 50.5 61 54 V57.5 C50 54.5 40 55.5 32 60.5 C24 55.5 14 54.5 3 57.5 Z" />
    </svg>
  );
}

export function MusicaIcon(props) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12 L54 5 V44 H48 V17 L30 21 V50 H24 Z" />
      <ellipse cx="18" cy="50" rx="10" ry="8" transform="rotate(-18 18 50)" />
      <ellipse cx="42" cy="44" rx="10" ry="8" transform="rotate(-18 42 44)" />
    </svg>
  );
}

export function CineIcon(props) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M6 20 L54 8 L57 18 L9 30 Z M17 24.5 L23 16 L28 15 L22 23.5 Z M30 21.5 L36 13 L41 12 L35 20.5 Z M43 18.5 L49 10 L53 9.5 L48 17.5 Z" />
      <path fillRule="evenodd" d="M8 32 H58 V56 Q58 58 56 58 H10 Q8 58 8 56 Z M14 38 V52 H52 V38 Z" />
      <rect x="18" y="42" width="22" height="3.5" rx="1.75" />
      <rect x="18" y="47" width="14" height="3.5" rx="1.75" />
    </svg>
  );
}

export function FutbolIcon(props) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M22 6 Q32 14 42 6 L55 10.5 L63 24 L52.5 30 L50 26.5 V56 Q50 58 48 58 H16 Q14 58 14 56 V26.5 L11.5 30 L1 24 L9 10.5 Z M20.5 28 H27 V50 H21.5 V34 L17.5 36 V31 Z M38.5 28 a7.5 7.5 0 0 1 7.5 7.5 v7 a7.5 7.5 0 0 1 -15 0 v-7 a7.5 7.5 0 0 1 7.5 -7.5 Z M38.5 33 a2.5 2.5 0 0 1 2.5 2.5 v7 a2.5 2.5 0 0 1 -5 0 v-7 a2.5 2.5 0 0 1 2.5 -2.5 Z" />
    </svg>
  );
}

export const CATEGORIAS_JUEGO = [
  { id: 'historia', label: 'Historia', color: '#3fa9f5', oscuro: '#1f74b8', claro: '#a9dcff', Icono: LibroIcon },
  { id: 'musica', label: 'Música', color: '#8e5bd9', oscuro: '#5e339f', claro: '#cdb2f5', Icono: MusicaIcon },
  { id: 'cine', label: 'Cine', color: '#e8483b', oscuro: '#a92b21', claro: '#ffb0a8', Icono: CineIcon },
  { id: 'futbol', label: 'Fútbol', color: '#2db34a', oscuro: '#1d7a31', claro: '#a3eab0', Icono: FutbolIcon },
];

/** Medallón circular de una categoría, igual al del juego. */
export function MedallonCategoria({ categoria, conNombre = true }) {
  const { Icono } = categoria;
  return (
    <div className="medallon">
      <div
        className="medallon-circulo"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${categoria.claro} 0%, ${categoria.color} 45%, ${categoria.oscuro} 100%)`,
          boxShadow: `0 5px 0 ${categoria.oscuro}, 0 10px 18px -6px rgba(0,0,0,.55)`,
        }}
      >
        <Icono />
      </div>
      {conNombre && <span className="medallon-nombre">{categoria.label}</span>}
    </div>
  );
}

/** Portada de la trivia dibujada con la identidad del juego (para tarjetas y fichas). */
export function PortadaTrivia({ className = '' }) {
  return (
    <div className={`portada-trivia ${className}`} aria-hidden="true">
      <SolDeMayo className="portada-trivia-sol" />
      <Logotipo tamano="md" />
      <Cinta as="span" className="portada-trivia-cinta">La trivia de Malvinas</Cinta>
    </div>
  );
}
