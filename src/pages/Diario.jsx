import { useState } from 'react';
import { diarioData } from '../data/diarioData';
import { Calendar, MapPin, Mail, BookOpen, Quote } from 'lucide-react';

export default function Diario() {
  const [seleccionado, setSeleccionado] = useState(diarioData[0]);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Archivo Documental</span>
          <h1 className="section-title">Diario Histórico y Epistolario</h1>
          <p className="section-subtitle">
            Fragmentos de correspondencia, anotaciones de campaña y testimonios manuscritos que preservan los pensamientos íntimos de quienes estuvieron en las islas en 1982.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          {/* Lista de cartas/entradas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Documentos Disponibles</h3>
            {diarioData.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSeleccionado(item)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: seleccionado.id === item.id ? 'var(--white)' : 'var(--surface-alt)',
                  border: seleccionado.id === item.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '4px' }}>
                  {item.fecha}
                </div>
                <h4 style={{ fontSize: '0.98rem', marginBottom: '4px', color: 'var(--darker)' }}>
                  {item.titulo}
                </h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {item.autor} • {item.ubicacion}
                </div>
              </div>
            ))}
          </div>

          {/* Lector de documento */}
          <div style={{ 
            backgroundColor: 'var(--white)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '36px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Documento Histórico</span>
                <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>{seleccionado.titulo}</h2>
              </div>
              <Mail size={32} style={{ color: 'var(--primary-light)' }} />
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} /> {seleccionado.fecha}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} /> {seleccionado.ubicacion}
              </span>
            </div>

            <div style={{ 
              backgroundColor: 'var(--surface-alt)', 
              padding: '28px', 
              borderRadius: 'var(--radius-md)', 
              borderLeft: '4px solid var(--primary)',
              fontStyle: 'italic',
              fontSize: '1.12rem',
              lineHeight: 1.8,
              color: 'var(--darker)',
              marginBottom: '24px'
            }}>
              "{seleccionado.extracto}"
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'right' }}>
              — Registro documental original: <strong>{seleccionado.autor}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
