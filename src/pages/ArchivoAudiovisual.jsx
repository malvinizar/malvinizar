import { audiovisualData } from '../data/diarioData';
import { Play, Clock, Film } from 'lucide-react';

export default function ArchivoAudiovisual() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Multimedia y Documentales</span>
          <h1 className="section-title">Archivo Audiovisual Malvinas</h1>
          <p className="section-subtitle">
            Producciones audiovisuales, entrevistas y materiales de divulgación histórica para acercar el testimonio directo a las nuevas generaciones.
          </p>
        </div>

        <div className="grid-3">
          {audiovisualData.map((item) => (
            <div key={item.id} className="card" style={{ padding: 0 }}>
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                <img 
                  src={item.thumbnail} 
                  alt={item.titulo} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  right: '12px', 
                  backgroundColor: 'rgba(19, 26, 43, 0.85)', 
                  color: 'var(--white)', 
                  padding: '4px 8px', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={14} /> {item.duracion}
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
                  {item.categoria}
                </span>
                <h3 className="card-title" style={{ fontSize: '1.15rem' }}>{item.titulo}</h3>
                <p className="card-text">{item.descripcion}</p>

                <button 
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                  onClick={() => alert(`Iniciando reproducción de: ${item.titulo}`)}
                >
                  <Play size={16} fill="currentColor" /> Reproducir Documental
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
