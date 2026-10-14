import { useState } from 'react';
import { testimoniosData } from '../data/testimoniosData';
import { Quote, User, Shield, Heart, PlayCircle } from 'lucide-react';

export default function Testimonios() {
  const [categoria, setCategoria] = useState('todos');

  const filtrados = categoria === 'todos'
    ? testimoniosData
    : testimoniosData.filter(t => t.categoria === categoria);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Voces de la Memoria</span>
          <h1 className="section-title">Testimonios en Primera Persona</h1>
          <p className="section-subtitle">
            Relatos orales de combatientes, enfermeras y familiares que compartieron su experiencia directa durante el conflicto en las islas y en el Atlántico Sur.
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button 
            className={`btn btn-sm ${categoria === 'todos' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCategoria('todos')}
          >
            Todos los testimonios
          </button>
          <button 
            className={`btn btn-sm ${categoria === 'combatiente' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCategoria('combatiente')}
          >
            Soldados Combatientes
          </button>
          <button 
            className={`btn btn-sm ${categoria === 'sanidad' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCategoria('sanidad')}
          >
            Sanidad y Enfermeras
          </button>
          <button 
            className={`btn btn-sm ${categoria === 'familiares' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCategoria('familiares')}
          >
            Familias y Memoria
          </button>
        </div>

        {/* Grilla de Testimonios */}
        <div className="grid-2">
          {filtrados.map((item) => (
            <div key={item.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span className="badge badge-primary">{item.rol}</span>
                <Quote size={28} style={{ color: 'var(--primary-light)', opacity: 0.6 }} />
              </div>

              <blockquote style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--darker)', lineHeight: 1.6, marginBottom: '20px' }}>
                "{item.cita}"
              </blockquote>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{item.nombre}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {item.unidad}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {item.biografia}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
