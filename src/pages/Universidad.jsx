import { GraduationCap, Award, BookCheck, Users, Globe } from 'lucide-react';

export default function Universidad() {
  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="section-eyebrow">Institucional</span>
          <h1 className="section-title">El Proyecto Universitario</h1>
          <p className="section-subtitle">
            Un puente entre la investigación académica, la extensión comunitaria y la escuela argentina.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--white)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div className="card-icon" style={{ margin: 0 }}>
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Misión y Compromiso Soberano</h2>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Cátedra Abierta de Malvinas y Atlántico Sur</span>
            </div>
          </div>

          <p style={{ lineHeight: 1.7, marginBottom: '16px' }}>
            La plataforma <strong>MalvinizAR</strong> nace con la convicción de que la universidad pública debe cumplir un rol central en la preservación de la memoria colectiva, la desclasificación y análisis de fuentes históricas y la divulgación científica sobre nuestros archipiélagos y mares australes.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            A través de un trabajo conjunto entre historiadores, educadores, veteranos de guerra y desarrolladores, el proyecto democratiza el acceso a testimonios auténticos y herramientas didácticas validadas para que docentes de cualquier rincón del país puedan abordar la temática con rigor, respeto y profundidad.
          </p>
        </div>

        <div className="grid-2">
          <div className="card">
            <h3 className="card-title">Objetivos Pedagógicos</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              <li>Promover el pensamiento crítico en torno al colonialismo en el siglo XXI.</li>
              <li>Valorar el testimonio de los veteranos y enfermeras como fuente primaria insustituible.</li>
              <li>Integrar el enfoque bicontinental y la riqueza ecológica del Mar Argentino.</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Equipo Interdisciplinario</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              <li><strong>Dirección del Proyecto:</strong> Cátedra de Historia Argentina Contemporánea.</li>
              <li><strong>Asesoría Histórica:</strong> Archivo Oral de Veteranos de Guerra.</li>
              <li><strong>Desarrollo Digital:</strong> Equipo de Extensión Universitaria en Tecnologías.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
