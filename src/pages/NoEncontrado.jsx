import { Link } from 'react-router-dom';

export default function NoEncontrado({ que = 'página' }) {
  return (
    <section className="seccion">
      <div className="contenedor contenedor--angosto no-encontrado">
                <h1 className="titulo titulo--lg">No encontramos esta {que}</h1>
        <p>Puede que haya cambiado de nombre o que todavía no esté publicada.</p>
        <Link to="/producciones" className="btn">Ver las producciones</Link>
      </div>
    </section>
  );
}
