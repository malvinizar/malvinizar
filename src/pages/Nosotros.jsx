import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import inicio from '../content/inicio.json';
import { FORM_URL } from '../config/site';
import { assetUrl, piezas } from '../producciones/datos';
import { useMetaPagina } from '../producciones/componentes';
import { LogoUnpilar } from '../components/marca/Marca';

export default function Nosotros() {
  useMetaPagina('Nosotros', inicio.texto);
  const foto = inicio.fotos[0];
  const autores = new Set(piezas.flatMap((p) => p.autores.map((a) => a.nombre)));

  return (
    <>
      <section className="cabecera-pagina">
        <div className="contenedor">
          <p className="etiqueta-seccion">Nosotros</p>
          <h1 className="titulo titulo--xl">{inicio.titulo}</h1>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor nosotros-grid">
          <figure className="nosotros-foto">
            <img src={assetUrl(foto.imagen)} alt={foto.alt} />
            <figcaption>{foto.pie}</figcaption>
          </figure>

          <article className="nosotros-texto">
            <p className="nosotros-destacado">{inicio.texto}</p>
            <p>
              Hoy MalvinizAR es la plataforma que aloja las producciones sobre Malvinas realizadas en la Universidad
              Nacional de Pilar: podcasts, videos, infografías, presentaciones, fotografías y juegos hechos por
              estudiantes en distintas materias.
            </p>
            <p>
              La pieza principal es <Link to="/juego">el juego</Link>, una trivia pensada para la escuela secundaria.
              Las <Link to="/producciones">producciones</Link> se pueden recorrer por formato o por tema, y la{' '}
              <Link to="/historia">cronología</Link> conecta cada hito con los trabajos que lo abordan.
            </p>

            <dl className="nosotros-cifras">
              <div>
                <dt>Producciones</dt>
                <dd>{piezas.length}</dd>
              </div>
              <div>
                <dt>Estudiantes</dt>
                <dd>{autores.size}+</dd>
              </div>
              <div>
                <dt>Carrera</dt>
                <dd className="nosotros-cifras-texto">Comunicación Digital</dd>
              </div>
            </dl>

            <div className="nosotros-unpilar">
              <LogoUnpilar />
            </div>
          </article>
        </div>
      </section>

      {FORM_URL && (
        <section className="seccion">
          <div className="contenedor">
           <div className="banda">
            <div>
              <p className="etiqueta-seccion">¿Hiciste una producción sobre Malvinas?</p>
              <h2 className="titulo titulo--md">Sumala a MalvinizAR</h2>
              <p>Completá el formulario con el título, autores, materia, docente, año y formato de tu trabajo.</p>
            </div>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn--blanco">
              Ir al formulario <ArrowRight size={18} aria-hidden="true" />
            </a>
           </div>
          </div>
        </section>
      )}
    </>
  );
}
