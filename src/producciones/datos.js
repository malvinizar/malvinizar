/**
 * Producciones de estudiantes — capa de datos.
 *
 * Los contenidos viven en archivos JSON independientes dentro de src/content/museo/:
 *   - config.json      → opciones generales de la sección Producciones
 *   - salas/*.json     → ejes temáticos (sirven para filtrar)
 *   - piezas/*.json    → una pieza (foto, video, audio, documento…) por archivo
 *
 * El nombre del archivo es el identificador (slug) que aparece en la URL.
 * Para agregar contenido no hace falta tocar este código: alcanza con sumar un JSON
 * (a mano o desde el panel de Pages CMS). Ver CONTENIDOS.md.
 */
import {
  Camera,
  Image as ImageIcon,
  Film,
  Headphones,
  Presentation,
  FileText,
  ChartColumn,
  Shapes,
  Gamepad2,
} from 'lucide-react';
import configJson from '../content/museo/config.json';
import { historiaData } from '../data/historiaData';

const salasModulos = import.meta.glob('../content/museo/salas/*.json', { eager: true, import: 'default' });
const piezasModulos = import.meta.glob('../content/museo/piezas/*.json', { eager: true, import: 'default' });

/** Convierte una ruta de archivo o una referencia del CMS en un slug: ".../salas/mi-sala.json" → "mi-sala" */
export const aSlug = (valor = '') =>
  String(valor).split('/').pop().replace(/\.json$/i, '').trim();

