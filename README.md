# MalvinizAR

Plataforma que aloja las producciones sobre Malvinas realizadas por estudiantes de la Universidad Nacional de Pilar (UNPILAR). La pieza principal es el juego: [MalvinizAR · La trivia de Malvinas](https://malvinizar.github.io/malvinizados/) (repo `malvinizar/malvinizados`).

Sitio publicado: <https://malvinizar.github.io/malvinizar/>

## Secciones

| Menú | Ruta | Qué tiene |
| --- | --- | --- |
| Inicio | `#/` | Slider con fotos reales de estudiantes, «¿Cómo nace MalvinizAR?» y accesos al Juego y a las Producciones |
| Juego | `#/juego` | De qué se trata la trivia y cómo se juega, con la identidad visual del juego |
| Producciones | `#/producciones` | Producciones de estudiantes con filtros por formato y tema; cada una tiene su ficha (`#/producciones/<slug>`) |
| Historia | `#/historia` | Cronología. Cada hito enlaza las producciones relacionadas (`producciones` en `src/data/historiaData.js`) |
| Nosotros | `#/nosotros` | El proyecto y la UNPILAR |

Las direcciones del antiguo «Museo Virtual» (`#/museo-virtual/...`) redirigen a Producciones.

## Identidad visual

- **Plataforma:** estética institucional de la UNPILAR (azul `#13579e`, azul marino `#223263`, celeste `#0285d5`, blanco; Roboto Condensed + Roboto). Estilos en `src/index.css`.
- **Juego:** la sección Juego, el acceso del Inicio y la portada de la trivia usan la identidad de Malvinados (azul marino, crema con borde dorado, oro del Sol de Mayo, celeste y blanco; Lilita One + Nunito; botones 3D). Estilos en `src/styles/juego.css`, componentes en `src/components/marca/Marca.jsx`.
- **Logos:** el logotipo MalvinizAR usa la tipografía del juego. Logo de la UNPILAR en `public/brand/` (versión azul y blanca).

## Tecnología

- React 19 + Vite, con `HashRouter` (compatible con GitHub Pages)
- Íconos: `lucide-react`
- Deploy automático a GitHub Pages con cada push a `main` (`.github/workflows/deploy.yml`)

```bash
npm install
npm run dev      # servidor local
npm run build    # compila en dist/
npm run lint
```

## Contenidos

- Producciones: un JSON por producción en `src/content/museo/piezas/`, archivos en `public/museo/media/`.
- Slider del Inicio: `src/content/inicio.json`, fotos en `public/inicio/`.
- Panel de administración opcional con [Pages CMS](https://app.pagescms.org) (`.pages.yml`).

Ver **[CONTENIDOS.md](CONTENIDOS.md)** para cargar producciones.
