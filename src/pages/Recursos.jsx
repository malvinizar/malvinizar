import { useState } from 'react';
import { recursosData } from '../data/recursosData';
import { Download, FileText, CheckCircle2, Search, BookOpen } from 'lucide-react';

export default function Recursos() {
  const [nivel, setNivel] = useState('todos');
  const [descargaExitosa, setDescargaExitosa] = useState(null);

  const filtrados = nivel === 'todos'
    ? recursosData
    : recursosData.filter(r => r.nivel.toLowerCase().includes(nivel.toLowerCase()));

  const handleDescargar = (id, titulo) => {
    setDescargaExitosa(`Descargando "${titulo}"...`);
    setTimeout(() => {
      setDescargaExitosa(null);
    }, 4000);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Biblioteca Pedagógica</span>
          <h1 className="section-title">Recursos para Docentes y Estudiantes</h1>
          <p className="section-subtitle">
            Materiales didácticos de libre acceso elaborados por equipos interdisciplinarios para trabajar la causa Malvinas en todos los niveles educativos.
          </p>
        </div>

        {descargaExitosa && (
          <div style={{ 
            backgroundColor: 'rgba(3, 170, 211, 0.15)', 
            border: '1px solid var(--primary)', 
            padding: '12px 20px', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--darker)',
            maxWidth: '600px',
            margin: '0 auto 28px'
          }}>
            <CheckCircle2 size={20} color="var(--primary)" />
            <span>{descargaExitosa}</span>
          </div>
        )}

        {/* Filtros por nivel */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button 
            className={`btn btn-sm ${nivel === 'todos' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setNivel('todos')}
          >
            Todos los niveles
          </button>
          <button 
            className={`btn btn-sm ${nivel === 'primario' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setNivel('primario')}
          >
            Nivel Primario
          </button>
          <button 
            className={`btn btn-sm ${nivel === 'secundario' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setNivel('secundario')}
          >
            Nivel Secundario
          </button>
          <button 
            className={`btn btn-sm ${nivel === 'superior' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setNivel('superior')}
          >
            Nivel Superior / Universitario
          </button>
        </div>

        {/* Grilla de Recursos */}
        <div className="grid-2">
          {filtrados.map((item) => (
            <div key={item.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="badge badge-primary">{item.nivel}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.formato} • {item.paginas}</span>
              </div>

              <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{item.titulo}</h3>
              <p className="card-text">{item.descripcion}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {item.descargas.toLocaleString()} descargas
                </span>
                <button 
                  onClick={() => handleDescargar(item.id, item.titulo)}
                  className="btn btn-primary btn-sm"
                >
                  <Download size={16} />
                  Descargar Recurso
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
