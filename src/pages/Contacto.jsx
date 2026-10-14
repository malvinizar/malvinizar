import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, MapPin } from 'lucide-react';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '', tipo: 'consulta' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="section-eyebrow">Comunicación y Aportes</span>
          <h1 className="section-title">Contacto y Colaboración</h1>
          <p className="section-subtitle">
            Si sos veterano, familiar, docente o tenés documentos históricos, cartas o fotografías que desees sumar al archivo público, escribinos.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--white)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          {enviado ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle2 size={56} style={{ color: 'var(--primary)', margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>¡Mensaje Enviado con Éxito!</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 24px' }}>
                Muchas gracias por tu compromiso con la memoria. El equipo de MalvinizAR se pondrá en contacto a la brevedad.
              </p>
              <button className="btn btn-outline" onClick={() => setEnviado(false)}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Nombre y Apellido *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Tu nombre completo"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Correo Electrónico *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="ejemplo@correo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Motivo del Contacto
                </label>
                <select 
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.95rem', backgroundColor: 'var(--white)' }}
                >
                  <option value="consulta">Consulta General / Docente</option>
                  <option value="testimonio">Aporte de Testimonio Oral</option>
                  <option value="documento">Donación de Cartas o Fotografías Digitalizadas</option>
                  <option value="universidad">Propuesta Institucional / Académica</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Mensaje o Relato *
                </label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Escribí aquí tu mensaje, duda o descripción del material histórico..."
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.95rem', resize: 'vertical' }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
                <Send size={18} />
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
