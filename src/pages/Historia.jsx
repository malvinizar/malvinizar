import { useState } from 'react';
import { historiaData } from '../data/historiaData';
import { 
  RotateCw, 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ExternalLink, 
  Calendar, 
  Info,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Historia() {
  const [filtro, setFiltro] = useState('todos');
  const [tarjetasGiradas, setTarjetasGiradas] = useState({});
  const [respuestasQuiz, setRespuestasQuiz] = useState({});

  // Manejo de filtrado
  const eventosFiltrados = historiaData.filter(item => {
    if (filtro === 'todos') return true;
    if (item.categoria === filtro) return true;
    if (item.categoriaSecundaria === filtro) return true;
    return false;
  });

  // Al cambiar de filtro, regresamos las tarjetas al frente para evitar descontextualización
  const handleFiltroChange = (nuevaCategoria) => {
    setFiltro(nuevaCategoria);
    setTarjetasGiradas({});
  };

  // Alternar giro de tarjeta individual
  const toggleFlip = (id) => {
    setTarjetasGiradas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Manejo de respuestas del quiz (con persistencia para cada hito)
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

        {/* Filtros de etapas históricas */}
        <nav 
          aria-label="Filtros de la cronología" 
          style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}
        >
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'todos' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFiltroChange('todos')}
          >
            Todos los hitos
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'antecedentes' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFiltroChange('antecedentes')}
          >
            Antecedentes históricos
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'diplomacia' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFiltroChange('diplomacia')}
          >
            Diplomacia y ONU
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'conflicto' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFiltroChange('conflicto')}
          >
            Conflicto de 1982
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'memoria' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFiltroChange('memoria')}
          >
            Memoria y democracia
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${filtro === 'soberania' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFiltroChange('soberania')}
          >
            Soberanía actual
          </button>
        </nav>

        {/* Grilla responsiva de tarjetas giratorias (flip cards) */}
        <div className="flip-cards-grid" role="region" aria-label="Acontecimientos históricos en tarjetas giratorias">
          {eventosFiltrados.map((item) => {
            const isFlipped = !!tarjetasGiradas[item.id];
            const userChoice = respuestasQuiz[item.id];
            const isAnswered = !!userChoice;
            const isCorrect = userChoice === item.quiz.correcta;
            const imageSrc = `${import.meta.env.BASE_URL}${item.image}`;

            return (
              <div 
                key={item.id} 
                className="flip-card-wrapper"
                aria-label={`Tarjeta histórica: ${item.title}`}
              >
                <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  
                  {/* ===================================================
                      CARA FRONTAL: Imagen, Fecha, Categoría, Resumen y CTA
                      =================================================== */}
                  <div 
                    className="flip-card-front"
                    onClick={() => toggleFlip(item.id)}
                    role="button"
                    tabIndex={isFlipped ? -1 : 0}
                    aria-label={`Girar para descubrir la historia de: ${item.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFlip(item.id);
                      }
                    }}
                  >
                    {/* Imagen horizontal consistente 16:9 */}
                    <div style={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      backgroundColor: '#E2E8F0',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img 
                        src={imageSrc} 
                        alt={item.imageAlt}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {/* Badge flotante de fecha */}
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        backgroundColor: 'rgba(19, 26, 43, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: 'var(--white)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        letterSpacing: '0.02em'
                      }}>
                        <Calendar size={13} color="var(--primary-light)" />
                        <span>{item.year}</span>
                      </div>
                    </div>

                    {/* Cuerpo frontal */}
                    <div style={{ padding: '18px 20px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Categoría */}
                      <div style={{ marginBottom: '8px' }}>
                        <span 
                          className="badge" 
                          style={{ 
                            backgroundColor: 'var(--primary-soft)', 
                            color: 'var(--primary)',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          {item.categoriaLabel}
                        </span>
                      </div>

                      {/* Título */}
                      <h2 style={{ 
                        fontSize: '1.18rem', 
                        fontWeight: 800, 
                        color: 'var(--darker)', 
                        marginBottom: '8px',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.title}
                      </h2>

                      {/* Resumen breve */}
                      <p style={{ 
                        color: 'var(--text-muted)', 
                        fontSize: '0.9rem', 
                        lineHeight: 1.55, 
                        margin: 0,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.resumen}
                      </p>

                      {/* Botón visual de acción para girar */}
                      <div style={{ 
                        marginTop: '16px', 
                        paddingTop: '12px', 
                        borderTop: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '0.88rem'
                      }}>
                        <span>Girar para descubrir</span>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-soft)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <RotateCw size={15} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===================================================
                      CARA POSTERIOR: Información, Quiz y Fuente
                      =================================================== */}
                  <div 
                    className="flip-card-back"
                    aria-hidden={!isFlipped}
                  >
                    {/* Barra superior de control: Volver al frente */}
                    <div style={{
                      padding: '12px 18px',
                      backgroundColor: 'var(--surface-alt)',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexShrink: 0
                    }}>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(item.id);
                        }}
                        tabIndex={isFlipped ? 0 : -1}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: 'var(--white)',
                          border: '1px solid var(--border)',
                          color: 'var(--dark)',
                          padding: '6px 12px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          gap: '6px'
                        }}
                        aria-label="Volver al frente de la tarjeta"
                      >
                        <ArrowLeft size={14} />
                        <span>Volver al frente</span>
                      </button>

                      <span style={{ 
                        fontSize: '0.78rem', 
                        fontWeight: 700, 
                        color: 'var(--text-muted)' 
                      }}>
                        {item.year}
                      </span>
                    </div>

                    {/* Contenido scrolleable del dorso */}
                    <div className="flip-card-back-body">
                      {/* Título en dorso */}
                      <h2 style={{ 
                        fontSize: '1.15rem', 
                        fontWeight: 800, 
                        color: 'var(--darker)', 
                        marginBottom: '14px',
                        lineHeight: 1.3
                      }}>
                        {item.title}
                      </h2>

                      {/* Contexto histórico */}
                      <div style={{ marginBottom: '14px' }}>
                        <div style={{ 
                          fontSize: '0.78rem', 
                          fontWeight: 700, 
                          color: 'var(--primary)', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.04em',
                          marginBottom: '4px' 
                        }}>
                          Contexto histórico
                        </div>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                          {item.contexto}
                        </p>
                      </div>

                      {/* ¿Qué ocurrió? */}
                      <div style={{ marginBottom: '14px' }}>
                        <div style={{ 
                          fontSize: '0.78rem', 
                          fontWeight: 700, 
                          color: 'var(--primary)', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.04em',
                          marginBottom: '4px' 
                        }}>
                          ¿Qué ocurrió?
                        </div>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                          {item.queOcurrio}
                        </p>
                      </div>

                      {/* ¿Por qué fue importante? */}
                      <div style={{ marginBottom: '14px' }}>
                        <div style={{ 
                          fontSize: '0.78rem', 
                          fontWeight: 700, 
                          color: 'var(--primary)', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.04em',
                          marginBottom: '4px' 
                        }}>
                          ¿Por qué fue importante?
                        </div>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                          {item.porQueImportante}
                        </p>
                      </div>

                      {/* Cita legal oficial (solo hito 12) */}
                      {item.clausulaLegal && (
                        <div style={{ 
                          backgroundColor: 'rgba(3, 170, 211, 0.08)', 
                          borderLeft: '3px solid var(--primary)', 
                          padding: '12px 14px', 
                          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                          marginBottom: '18px'
                        }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                            Constitución Nacional — Cláusula Transitoria Primera
                          </div>
                          <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--darker)', lineHeight: 1.55, margin: 0 }}>
                            {item.clausulaLegal}
                          </p>
                        </div>
                      )}

                      {/* Pregunta pedagógica de comprensión */}
                      <div 
                        style={{ 
                          backgroundColor: '#F8FAFC', 
                          border: '1px solid var(--border)', 
                          borderRadius: 'var(--radius-md)', 
                          padding: '16px',
                          marginBottom: '16px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <HelpCircle size={16} color="var(--primary)" />
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--dark)' }}>
                            Pregunta de comprensión
                          </span>
                        </div>

                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--darker)', marginBottom: '12px', lineHeight: 1.45 }}>
                          {item.quiz.pregunta}
                        </p>

                        {/* Opciones A, B, C */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '10px' }}>
                          {item.quiz.opciones.map(opt => {
                            let btnStyle = {
                              textAlign: 'left',
                              padding: '8px 12px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border)',
                              backgroundColor: 'var(--white)',
                              cursor: isAnswered ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '0.85rem',
                              fontFamily: 'inherit',
                              transition: 'all 0.2s ease',
                              color: 'var(--text-main)',
                              width: '100%'
                            };

                            if (isAnswered) {
                              if (opt.id === item.quiz.correcta) {
                                btnStyle.backgroundColor = 'rgba(16, 185, 129, 0.12)';
                                btnStyle.borderColor = '#10B981';
                                btnStyle.color = '#065F46';
                                btnStyle.fontWeight = 700;
                              } else if (opt.id === userChoice) {
                                btnStyle.backgroundColor = 'rgba(239, 68, 68, 0.12)';
                                btnStyle.borderColor = '#EF4444';
                                btnStyle.color = '#991B1B';
                              } else {
                                btnStyle.opacity = 0.55;
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                disabled={isAnswered}
                                tabIndex={isFlipped ? 0 : -1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnswer(item.id, opt.id);
                                }}
                                style={btnStyle}
                              >
                                <span style={{ 
                                  display: 'inline-flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  width: '22px', 
                                  height: '22px', 
                                  borderRadius: '50%', 
                                  backgroundColor: opt.id === userChoice ? 'currentColor' : '#E2E8F0', 
                                  color: opt.id === userChoice ? '#FFF' : 'var(--dark)', 
                                  fontSize: '0.74rem',
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

                        {/* Feedback formativo */}
                        {isAnswered && (
                          <div style={{
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            borderLeft: `3px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            marginTop: '8px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 size={16} color="#10B981" />
                                  <span style={{ fontWeight: 700, color: '#065F46', fontSize: '0.85rem' }}>
                                    ¡Respuesta correcta!
                                  </span>
                                </>
                              ) : (
                                <>
                                  <XCircle size={16} color="#EF4444" />
                                  <span style={{ fontWeight: 700, color: '#991B1B', fontSize: '0.85rem' }}>
                                    Respuesta incorrecta
                                  </span>
                                </>
                              )}
                            </div>
                            <p style={{ margin: 0, fontSize: '0.83rem', color: isCorrect ? '#065F46' : '#991B1B', lineHeight: 1.45 }}>
                              {isCorrect ? item.quiz.explicacion : 'Podés repasar la explicación de la tarjeta y volver a intentarlo.'}
                            </p>
                            {!isCorrect && (
                              <button
                                type="button"
                                tabIndex={isFlipped ? 0 : -1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleResetQuiz(item.id);
                                }}
                                className="btn btn-sm"
                                style={{
                                  alignSelf: 'flex-start',
                                  marginTop: '4px',
                                  backgroundColor: 'var(--white)',
                                  border: '1px solid #EF4444',
                                  color: '#991B1B',
                                  padding: '3px 10px',
                                  fontSize: '0.78rem',
                                  display: 'inline-flex',
                                  gap: '4px'
                                }}
                              >
                                <RotateCcw size={12} />
                                Intentar de nuevo
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Fuente documental o bibliográfica */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '8px', 
                          fontSize: '0.8rem', 
                          color: 'var(--text-muted)',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--border)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Info size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div>
                            <strong>Fuente:</strong> {item.fuente.institucion} — <em>{item.fuente.descripcion}</em> ({item.fuente.tipo}).
                          </div>
                          {item.fuente.url && (
                            <a 
                              href={item.fuente.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              tabIndex={isFlipped ? 0 : -1}
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
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
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
