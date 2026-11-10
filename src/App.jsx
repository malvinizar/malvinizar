import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Juego from './pages/Juego';
import Producciones from './pages/Producciones';
import ProduccionFicha from './pages/ProduccionFicha';
import Historia from './pages/Historia';
import Nosotros from './pages/Nosotros';
import NoEncontrado from './pages/NoEncontrado';

/** Las fichas del antiguo «Museo Virtual» redirigen a la misma producción. */
function RedirigirPieza() {
  const { slug } = useParams();
  return <Navigate to={`/producciones/${slug}`} replace />;
}

function RedirigirSala() {
  const { slug } = useParams();
  return <Navigate to={`/producciones?eje=${slug}`} replace />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="juego" element={<Juego />} />
          <Route path="producciones" element={<Producciones />} />
          <Route path="producciones/:slug" element={<ProduccionFicha />} />
          <Route path="historia" element={<Historia />} />
          <Route path="nosotros" element={<Nosotros />} />

          {/* Direcciones anteriores */}
          <Route path="museo-virtual/pieza/:slug" element={<RedirigirPieza />} />
          <Route path="museo-virtual/salas/:slug" element={<RedirigirSala />} />
          <Route path="museo-virtual/*" element={<Navigate to="/producciones" replace />} />
          <Route path="museo-virtual" element={<Navigate to="/producciones" replace />} />
          <Route path="recursos" element={<Navigate to="/producciones" replace />} />
          <Route path="archivo-audiovisual" element={<Navigate to="/producciones?formato=videos" replace />} />
          <Route path="diario" element={<Navigate to="/producciones?formato=documentos" replace />} />
          <Route path="testimonios" element={<Navigate to="/producciones?formato=audio" replace />} />
          <Route path="universidad" element={<Navigate to="/nosotros" replace />} />
          <Route path="contacto" element={<Navigate to="/nosotros" replace />} />

          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
