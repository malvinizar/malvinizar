import { Link } from 'react-router-dom';
import { Compass, BookOpen, Heart, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

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
              Plataforma digital universitaria para la memoria, la difusión histórica y la formación pedagógica sobre la causa y la soberanía de las Islas Malvinas y del Atlántico Sur.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-light)', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>Memoria, Soberanía y Verdad Histórica</span>
            </div>
          </div>

          {/* Columna 2: Secciones principales */}
          <div className="footer-col">
            <h4>Secciones</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/historia">Historia y Línea de Tiempo</Link></li>
              <li><Link to="/testimonios">Testimonios de Veteranos</Link></li>
              <li><Link to="/recursos">Recursos para Docentes</Link></li>
              <li><Link to="/diario">Cartas y Diario Histórico</Link></li>
            </ul>
          </div>

          {/* Columna 3: Multimedia y Comunidad */}
          <div className="footer-col">
            <h4>Materiales</h4>
            <ul className="footer-links">
              <li><Link to="/archivo-audiovisual">Archivo Audiovisual</Link></li>
              <li><Link to="/juego">Juego Educativo Interactivo</Link></li>
              <li><Link to="/universidad">Equipo de Investigación</Link></li>
              <li><Link to="/contacto">Aportar Testimonio o Archivo</Link></li>
            </ul>
          </div>

          {/* Columna 4: Declaración institucional */}
          <div className="footer-col">
            <h4>Marco Legal</h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>
              "La Nación Argentina ratifica su legítima e imprescriptible soberanía sobre las Islas Malvinas, Georgias del Sur y Sandwich del Sur y los espacios marítimos e insulares correspondientes."
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--primary-light)', marginTop: '8px', fontStyle: 'italic' }}>
              Constitución de la Nación Argentina (Cláusula Transitoria Primera).
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} MalvinizAR — Proyecto de Extensión y Memoria Universitaria. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/contacto" style={{ color: '#D1D5DB' }}>Contacto</Link>
            <Link to="/universidad" style={{ color: '#D1D5DB' }}>Acerca del proyecto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
