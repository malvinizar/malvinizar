/**
 * Museo Virtual — contenido real del archivo.
 *
 * Mientras una lista esté vacía, el sitio muestra un espacio reservado.
 * Para publicar material, agregá objetos siguiendo los formatos de abajo.
 * No cargar contenido de ejemplo: todo lo que aparezca acá se muestra como material auténtico.
 */

/**
 * Audiovisual — videos de YouTube.
 * {
 *   id: 'identificador-unico',
 *   youtubeId: 'XXXXXXXXXXX',     // el código que aparece en youtube.com/watch?v=XXXXXXXXXXX
 *   titulo: 'Título del video',
 *   descripcion: 'Breve descripción (opcional)',
 * }
 */
export const videos = [];

/**
 * Diario digitalizado — páginas o fragmentos escaneados.
 * Guardar las imágenes en /public/images/museo/diario/
 * {
 *   id: 'pagina-1',
 *   imagen: 'images/museo/diario/pagina-1.jpg',
 *   titulo: 'Página 1',
 *   fecha: 'Fecha del documento (opcional)',
 *   descripcion: 'Transcripción o contexto (opcional)',
 * }
 */
export const diarioPaginas = [];

/**
 * Testimonios — entrevistas y relatos.
 * {
 *   id: 'identificador-unico',
 *   nombre: 'Nombre de la persona entrevistada',
 *   contexto: 'Rol o vínculo con Malvinas (opcional)',
 *   youtubeId: 'XXXXXXXXXXX',      // opcional, si la entrevista está en YouTube
 *   cita: 'Fragmento textual del testimonio (opcional)',
 *   enlace: 'https://...',         // opcional, link externo a la entrevista completa
 * }
 */
export const testimonios = [];