/** Resuelve rutas de /public respetando la base del sitio (GitHub Pages usa /malvinizar/). */
export const assetUrl = (ruta) => {
  if (!ruta) return '';
  if (/^(https?:)?\/\//.test(ruta) || ruta.startsWith('data:')) return ruta;
  return `${import.meta.env.BASE_URL}${ruta.replace(/^\/+/, '')}`;
};

/* ---------- Tipos de contenido ---------- */

export const TIPOS = {
  fotografia: { label: 'Fotografía', icon: Camera, filtro: 'imagenes' },
  imagen: { label: 'Imagen', icon: ImageIcon, filtro: 'imagenes' },
  video: { label: 'Video', icon: Film, filtro: 'videos' },
  audio: { label: 'Podcast / audio', icon: Headphones, filtro: 'audio' },
  presentacion: { label: 'Presentación', icon: Presentation, filtro: 'presentaciones' },
  documento: { label: 'Documento', icon: FileText, filtro: 'documentos' },
  infografia: { label: 'Infografía', icon: ChartColumn, filtro: 'infografias' },
  juego: { label: 'Juego', icon: Gamepad2, filtro: 'juegos' },
  otro: { label: 'Recurso digital', icon: Shapes, filtro: 'otros' },
};

/** Filtros del Archivo multimedia (agrupan tipos). */
export const FILTROS = [
  { id: 'juegos', label: 'Juegos' },
  { id: 'imagenes', label: 'Fotografías e imágenes' },
  { id: 'videos', label: 'Videos' },
  { id: 'audio', label: 'Podcasts y audio' },
  { id: 'presentaciones', label: 'Presentaciones' },
  { id: 'documentos', label: 'Documentos y publicaciones' },
  { id: 'infografias', label: 'Infografías' },
  { id: 'otros', label: 'Otros recursos' },
];

export const tipoDe = (pieza) => TIPOS[pieza?.tipo] || TIPOS.otro;

/* ---------- Normalización ---------- */

const lista = (v) => (Array.isArray(v) ? v.filter((x) => x !== null && x !== undefined && x !== '') : []);
const texto = (v) => (typeof v === 'string' ? v.trim() : '');

function normalizarSala(slug, d) {
  return {
    slug,
    titulo: texto(d.titulo) || slug,
    bajada: texto(d.bajada),
    descripcion: texto(d.descripcion),
    portada: texto(d.portada),
    portadaAlt: texto(d.portadaAlt),
    tipo: d.tipo === 'temporal' ? 'temporal' : 'permanente',
    periodo: texto(d.periodo),
    orden: Number(d.orden) || 0,
    destacada: Boolean(d.destacada),
    publicado: d.publicado !== false,
    demo: Boolean(d.demo),
  };
}

function normalizarPieza(slug, d) {
  return {
    slug,
    titulo: texto(d.titulo) || slug,
    subtitulo: texto(d.subtitulo),
    tipo: TIPOS[d.tipo] ? d.tipo : 'otro',
    sala: aSlug(d.sala),
    orden: Number(d.orden) || 0,
    destacada: Boolean(d.destacada),
    publicado: d.publicado !== false,
    demo: Boolean(d.demo),
    resumen: texto(d.resumen),
    descripcion: texto(d.descripcion),
    imagen: texto(d.imagen),
    imagenAlt: texto(d.imagenAlt),
    galeria: lista(d.galeria)
      .map((g) => (typeof g === 'string' ? { imagen: g, pie: '' } : { imagen: texto(g.imagen), pie: texto(g.pie) }))
      .filter((g) => g.imagen),
    archivo: texto(d.archivo),
    paginas: lista(d.paginas),
    videoExterno: texto(d.videoExterno),
    juego: texto(d.juego),
    descargable: Boolean(d.descargable),
    autores: lista(d.autores).filter((a) => a?.nombre),
    materia: texto(d.materia),
    docente: texto(d.docente),
    anio: texto(String(d.anio ?? '')),
    fecha: texto(d.fecha),
    procedencia: texto(d.procedencia),
    creditos: lista(d.creditos).filter((c) => c?.nombre),
    creditoImagen: texto(d.creditoImagen),
    fuentes: lista(d.fuentes),
    derechos: texto(d.derechos),
    licencia: texto(d.licencia),
    enlaces: lista(d.enlaces).filter((e) => e?.url),
    etiquetas: lista(d.etiquetas),
    relacionadas: lista(d.relacionadas).map(aSlug),
  };
}

const porOrden = (a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, 'es');

export const config = {
  nombre: 'Producciones de estudiantes',
  bajada: '',
  descripcion: '',
  imagenPortada: '',
  imagenPortadaAlt: '',
  invitacion: '',
  mostrarPendientes: false,
  ...configJson,
};

/** Salas publicadas, en el orden del recorrido. */
export const salas = Object.entries(salasModulos)
  .map(([ruta, d]) => normalizarSala(aSlug(ruta), d))
  .filter((s) => s.publicado)
  .sort(porOrden);

const slugsSalas = new Set(salas.map((s) => s.slug));
const posicionSala = (slug) => {
  const i = salas.findIndex((s) => s.slug === slug);
  return i === -1 ? salas.length : i;
};

/** Piezas publicadas (las de salas ocultas también se ocultan). */
export const piezas = Object.entries(piezasModulos)
  .map(([ruta, d]) => normalizarPieza(aSlug(ruta), d))
  .filter((p) => p.publicado && (!p.sala || slugsSalas.has(p.sala)))
  .sort((a, b) => posicionSala(a.sala) - posicionSala(b.sala) || porOrden(a, b));

export const getSala = (slug) => salas.find((s) => s.slug === slug);
export const getPieza = (slug) => piezas.find((p) => p.slug === slug);
export const piezasDeSala = (slug) => piezas.filter((p) => p.sala === slug);
export const portadaDeSala = (sala) =>
  sala.portada || piezasDeSala(sala.slug).find((p) => p.imagen)?.imagen || '';

/** Formato legible de la pieza (para la ficha y las tarjetas). */
export const formatoDe = (p) => tipoDe(p).label;

/** Relacionadas: las elegidas a mano y, si faltan, otras del mismo eje temático. */
export function relacionadasDe(pieza, max = 3) {
  const elegidas = pieza.relacionadas.map(getPieza).filter(Boolean);
  const resto = piezasDeSala(pieza.sala).filter(
    (p) => p.slug !== pieza.slug && !elegidas.includes(p)
  );
  return [...elegidas, ...resto].slice(0, max);
}

/** Pieza anterior y siguiente dentro de la misma sala. */
export function vecinasDe(pieza) {
  const enSala = piezasDeSala(pieza.sala);
  const i = enSala.findIndex((p) => p.slug === pieza.slug);
  return { anterior: enSala[i - 1], siguiente: enSala[i + 1] };
}

/* ---------- Tipos de archivo ---------- */

const ext = (ruta = '') => ruta.split('?')[0].split('.').pop().toLowerCase();
export const esVideo = (r) => ['mp4', 'webm', 'mov', 'm4v'].includes(ext(r));
export const esAudio = (r) => ['mp3', 'm4a', 'wav', 'ogg', 'aac', 'opus'].includes(ext(r));
export const esPdf = (r) => ext(r) === 'pdf';

/** Convierte un link de YouTube o Vimeo en URL de inserción. */
export function urlEmbed(url) {
  if (!url) return '';
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

/** Divide un texto en párrafos (línea en blanco = párrafo nuevo). */
export const parrafos = (t = '') => t.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);

/** Nombres de autores y autoras: «Ana, Juan y Mayra»; si son muchos, «Ana, Juan y 3 más». */
export function nombresDe(p, max = 3) {
  const n = p.autores.map((a) => a.nombre);
  if (!n.length) return '';
  if (n.length === 1) return n[0];
  if (n.length <= max) return `${n.slice(0, -1).join(', ')} y ${n[n.length - 1]}`;
  return `${n.slice(0, max - 1).join(', ')} y ${n.length - max + 1} más`;
}

/** Línea corta de autoría para tarjetas: nombres o el primer crédito. */
export function firmaDe(p) {
  if (p.autores.length) return nombresDe(p);
  if (p.creditos.length) return `${p.creditos[0].rol}: ${p.creditos[0].nombre}`;
  return p.procedencia;
}

/** Dato breve de formato para la tarjeta (páginas, imágenes…). */
export function detalleFormato(p) {
  if (p.paginas.length > 1) return `${p.paginas.length} páginas`;
  if (p.galeria.length > 1) return `${p.galeria.length} imágenes`;
  if (p.juego) return 'Interactivo';
  if (p.videoExterno || esVideo(p.archivo)) return 'Video';
  if (esAudio(p.archivo)) return 'Audio';
  return '';
}

/* ---------- Vínculo con la Historia ---------- */

/** Hitos de la cronología que enlazan esta producción. */
export const hitosDe = (slug) => historiaData.filter((h) => (h.producciones || []).includes(slug));

/** Producciones publicadas vinculadas a un hito. */
export const produccionesDeHito = (hito) => (hito.producciones || []).map(getPieza).filter(Boolean);
