# Cómo cargar producciones

La sección Producciones se arma sola a partir de archivos de datos. Para sumar o renombrar una producción o un tema **no hace falta tocar el código**: alcanza con agregar o editar un archivo. Cada vez que se guarda un cambio en la rama `main`, GitHub Actions vuelve a publicar el sitio en uno o dos minutos.

## Opción 1 — Panel de administración (recomendada)

El repo trae configurado [Pages CMS](https://app.pagescms.org) (`.pages.yml`), un panel gratuito que edita el repositorio con formularios.

1. Entrá a <https://app.pagescms.org> e iniciá sesión con GitHub.
2. Elegí el repositorio `malvinizar/malvinizar` y la rama `main`.
3. En el menú lateral vas a ver:
   - **Inicio · Slider**: fotos reales de estudiantes y texto de la portada.
   - **Producciones · Opciones**: título de la sección y opciones generales.
   - **Producciones · Temas**: los temas que se usan para filtrar (antes «salas»).
   - **Producciones**: cada foto, video, audio, documento, infografía o juego, con su ficha.
4. Los archivos (imágenes, audios, videos, PDF) se suben desde los mismos formularios y quedan en `public/museo/media/`.

Para ocultar algo sin borrarlo, desmarcá **Publicado**.

## Opción 2 — Editar los archivos a mano

```
src/content/museo/
├── config.json          → opciones de la sección Producciones
├── salas/<slug>.json    → un tema por archivo
└── piezas/<slug>.json   → una producción por archivo
public/museo/media/      → imágenes, audio, video, documentos
```

El nombre del archivo es la dirección web: `piezas/malvinas-1833-2025.json` → `#/producciones/malvinas-1833-2025`. Usá minúsculas, sin tildes ni espacios.

Lo más fácil es copiar una pieza parecida y cambiar los datos. `piezas/ficha-de-ejemplo.json` tiene todos los campos completos.

### Campos de una producción

La ficha técnica muestra siempre **título, autor/a, materia, docente, año y formato**. Completá esos cinco datos en cada producción.

| Campo | Para qué sirve |
| --- | --- |
| `titulo`, `subtitulo` | Título de la obra o recurso |
| `tipo` | `juego`, `fotografia`, `imagen`, `video`, `audio`, `presentacion`, `documento`, `infografia` u `otro` |
| `sala` | Slug del tema (por ejemplo `voces-y-relatos`) |
| `orden` | Posición dentro del tema |
| `destacada` | Aparece en «Destacadas» del Inicio |
| `publicado` | `false` la oculta |
| `demo` | Marca la pieza como contenido demostrativo |
| `resumen` | Una o dos líneas para las tarjetas |
| `descripcion` | Descripción y contexto. Una línea en blanco separa párrafos |
| `imagen`, `imagenAlt` | Imagen principal y su texto alternativo (accesibilidad) |
| `galeria` | Lista de `{ "imagen", "pie" }` para armar una galería |
| `archivo` | Audio (`.mp3`, `.m4a`), video (`.mp4`) o documento (`.pdf`) |
| `paginas` | Imágenes de cada página de una presentación o documento, en orden |
| `videoExterno` | Link de YouTube o Vimeo (se inserta en la ficha) |
| `juego` | Link de un juego o experiencia web: se juega dentro de la ficha con el botón «Jugar» |
| `descargable` | Muestra el botón «Descargar» |
| `autores` | Lista de `{ "nombre", "rol" }` |
| `materia` | Materia en la que se hizo la producción |
| `docente` | Docente a cargo |
| `anio` | Año de realización |
| `fecha` | Texto libre: «1982», «Abril de 2026», «Jueves 23/04» |
| `procedencia` | Institución, organización o archivo de origen |
| `creditos` | Lista de `{ "rol", "nombre" }` (edición, música, producción…) |
| `creditoImagen` | Fotografía o material audiovisual: autor y fuente |
| `fuentes` | Fuentes bibliográficas o documentales |
| `derechos`, `licencia` | Derechos de uso y licencia o autorización |
| `enlaces` | Lista de `{ "etiqueta", "url" }` hacia la referencia original |
| `etiquetas` | Palabras clave (también sirven para buscar) |
| `relacionadas` | Slugs de otras piezas para «Contenidos relacionados» |
| `notasInternas` | Notas de trabajo. **No se publican** |

Ningún campo es obligatorio salvo el título: lo que esté vacío no se muestra.

Los créditos de cada pieza (autoría, créditos de producción, imagen, fecha, procedencia, fuentes, derechos y licencia) se muestran dentro de su descripción, en la página de la pieza.

**Renombrar una pieza**: cambiá `titulo` (y `subtitulo` si querés). La dirección web no cambia, así que los enlaces siguen funcionando.

### «A completar»

Mientras `mostrarPendientes` esté en `true` (en `config.json` o en **Producciones · Opciones**), las fichas marcan en color ocre los datos de la ficha técnica que faltan: autor/a, materia, docente y año. Antes de difundir el museo, poné ese campo en `false`.

## Recomendaciones para los archivos

- **Imágenes**: JPG o WebP de 2000 a 2400 px del lado largo. Una foto de celular sin achicar puede pesar 5 MB o más.
- **Presentaciones en PDF**: exportá cada página como JPG (unos 1600 px de ancho) y cargalas en `paginas`. Así se ven en el visor del sitio. Además podés subir el PDF en `archivo` para la descarga.
- **Video**: GitHub no acepta archivos de más de 100 MB. Para videos largos conviene subirlos a YouTube y pegar el link en `videoExterno`.
- **Audio**: MP3 o M4A.

## Vincular una producción con la Historia

En `src/data/historiaData.js`, cada hito tiene una lista `producciones` con los slugs de las producciones relacionadas. Al agregar un slug, la producción aparece debajo de ese hito y el hito aparece en la ficha de la producción («En la Historia»).
