import { piezas, config } from '../producciones/datos';
import { GrillaPiezas, useMetaPagina } from '../producciones/componentes';

export default function Producciones() {
  useMetaPagina('Producciones de estudiantes', config.descripcion);

  return (
    <>
      <section className="cabecera-pagina">
        <div className="contenedor">
          <p className="etiqueta-seccion">Hechas en la UNPILAR</p>
          <h1 className="titulo titulo--xl">{config.nombre}</h1>
          <p className="bajada">{config.descripcion}</p>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <GrillaPiezas piezas={piezas} />
        </div>
      </section>
    </>
  );
}
