import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Encabezado from '../components/layout/Encabezado';
import Pie from '../components/layout/Pie';

export default function MainLayout() {
  const { pathname } = useLocation();

  // Cada sección arranca desde arriba.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="sitio">
      {/* Con HashRouter un ancla #contenido cambiaría de ruta: el salto se hace con foco. */}
      <button type="button" className="saltar" onClick={() => document.getElementById('contenido')?.focus()}>
        Saltar al contenido
      </button>
      <Encabezado />
      <main id="contenido" className="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Pie />
    </div>
  );
}
