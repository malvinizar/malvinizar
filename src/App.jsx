import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Historia from './pages/Historia';
import Testimonios from './pages/Testimonios';
import Recursos from './pages/Recursos';
import Diario from './pages/Diario';
import ArchivoAudiovisual from './pages/ArchivoAudiovisual';
import Universidad from './pages/Universidad';
import Contacto from './pages/Contacto';
import Juego from './pages/Juego';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="historia" element={<Historia />} />
          <Route path="testimonios" element={<Testimonios />} />
          <Route path="recursos" element={<Recursos />} />
          <Route path="diario" element={<Diario />} />
          <Route path="archivo-audiovisual" element={<ArchivoAudiovisual />} />
          <Route path="universidad" element={<Universidad />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="juego" element={<Juego />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
