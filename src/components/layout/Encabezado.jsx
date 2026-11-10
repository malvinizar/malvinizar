import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Play } from 'lucide-react';
import { GAME_URL, NAV_ITEMS } from '../../config/site';
import { LogoEncabezado, LogoUnpilar } from '../marca/Marca';

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const cerrar = () => setAbierto(false);
  const clase = ({ isActive }) => `nav-enlace ${isActive ? 'activo' : ''}`;

  useEffect(() => setAbierto(false), [pathname]);

  return (
    <>
      <div className="barra-superior">
        <div className="contenedor">
          <span className="barra-superior-texto">Producciones sobre Malvinas · Carrera de Comunicación Digital</span>
          <a href="https://unpilar.edu.ar" target="_blank" rel="noopener noreferrer">
            Universidad Nacional de Pilar ↗
          </a>
        </div>
      </div>

      <header className="encabezado">
        <div className="contenedor encabezado-inner">
          <div className="marcas">
            <LogoEncabezado onClick={cerrar} />
            <a href="https://unpilar.edu.ar" target="_blank" rel="noopener noreferrer" className="encabezado-unpilar">
              <LogoUnpilar />
            </a>
          </div>

          <nav className="nav-escritorio" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={clase}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="encabezado-acciones">
            <a href={GAME_URL} target="_blank" rel="noopener noreferrer" className="btn btn--sm encabezado-jugar">
              <Play size={15} fill="currentColor" aria-hidden="true" /> Jugar
            </a>
            <button
              type="button"
              className="nav-toggle"
              onClick={() => setAbierto((v) => !v)}
              aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={abierto}
              aria-controls="nav-movil"
            >
              {abierto ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        <nav id="nav-movil" className={`nav-movil ${abierto ? 'abierto' : ''}`} aria-label="Navegación móvil">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={clase} onClick={cerrar}>
              {item.label}
            </NavLink>
          ))}
          <a href={GAME_URL} target="_blank" rel="noopener noreferrer" className="btn" onClick={cerrar}>
            <Play size={16} fill="currentColor" aria-hidden="true" /> Jugar la trivia
          </a>
          <LogoUnpilar className="nav-movil-unpilar" />
        </nav>
      </header>
    </>
  );
}
