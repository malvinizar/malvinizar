import { MuseoNav, EnlaceFlecha } from '../../museo/componentes';

export default function NoEncontrado({ que = 'página' }) {
  return (
    <div className="mv">
      <MuseoNav />
      <div className="mv-contenedor mv-no-encontrado">
        <h1>No encontramos esta {que}</h1>
        <p>Puede que haya cambiado de nombre o que todavía no esté publicada.</p>
        <EnlaceFlecha to="/museo-virtual/archivo">Ir al catálogo</EnlaceFlecha>
      </div>
    </div>
  );
}
