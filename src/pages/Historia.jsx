import { useState } from 'react';
import { historiaData } from '../data/historiaData';
import { BookOpen, Calendar, Flag, Shield, Landmark } from 'lucide-react';

export default function Historia() {
  const [filtro, setFiltro] = useState('todos');

  const eventosFiltrados = filtro === 'todos' 
    ? historiaData 
    : historiaData.filter(item => item.categoria === filtro);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Cronología y Memoria</span>
          <h1 className="section-title">Historia de las Islas Malvinas</h1>
          <p className="section-subtitle">
            Un recorrido cronológico desde las raíces del reclamo soberano y la usurpación de 1833, pasando por el conflicto de 1982, hasta la actualidad democrática.
          </p>
        </div>

        {/* Filtros por etapa */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <button 
            className={`btn btn-sm ${filtro === 'todos' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('todos')}
          >
            Todos los hitos
          </button>
          <button 
            className={`btn btn-sm ${filtro === 'antecedentes' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('antecedentes')}
          >
            Antecedentes Históricos
          </button>
          <button 
            className={`btn btn-sm ${filtro === 'diplomacia' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('diplomacia')}
          >
            Diplomacia y ONU
          </button>
          <button 
            className={`btn btn-sm ${filtro === 'conflicto' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('conflicto')}
          >
            Conflicto de 1982
          </button>
          <button 
            className={`btn btn-sm ${filtro === 'soberania' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('soberania')}
          >
            Soberanía Actual
          </button>
        </div>

        {/* Línea de tiempo visual */}
        <div className="timeline">
          {eventosFiltrados.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className={`timeline-item ${isLeft ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>{item.description}</p>
                  <div style={{ marginTop: '12px' }}>
                    <span className="badge badge-primary">{item.categoria}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
