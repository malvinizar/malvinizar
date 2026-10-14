import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Video, 
  Gamepad2, 
  ArrowRight, 
  Award, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Quote 
} from 'lucide-react';
import { testimoniosData } from '../data/testimoniosData';
import { recursosData } from '../data/recursosData';

export default function Home() {
  const testimonioHero = testimoniosData[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Texto del Hero */}
            <div>
              <div className="hero-tag">
                <Compass size={16} />
                <span>Memoria, Historia y Soberanía</span>
              </div>
              <h1 className="hero-title">
                Malvinas en <span className="highlight">Primera Persona</span>
              </h1>
              <p className="hero-lead">
                Un espacio digital universitario dedicado a preservar la voz viva de los protagonistas, custodiar la memoria histórica y brindar herramientas pedagógicas de acceso abierto a escuelas de todo el país.
              </p>
              <div className="hero-actions">
                <Link to="/historia" className="btn btn-primary btn-lg">
                  Explorar la Historia
                  <ArrowRight size={18} />
                </Link>
                <Link to="/juego" className="btn btn-secondary btn-lg">
                  <Gamepad2 size={18} />
                  Juego Educativo
                </Link>
              </div>

              {/* Estadísticas de impacto */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">649</span>
                  <span className="stat-label">Héroes Caídos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">74</span>
                  <span className="stat-label">Días de Conflicto</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">+190</span>
                  <span className="stat-label">Años de Reclamo</span>
                </div>
              </div>
            </div>

            {/* Testimonio destacado / Tarjeta visual */}
            <div>
              <div className="hero-visual-card">
                <div className="quote-badge">
                  <Quote size={36} />
                </div>
                <p className="hero-quote">
                  "{testimonioHero.cita}"
                </p>
                <div>
                  <div className="hero-quote-author">{testimonioHero.nombre}</div>
                  <div className="hero-quote-role">{testimonioHero.rol} — {testimonioHero.unidad}</div>
                </div>
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <Link to="/testimonios" style={{ color: 'var(--primary-light)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                    Escuchar más testimonios <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares del Proyecto */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Áreas de Exploración</span>
            <h2 className="section-title">Ejes Fundamentales de la Plataforma</h2>
            <p className="section-subtitle">
              Navegá los diferentes módulos diseñados para estudiantes, docentes, investigadores y la comunidad en general.
            </p>
          </div>

          <div className="grid-3">
            {/* Tarjeta 1: Historia */}
            <div className="card">
              <div className="card-icon">
                <BookOpen size={26} />
              </div>
              <h3 className="card-title">Historia y Memoria</h3>
              <p className="card-text">
                Línea de tiempo detallada, desde la usurpación colonial de 1833 y los antecedentes diplomáticos, hasta el conflicto de 1982 y los desafíos contemporáneos.
              </p>
              <Link to="/historia" className="btn btn-outline btn-sm">
                Ver Cronología <ArrowRight size={16} />
              </Link>
            </div>

            {/* Tarjeta 2: Testimonios */}
            <div className="card">
              <div className="card-icon">
                <MessageSquare size={26} />
              </div>
              <h3 className="card-title">Voces en Primera Persona</h3>
              <p className="card-text">
                Relatos orales y escritos de soldados conscriptos, oficiales, personal de sanidad naval y familias, reconstruyendo la experiencia humana de la guerra.
              </p>
              <Link to="/testimonios" className="btn btn-outline btn-sm">
                Leer Testimonios <ArrowRight size={16} />
              </Link>
            </div>

            {/* Tarjeta 3: Recursos Pedagógicos */}
            <div className="card">
              <div className="card-icon">
                <FileText size={26} />
              </div>
              <h3 className="card-title">Recursos Educativos</h3>
              <p className="card-text">
                Guías para el aula, secuencias didácticas adaptadas para niveles primario, secundario y universitario, con mapas y actividades imprimibles.
              </p>
              <Link to="/recursos" className="btn btn-outline btn-sm">
                Biblioteca Docente <ArrowRight size={16} />
              </Link>
            </div>

            {/* Tarjeta 4: Diario de Campaña */}
            <div className="card">
              <div className="card-icon">
                <Compass size={26} />
              </div>
              <h3 className="card-title">Diario Histórico y Cartas</h3>
              <p className="card-text">
                Documentos epistolares, fragmentos de diarios íntimos de combate y correspondencia que cruzó el mar entre el continente y las islas.
              </p>
              <Link to="/diario" className="btn btn-outline btn-sm">
                Consultar Cartas <ArrowRight size={16} />
              </Link>
            </div>

            {/* Tarjeta 5: Archivo Audiovisual */}
            <div className="card">
              <div className="card-icon">
                <Video size={26} />
              </div>
              <h3 className="card-title">Archivo Audiovisual</h3>
              <p className="card-text">
                Entrevistas en video, documentales temáticos y materiales multimedia sobre la geografía insular y los testimonios de los protagonistas.
              </p>
              <Link to="/archivo-audiovisual" className="btn btn-outline btn-sm">
                Ver Videos <ArrowRight size={16} />
              </Link>
            </div>

            {/* Tarjeta 6: Juego Educativo */}
            <div className="card" style={{ border: '2px solid var(--primary-light)' }}>
              <div className="card-icon" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
                <Gamepad2 size={26} />
              </div>
              <h3 className="card-title">Experiencia Interactiva</h3>
              <p className="card-text">
                Una propuesta lúdica y formativa para recorrer los acontecimientos históricos y aprender sobre la fauna, geografía y soberanía nacional.
              </p>
              <Link to="/juego" className="btn btn-primary btn-sm">
                Jugar Ahora <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de Llamado a la Comunidad / Proyecto Universitario */}
      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Extensión y Docencia</span>
          <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '18px' }}>
            Compromiso Académico con la Causa Malvinas
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
            Este proyecto surge de la articulación de docentes, investigadores y estudiantes universitarios junto a centros de veteranos de guerra de todo el territorio nacional para garantizar que la memoria siga viva en cada escuela.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/universidad" className="btn btn-primary">
              Conocer el Proyecto Universitario
            </Link>
            <Link to="/contacto" className="btn btn-secondary">
              Aportar Material o Contactarse
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
