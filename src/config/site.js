/**
 * Configuración central del sitio MalvinizAR
 */

/** Juego principal de la plataforma: la trivia de Malvinas (repo malvinizar/malvinizados). */
export const GAME_URL = 'https://malvinizar.github.io/malvinizados/';
export const RANKING_URL = 'https://malvinizar.github.io/malvinizados/ranking/';

/**
 * Formulario para que estudiantes sumen sus producciones («Malvinizá con Unpilar»).
 * Pegá acá el link público (el de «Enviar» en Google Forms) y aparece el botón en Nosotros.
 */
export const FORM_URL = '';

export const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/juego', label: 'Juego' },
  { to: '/producciones', label: 'Producciones' },
  { to: '/historia', label: 'Historia' },
  { to: '/nosotros', label: 'Nosotros' },
];

export const siteConfig = {
  gameUrl: GAME_URL,
};

export default siteConfig;
