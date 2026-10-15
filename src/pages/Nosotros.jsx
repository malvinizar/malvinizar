import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function Nosotros() {
  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="section-eyebrow">Nosotros</span>
          <h1 className="section-title">¿Cómo nace MalvinizAR?</h1>
          <p className="section-subtitle">
            Una iniciativa universitaria para acercar la historia de Malvinas a través de la memoria, la comunicación y herramientas digitales de aprendizaje.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--white)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div className="card-icon" style={{ margin: 0 }}>
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Universidad Nacional de Pilar</h2>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Carrera de Comunicación Digital</span>
            </div>
          </div>

          <p style={{ lineHeight: 1.8, marginBottom: '18px', color: 'var(--text-main)' }}>
            Desde la Universidad Nacional de Pilar, estamos comprometidos con la preservación de la memoria histórica de Malvinas y con el desarrollo de nuevas formas de acercar su historia a la sociedad.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '18px', color: 'var(--text-main)' }}>
            <strong>MalvinizAR</strong> nace como una iniciativa de estudiantes de la carrera de Comunicación Digital, con el objetivo de crear un espacio digital educativo que reúna testimonios, materiales históricos y recursos interactivos.
          </p>
          <p style={{ lineHeight: 1.8, color: 'var(--text-main)' }}>
            Buscamos promover una educación innovadora, que combine la tecnología, la comunicación y la memoria para generar nuevas experiencias de aprendizaje y acercar la historia de Malvinas a las nuevas generaciones, las escuelas y la comunidad.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/museo-virtual" className="btn btn-primary">
            Recorrer el Museo Virtual <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
