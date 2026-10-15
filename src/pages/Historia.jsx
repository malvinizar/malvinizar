import { useState } from 'react';
import { historiaData } from '../data/historiaData';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ExternalLink, 
  BookOpen, 
  Calendar, 
  Info,
  Image as ImageIcon
} from 'lucide-react';

export default function Historia() {
  const [filtro, setFiltro] = useState('todos');
  const [expandidos, setExpandidos] = useState({});
  const [respuestasQuiz, setRespuestasQuiz] = useState({});

  // Manejo de filtrado
  const eventosFiltrados = historiaData.filter(item => {
    if (filtro === 'todos') return true;
    if (item.categoria === filtro) return true;
    if (item.categoriaSecundaria === filtro) return true;
    return false;
  });

  // Alternar expansión de una tarjeta
  const toggleExpand = (id) => {
    setExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Manejo de respuestas del quiz interactivo
  const handleAnswer = (hitoId, opcionId) => {
    setRespuestasQuiz(prev => ({
      ...prev,
      [hitoId]: opcionId
    }));
  };

  const handleResetQuiz = (hitoId) => {
    setRespuestasQuiz(prev => {
      const nuevo = { ...prev };
      delete nuevo[hitoId];
      return nuevo;
    });
  };

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Encabezado */}
        <div className="section-header">
          <span className="section-eyebrow">Cronología y Memoria</span>
          <h1 className="section-title">Historia de las Islas Malvinas</h1>
          <p className="section-subtitle">
            Un recorrido por la historia de las Islas Malvinas: sus antecedentes, la disputa de soberanía, la guerra de 1982 y el camino de la memoria, la democracia y la diplomacia hasta nuestros días.
          </p>
        </div>

        {/* Filtros funcionales */}
        <nav 
          aria-label="Filtros de la cronología" 
          style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '44px' }}
        >
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'todos' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('todos')}
          >
            Todos los hitos
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'antecedentes' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('antecedentes')}
          >
            Antecedentes históricos
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'diplomacia' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('diplomacia')}
          >
            Diplomacia y ONU
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'conflicto' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('conflicto')}
          >
            Conflicto de 1982
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'memoria' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('memoria')}
          >
            Memoria y democracia
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'soberania' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFiltro('soberania')}
          >
            Soberanía actual
          </button>
        </nav>

        {/* Listado de hitos cronológicos */}
        <div className="timeline" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {eventosFiltrados.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = !!expandidos[item.id];
            const userChoice = respuestasQuiz[item.id];
            const isAnswered = !!userChoice;
            const isCorrect = userChoice === item.quiz.correcta;
            const imageSrc = `${import.meta.env.BASE_URL}${item.image}`;

            return (
              <article 
                key={item.id} 
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
                aria-labelledby={`hito-title-${item.id}`}
              >
                <div className="timeline-content" style={{ padding: '24px' }}>
                  {/* Encabezado de la tarjeta: Fecha y Categoría */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: '8px', 
                    marginBottom: '10px' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} color="var(--primary)" />
                      <span className="timeline-year" style={{ margin: 0, fontSize: '1.05rem' }}>
                        {item.year}
                      </span>
                    </div>
                    <span 
                      className="badge" 
                      style={{ 
                        backgroundColor: 'var(--primary-soft)', 
                        color: 'var(--primary)',
                        fontSize: '0.75rem',
                        fontWeight: 700 
                      }}
                    >
                      {item.categoriaLabel}
                    </span>
                  </div>

                  {/* Título */}
                  <h2 
                    id={`hito-title-${item.id}`} 
                    style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--darker)', marginBottom: '14px', lineHeight: 1.3 }}
                  >
                    {item.title}
                  </h2>

                  {/* Imagen local correspondiente */}
                  <div style={{
                    width: '100%',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid var(--border)'
                  }}>
                    <img 
                      src={imageSrc} 
                      alt={item.imageAlt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '240px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        // Fallback elegante en caso de que la imagen aún no haya sido copiada
                        e.target.style.display = 'none';
                        if (e.target.nextElementSibling) {
                          e.target.nextElementSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div 
                      style={{
                        display: 'none',
                        height: '140px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '8px',
                        color: 'var(--text-muted)',
                        backgroundColor: '#F8FAFC',
                        padding: '16px',
                        textAlign: 'center'
                      }}
                    >
                      <ImageIcon size={28} color="var(--primary)" />
                      <span style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                        Fotografía histórica: {item.title}
                      </span>
                    </div>
                  </div>

                  {/* Resumen histórico */}
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '16px' }}>
                    {item.resumen}
                  </p>

                  {/* Control Conocer más */}
                  <button 
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`detalle-hito-${item.id}`}
                    className="btn btn-outline btn-sm"
                    style={{ 
                      width: '100%', 
                      justifyContent: 'space-between',
                      fontWeight: 600,
                      borderColor: 'var(--border)'
                    }}
                  >
                    <span>{isExpanded ? 'Ocultar detalles' : 'Conocer más'}</span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {/* Panel expandido */}
                  {isExpanded && (
                    <div 
                      id={`detalle-hito-${item.id}`}
                      style={{ 
                        marginTop: '20px', 
                        paddingTop: '20px', 
                        borderTop: '1px solid var(--border)',
                        textAlign: 'left'
                      }}
                    >
                      {/* Contexto histórico */}
                      <div style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Contexto histórico
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                          {item.contexto}
                        </p>
                      </div>

                      {/* Qué ocurrió */}
                      <div style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          ¿Qué ocurrió?
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                          {item.queOcurrio}
                        </p>
                      </div>

                      {/* Por qué fue importante */}
                      <div style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          ¿Por qué fue importante?
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                          {item.porQueImportante}
                        </p>
                      </div>

                      {/* Cita legal oficial (solo hito 12) */}
                      {item.clausulaLegal && (
                        <div style={{ 
                          backgroundColor: 'rgba(3, 170, 211, 0.08)', 
                          borderLeft: '4px solid var(--primary)', 
                          padding: '14px 16px', 
                          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                          marginBottom: '20px'
                        }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Constitución de la Nación Argentina — Cláusula Transitoria Primera
                          </div>
                          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--darker)', lineHeight: 1.6, margin: 0 }}>
                            {item.clausulaLegal}
                          </p>
                        </div>
                      )}

                      {/* Pregunta de comprensión interactiva */}
                      <div style={{ 
                        backgroundColor: '#F8FAFC', 
                        border: '1px solid var(--border)', 
                        borderRadius: 'var(--radius-md)', 
                        padding: '18px',
                        marginBottom: '18px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                          <HelpCircle size={18} color="var(--primary)" />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--dark)' }}>
                            Pregunta de comprensión
                          </span>
                        </div>

                        <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--darker)', marginBottom: '14px', lineHeight: 1.4 }}>
                          {item.quiz.pregunta}
                        </p>

                        {/* Opciones */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                          {item.quiz.opciones.map(opt => {
                            let btnStyle = {
                              textAlign: 'left',
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border)',
                              backgroundColor: 'var(--white)',
                              cursor: isAnswered ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '0.9rem',
                              fontFamily: 'inherit',
                              transition: 'all 0.2s ease',
                              color: 'var(--text-main)'
                            };

                            if (isAnswered) {
                              if (opt.id === item.quiz.correcta) {
                                btnStyle.backgroundColor = 'rgba(16, 185, 129, 0.12)';
                                btnStyle.borderColor = '#10B981';
                                btnStyle.color = '#065F46';
                                btnStyle.fontWeight = 600;
                              } else if (opt.id === userChoice) {
                                btnStyle.backgroundColor = 'rgba(239, 68, 68, 0.12)';
                                btnStyle.borderColor = '#EF4444';
                                btnStyle.color = '#991B1B';
                              } else {
                                btnStyle.opacity = 0.6;
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                disabled={isAnswered}
                                onClick={() => handleAnswer(item.id, opt.id)}
                                style={btnStyle}
                              >
                                <span style={{ 
                                  display: 'inline-flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  width: '24px', 
                                  height: '24px', 
                                  borderRadius: '50%', 
                                  backgroundColor: opt.id === userChoice ? 'currentColor' : '#E2E8F0', 
                                  color: opt.id === userChoice ? '#FFF' : 'var(--dark)', 
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  flexShrink: 0
                                }}>
                                  {opt.id}
                                </span>
                                <span>{opt.texto}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Mensaje de feedback */}
                        {isAnswered && (
                          <div style={{
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            borderLeft: `4px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            marginTop: '10px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 size={18} color="#10B981" />
                                  <span style={{ fontWeight: 700, color: '#065F46', fontSize: '0.9rem' }}>
                                    ¡Respuesta correcta!
                                  </span>
                                </>
                              ) : (
                                <>
                                  <XCircle size={18} color="#EF4444" />
                                  <span style={{ fontWeight: 700, color: '#991B1B', fontSize: '0.9rem' }}>
                                    Respuesta incorrecta
                                  </span>
                                </>
                              )}
                            </div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: isCorrect ? '#065F46' : '#991B1B', lineHeight: 1.5 }}>
                              {isCorrect ? item.quiz.explicacion : 'Podés repasar el texto del hito y volver a intentarlo.'}
                            </p>
                            {!isCorrect && (
                              <button
                                type="button"
                                onClick={() => handleResetQuiz(item.id)}
                                className="btn btn-sm"
                                style={{
                                  alignSelf: 'flex-start',
                                  marginTop: '6px',
                                  backgroundColor: 'var(--white)',
                                  border: '1px solid #EF4444',
                                  color: '#991B1B',
                                  padding: '4px 12px',
                                  fontSize: '0.8rem'
                                }}
                              >
                                <RotateCcw size={14} />
                                Intentar de nuevo
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Fuente documental o bibliográfica */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px', 
                        fontSize: '0.84rem', 
                        color: 'var(--text-muted)',
                        paddingTop: '8px',
                        borderTop: '1px solid var(--border)'
                      }}>
                        <Info size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div>
                            <strong>Fuente:</strong> {item.fuente.institucion} — <em>{item.fuente.descripcion}</em> ({item.fuente.tipo}).
                          </div>
                          {item.fuente.url && (
                            <a 
                              href={item.fuente.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ 
                                color: 'var(--primary)', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '4px', 
                                marginTop: '4px',
                                fontWeight: 600
                              }}
                            >
                              <span>Consultar documento</span>
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
