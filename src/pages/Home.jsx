import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Landmark,
  Gamepad2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { GAME_URL } from '../config/site';

export default function Home() {
  return (
    <div>
      {/* Portada */}
      <section className="hero-section hero-centrado" aria-labelledby="portada-titulo">
        <div className="container">
          <div className="hero-columna">
            <p className="hero-tag">Memoria · Historia · Soberanía</p>
            <h1 id="portada-titulo" className="hero-title">MalvinizAR</h1>
            <p className="hero-lead">
              Un espacio para aprender, enseñar y compartir la memoria de las Islas Malvinas.
            </p>
            <p className="hero-secundario">
              Un proyecto educativo digital creado por y para estudiantes, docentes y toda la comunidad.
            </p>
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

            {/* Museo Virtual */}
            <div className="card">
              <div className="card-icon">
                <Landmark size={26} />
              </div>
              <h3 className="card-title">Museo Virtual</h3>
              <p className="card-text">
                Videos, un diario histórico digitalizado y testimonios para preservar y compartir la memoria de Malvinas.
              </p>
              <Link to="/museo-virtual" className="btn btn-outline btn-sm">
                Recorrer el Museo <ArrowRight size={16} />
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
          </div>
        </div>
      </section>

      {/* Juego Educativo destacado */}
      <section className="juego-banda" aria-labelledby="juego-banda-titulo">
        <div className="container juego-banda-inner">
          <div className="juego-banda-texto">
            <div className="juego-banda-icono" aria-hidden="true">
              <Gamepad2 size={32} />
            </div>
            <div>
              <span className="section-eyebrow">Juego Educativo</span>
              <h2 id="juego-banda-titulo">Aprendé jugando</h2>
              <p>Una experiencia interactiva para aprender sobre Malvinas de forma dinámica.</p>
            </div>
          </div>
          <a
            href={GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            Jugar ahora <ExternalLink size={18} />
          </a>
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
            <Link to="/nosotros" className="btn btn-primary">
              Conocer el Proyecto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
