import { Link } from 'react-router-dom';
import { Compass, ShieldCheck } from 'lucide-react';
import { GAME_URL } from '../../config/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Columna 1: Identidad */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div className="brand-badge" style={{ width: '32px', height: '32px' }}>
                <Compass size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--white)' }}>
                Malviniz<span style={{ color: 'var(--primary)' }}>AR</span>
              </span>
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Proyecto educativo digital desarrollado por estudiantes de Comunicación Digital de la Universidad Nacional de Pilar para acercar la historia de Malvinas a través de la memoria, la comunicación y herramientas innovadoras de aprendizaje.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-light)', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>Memoria, Historia y Soberanía</span>
            </div>
          </div>

          {/* Columna 2: Secciones */}
          <div className="footer-col">
            <h4>Secciones</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/historia">Historia y Memoria</Link></li>
              <li><Link to="/museo-virtual">Museo Virtual</Link></li>
              <li><Link to="/recursos">Recursos Educativos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Proyecto */}
          <div className="footer-col">
            <h4>Proyecto</h4>
            <ul className="footer-links">
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li>
                <a href={GAME_URL} target="_blank" rel="noopener noreferrer">
                  Juego Educativo
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Marco legal */}
          <div className="footer-col">
            <h4>Marco Legal</h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>
              «La Nación Argentina ratifica su legítima e imprescriptible soberanía sobre las Islas Malvinas, Georgias del Sur y Sandwich del Sur y los espacios marítimos e insulares correspondientes.»
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--primary-light)', marginTop: '8px', fontStyle: 'italic' }}>
              Constitución de la Nación Argentina — Cláusula Transitoria Primera.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 MalvinizAR — Universidad Nacional de Pilar
          </div>
          <div style={{ color: 'var(--primary-light)', fontSize: '0.88rem', fontWeight: 600 }}>
            Memoria, Historia y Soberanía
          </div>
        </div>
      </div>
    </footer>
  );
}
