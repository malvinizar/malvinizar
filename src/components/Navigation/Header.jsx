import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Menu, X, BookOpen, Gamepad2, Award } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand */}
        <Link to="/" className="brand-link" onClick={closeMenu}>
          <div className="brand-badge" aria-hidden="true">
            <Compass size={22} />
          </div>
          <span>
            Malviniz<span className="brand-accent">AR</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Navegación principal">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Inicio
          </NavLink>
          <NavLink to="/historia" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Historia
          </NavLink>
          <NavLink to="/testimonios" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Testimonios
          </NavLink>
          <NavLink to="/recursos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Recursos
          </NavLink>
          <NavLink to="/diario" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Diario
          </NavLink>
          <NavLink to="/archivo-audiovisual" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Audiovisual
          </NavLink>
          <NavLink to="/universidad" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Universidad
          </NavLink>
          <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contacto
          </NavLink>
        </nav>

        {/* Header Action Button */}
        <Link to="/juego" className="header-cta-btn">
          <Gamepad2 size={18} />
          <span>Juego Educativo</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="mobile-toggle-btn"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegación móvil">
        <NavLink to="/" className="nav-link" onClick={closeMenu}>
          Inicio
        </NavLink>
        <NavLink to="/historia" className="nav-link" onClick={closeMenu}>
          Historia y Memoria
        </NavLink>
        <NavLink to="/testimonios" className="nav-link" onClick={closeMenu}>
          Testimonios en Primera Persona
        </NavLink>
        <NavLink to="/recursos" className="nav-link" onClick={closeMenu}>
          Recursos Pedagógicos
        </NavLink>
        <NavLink to="/diario" className="nav-link" onClick={closeMenu}>
          Diario Histórico
        </NavLink>
        <NavLink to="/archivo-audiovisual" className="nav-link" onClick={closeMenu}>
          Archivo Audiovisual
        </NavLink>
        <NavLink to="/universidad" className="nav-link" onClick={closeMenu}>
          Proyecto Universitario
        </NavLink>
        <NavLink to="/contacto" className="nav-link" onClick={closeMenu}>
          Contacto
        </NavLink>
        <Link to="/juego" className="btn btn-primary btn-sm" onClick={closeMenu} style={{ marginTop: '12px' }}>
          <Gamepad2 size={16} />
          <span>Acceder al Juego</span>
        </Link>
      </nav>
    </header>
  );
}
