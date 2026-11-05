# MalvinizAR

Plataforma educativa sobre la memoria histórica de Malvinas: historia, museo virtual, recursos pedagógicos y juego.

Sitio publicado: <https://malvinizar.github.io/malvinizar/>

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

## Museo Virtual

- Rutas: `/museo-virtual` (portada con carruseles), `/museo-virtual/salas/:slug`, `/museo-virtual/archivo` (catálogo), `/museo-virtual/pieza/:slug` (ficha con créditos).
- Contenidos en JSON dentro de `src/content/museo/` y archivos multimedia en `public/museo/media/`.
- Panel de administración opcional con [Pages CMS](https://app.pagescms.org) (`.pages.yml`).
- Código: `src/museo/` (datos y componentes), `src/pages/museo/` (páginas), `src/styles/museo.css` (estilos).

Ver **[CONTENIDOS.md](CONTENIDOS.md)** para cargar y renombrar salas y piezas.
