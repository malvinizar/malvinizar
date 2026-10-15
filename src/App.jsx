import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Historia from './pages/Historia';
import Recursos from './pages/Recursos';
import MuseoVirtual from './pages/MuseoVirtual';
import Nosotros from './pages/Nosotros';
import Juego from './pages/Juego';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="historia" element={<Historia />} />
          <Route path="museo-virtual" element={<MuseoVirtual />} />
          <Route path="recursos" element={<Recursos />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="juego" element={<Juego />} />

          {/* Direcciones anteriores: redirigen a las secciones nuevas */}
          <Route path="archivo-audiovisual" element={<Navigate to="/museo-virtual?sala=audiovisual" replace />} />
          <Route path="diario" element={<Navigate to="/museo-virtual?sala=diario" replace />} />
          <Route path="testimonios" element={<Navigate to="/museo-virtual?sala=testimonios" replace />} />
          <Route path="universidad" element={<Navigate to="/nosotros" replace />} />
          <Route path="contacto" element={<Navigate to="/" replace />} />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
