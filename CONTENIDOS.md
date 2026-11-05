# Cómo cargar contenidos en el Museo Virtual

El museo se arma solo a partir de archivos de datos. Para sumar o renombrar una pieza o una sala **no hace falta tocar el código**: alcanza con agregar o editar un archivo. Cada vez que se guarda un cambio en la rama `main`, GitHub Actions vuelve a publicar el sitio en uno o dos minutos.

## Opción 1 — Panel de administración (recomendada)

El repo trae configurado [Pages CMS](https://app.pagescms.org) (`.pages.yml`), un panel gratuito que edita el repositorio con formularios.

1. Entrá a <https://app.pagescms.org> e iniciá sesión con GitHub.
2. Elegí el repositorio `malvinizar/malvinizar` y la rama `main`.
3. En el menú lateral vas a ver:
   - **Museo · Portada**: nombre del museo y opciones generales.
   - **Museo · Salas**: crear, editar, ordenar u ocultar salas y exposiciones.
   - **Museo · Piezas**: cada foto, video, audio, documento o infografía, con sus créditos.
4. Los archivos (imágenes, audios, videos, PDF) se suben desde los mismos formularios y quedan en `public/museo/media/`.

Para ocultar algo sin borrarlo, desmarcá **Publicado**.

## Opción 2 — Editar los archivos a mano

```
src/content/museo/
├── config.json          → portada del museo
├── salas/<slug>.json    → una sala por archivo
└── piezas/<slug>.json   → una pieza por archivo
public/museo/media/      → imágenes, audio, video, documentos
```

El nombre del archivo es la dirección web: `piezas/malvinas-1833-2025.json` → `#/museo-virtual/pieza/malvinas-1833-2025`. Usá minúsculas, sin tildes ni espacios.

Lo más fácil es copiar una pieza parecida y cambiar los datos. `piezas/ficha-de-ejemplo.json` tiene todos los campos completos.

### Campos de una pieza

| Campo | Para qué sirve |
| --- | --- |
| `titulo`, `subtitulo` | Título de la obra o recurso |
| `tipo` | `fotografia`, `imagen`, `video`, `audio`, `presentacion`, `documento`, `infografia` u `otro` |
| `sala` | Slug de la sala (por ejemplo `voces-y-relatos`) |
| `orden` | Posición dentro de la sala |
| `destacada` | Aparece en el carrusel principal de la portada |
| `publicado` | `false` la oculta |
| `demo` | Marca la pieza como contenido demostrativo |
| `resumen` | Una o dos líneas para las tarjetas |
| `descripcion` | Descripción y contexto. Una línea en blanco separa párrafos |
| `imagen`, `imagenAlt` | Imagen principal y su texto alternativo (accesibilidad) |
| `galeria` | Lista de `{ "imagen", "pie" }` para armar una galería |
| `archivo` | Audio (`.mp3`, `.m4a`), video (`.mp4`) o documento (`.pdf`) |
| `paginas` | Imágenes de cada página de una presentación o documento, en orden |
| `videoExterno` | Link de YouTube o Vimeo (se inserta en la ficha) |
| `descargable` | Muestra el botón «Descargar» |
| `autores` | Lista de `{ "nombre", "rol" }` |
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

### «Dato a completar»

Mientras `mostrarPendientes` esté en `true` (en `config.json` o en **Museo · Portada**), las fichas marcan en color ocre los datos clave que faltan: autoría, fecha, procedencia y derechos. Antes de difundir el museo, poné ese campo en `false`.

## Recomendaciones para los archivos

- **Imágenes**: JPG o WebP de 2000 a 2400 px del lado largo. Una foto de celular sin achicar puede pesar 5 MB o más.
- **Presentaciones en PDF**: exportá cada página como JPG (unos 1600 px de ancho) y cargalas en `paginas`. Así se ven en el visor del sitio. Además podés subir el PDF en `archivo` para la descarga.
- **Video**: GitHub no acepta archivos de más de 100 MB. Para videos largos conviene subirlos a YouTube y pegar el link en `videoExterno`.
- **Audio**: MP3 o M4A.
