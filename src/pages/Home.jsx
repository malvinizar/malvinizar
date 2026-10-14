import { Link } from 'react-router-dom';
import {
  BookOpen,
  MessageSquare,
  FileText,
  Video,
  Gamepad2,
  ArrowRight,
  Compass,
  Users,
  GraduationCap,
} from 'lucide-react';

export default function Home() {
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
                MalvinizAR
              </h1>
              <p className="hero-lead">
                Un espacio digital creado por estudiantes de la Universidad Nacional de Pilar para preservar la memoria histórica de Malvinas, recuperar las voces de sus protagonistas y acercar recursos educativos a toda la comunidad.
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
            </div>

            {/* Sección orientada al público */}
            <div>
              <div className="hero-visual-card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)', marginBottom: '10px' }}>
                  Un espacio para aprender y compartir
                </h2>
                <p style={{ fontSize: '0.97rem', color: '#D1D5DB', lineHeight: 1.6, marginBottom: '24px' }}>
                  Conocé la historia de Malvinas a través de recursos, testimonios y contenidos interactivos.
                </p>

                {/* Bloque docentes */}
                <div style={{
                  backgroundColor: 'rgba(3, 170, 211, 0.12)',
                  border: '1px solid rgba(149, 211, 228, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  marginBottom: '14px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ color: 'var(--primary-light)', flexShrink: 0, marginTop: '2px' }}>
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-light)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      ¿Sos docente?
                    </div>
                    <p style={{ fontSize: '0.93rem', color: '#D1D5DB', lineHeight: 1.55, margin: 0 }}>
                      Encontrá materiales y recursos educativos para trabajar la historia de Malvinas en el aula.
                    </p>
                  </div>
                </div>

                {/* Bloque comunidad */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ color: 'var(--primary-light)', flexShrink: 0, marginTop: '2px' }}>
                    <Users size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-light)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      ¿Sos parte de la comunidad?
                    </div>
                    <p style={{ fontSize: '0.93rem', color: '#D1D5DB', lineHeight: 1.55, margin: 0 }}>
                      Explorá historias, documentos y contenidos audiovisuales para conocer más sobre Malvinas y mantener viva su memoria.
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <Link to="/recursos" style={{ color: 'var(--primary-light)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                    Ver todos los recursos <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exploración de contenidos */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Contenidos</span>
            <h2 className="section-title">Explorá MalvinizAR</h2>
            <p className="section-subtitle">
              Conocé las distintas secciones de la plataforma y encontrá contenidos para aprender, investigar y descubrir la historia de Malvinas.
            </p>
          </div>

          <div className="grid-3">
            {/* Historia */}
            <div className="card">
              <div className="card-icon">
                <BookOpen size={26} />
              </div>
              <h3 className="card-title">Historia y Memoria</h3>
              <p className="card-text">
                Línea de tiempo y contenidos para conocer los principales acontecimientos y antecedentes históricos vinculados a Malvinas.
              </p>
              <Link to="/historia" className="btn btn-outline btn-sm">
                Ver Cronología <ArrowRight size={16} />
              </Link>
            </div>

            {/* Testimonios */}
            <div className="card">
              <div className="card-icon">
                <MessageSquare size={26} />
              </div>
              <h3 className="card-title">Voces en Primera Persona</h3>
              <p className="card-text">
                Entrevistas grabadas por estudiantes de la Universidad Nacional de Pilar a excombatientes, para conocer sus experiencias y preservar sus testimonios.
              </p>
              <Link to="/testimonios" className="btn btn-outline btn-sm">
                Escuchar Testimonios <ArrowRight size={16} />
              </Link>
            </div>

            {/* Recursos Pedagógicos */}
            <div className="card">
              <div className="card-icon">
                <FileText size={26} />
              </div>
              <h3 className="card-title">Recursos Educativos</h3>
              <p className="card-text">
                Materiales y propuestas para trabajar la historia de Malvinas en el aula.
              </p>
              <Link to="/recursos" className="btn btn-outline btn-sm">
                Biblioteca Docente <ArrowRight size={16} />
              </Link>
            </div>

            {/* Diario */}
            <div className="card">
              <div className="card-icon">
                <Compass size={26} />
              </div>
              <h3 className="card-title">Diario Histórico y Cartas</h3>
              <p className="card-text">
                Documentos, cartas y escritos vinculados con la historia y las experiencias de quienes vivieron el conflicto.
              </p>
              <Link to="/diario" className="btn btn-outline btn-sm">
                Consultar Cartas <ArrowRight size={16} />
              </Link>
            </div>

            {/* Archivo Audiovisual */}
            <div className="card">
              <div className="card-icon">
                <Video size={26} />
              </div>
              <h3 className="card-title">Archivo Audiovisual</h3>
              <p className="card-text">
                Un espacio con recursos audiovisuales y materiales complementarios para explorar y aprender sobre Malvinas.
              </p>
              <Link to="/archivo-audiovisual" className="btn btn-outline btn-sm">
                Ver Videos <ArrowRight size={16} />
              </Link>
            </div>

            {/* Juego Educativo */}
            <div className="card" style={{ border: '2px solid var(--primary-light)' }}>
              <div className="card-icon" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
                <Gamepad2 size={26} />
              </div>
              <h3 className="card-title">Juego Interactivo</h3>
              <p className="card-text">
                Una experiencia interactiva para aprender sobre Malvinas de forma dinámica.
              </p>
              <Link to="/juego" className="btn btn-primary btn-sm">
                Jugar Ahora <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Universitario */}
      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Universidad Nacional de Pilar</span>
          <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '18px' }}>
            ¿Cómo nace MalvinizAR?
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
            MalvinizAR nace como una iniciativa de estudiantes de la carrera de Comunicación Digital, con el objetivo de crear un espacio digital educativo que reúna testimonios, materiales históricos y recursos interactivos para acercar la historia de Malvinas a las nuevas generaciones.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/universidad" className="btn btn-primary">
              Conocer el Proyecto
            </Link>
            <Link to="/contacto" className="btn btn-secondary">
              Contactarse
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
