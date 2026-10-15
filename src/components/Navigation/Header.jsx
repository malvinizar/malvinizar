import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Menu, X, Gamepad2 } from 'lucide-react';
import { GAME_URL } from '../../config/site';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/historia', label: 'Historia', mobileLabel: 'Historia y Memoria' },
  { to: '/museo-virtual', label: 'Museo Virtual' },
  { to: '/recursos', label: 'Recursos', mobileLabel: 'Recursos Pedagógicos' },
  { to: '/nosotros', label: 'Nosotros' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

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
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Header Action Button */}
        <a
          href={GAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta-btn"
        >
          <Gamepad2 size={18} />
          <span>Juego Educativo</span>
        </a>

        {/* Mobile actions: juego siempre visible + menú */}
        <div className="header-actions-mobile">
          <a
            href={GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="header-game-mobile"
            aria-label="Abrir el Juego Educativo"
            title="Juego Educativo"
          >
            <Gamepad2 size={20} />
          </a>
          <button
            className="mobile-toggle-btn"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegación móvil">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={closeMenu}>
            {item.mobileLabel || item.label}
          </NavLink>
        ))}
        <a
          href={GAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
          onClick={closeMenu}
          style={{ marginTop: '12px' }}
        >
          <Gamepad2 size={16} />
          <span>Juego Educativo</span>
        </a>
      </nav>
    </header>
  );
}
