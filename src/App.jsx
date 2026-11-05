import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Historia from './pages/Historia';
import Recursos from './pages/Recursos';
import MuseoInicio from './pages/museo/MuseoInicio';
import MuseoSala from './pages/museo/MuseoSala';
import MuseoArchivo from './pages/museo/MuseoArchivo';
import MuseoPieza from './pages/museo/MuseoPieza';
import Nosotros from './pages/Nosotros';
import Juego from './pages/Juego';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="historia" element={<Historia />} />
          <Route path="museo-virtual" element={<MuseoInicio />} />
          <Route path="museo-virtual/salas/:slug" element={<MuseoSala />} />
          <Route path="museo-virtual/archivo" element={<MuseoArchivo />} />
          <Route path="museo-virtual/pieza/:slug" element={<MuseoPieza />} />
          <Route path="museo-virtual/*" element={<Navigate to="/museo-virtual" replace />} />
          <Route path="recursos" element={<Recursos />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="juego" element={<Juego />} />

          {/* Direcciones anteriores: redirigen a las secciones nuevas */}
          <Route path="archivo-audiovisual" element={<Navigate to="/museo-virtual/archivo?formato=videos" replace />} />
          <Route path="diario" element={<Navigate to="/museo-virtual/archivo?formato=documentos" replace />} />
          <Route path="testimonios" element={<Navigate to="/museo-virtual/archivo?formato=audio" replace />} />
          <Route path="universidad" element={<Navigate to="/nosotros" replace />} />
          <Route path="contacto" element={<Navigate to="/" replace />} />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
