import { Gamepad2, Sparkles, MapPin, Trophy, Shield, ExternalLink } from 'lucide-react';

export default function Juego() {
  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="section-eyebrow">Gamificación Pedagógica</span>
          <h1 className="section-title">Malvinas: La Aventura de la Soberanía</h1>
          <p className="section-subtitle">
            Una experiencia interactiva y lúdica diseñada para aprender sobre geografía, historia y fauna malvinense a través de misiones y desafíos formativos.
          </p>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%)', 
          color: 'var(--white)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '48px 36px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '40px',
          border: '1px solid rgba(149, 211, 228, 0.2)'
        }}>
          <div style={{ 
            width: '72px', 
            height: '72px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--primary)', 
            color: 'var(--white)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 0 25px rgba(3, 170, 211, 0.6)'
          }}>
            <Gamepad2 size={36} />
          </div>

          <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '12px' }}>
            Explorá el Archipiélago
          </h2>
          <p style={{ color: '#D1D5DB', maxWidth: '580px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Ponete en la piel de un joven historiador que debe recuperar diarios perdidos, descifrar mensajes de comunicaciones de época y responder trivias sobre la biodiversidad de las islas.
          </p>

          <a 
            href="https://github.com/malvinizar/malvinizar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', gap: '10px' }}
          >
            <span>Iniciar Juego Interactivo</span>
            <ExternalLink size={18} />
          </a>
        </div>

        <div className="grid-3">
          <div className="card">
            <div className="card-icon">
              <MapPin size={24} />
            </div>
            <h3 className="card-title">Misiones Geográficas</h3>
            <p className="card-text">
              Reconocé los principales accidentes costeros, estrechos y elevaciones como Monte Longdon y Dos Hermanas.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              <Shield size={24} />
            </div>
            <h3 className="card-title">Trivias de Historia</h3>
            <p className="card-text">
              Completá desafíos sobre las resoluciones de la ONU, la Carta de Naciones Unidas y los héroes patrios.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              <Trophy size={24} />
            </div>
            <h3 className="card-title">Insignias y Logros</h3>
            <p className="card-text">
              Desbloqueá medallas virtuales para certificar tus conocimientos ante tus docentes y compañeros de curso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
