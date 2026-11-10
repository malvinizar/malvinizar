import { Link } from 'react-router-dom';
import { GAME_URL, NAV_ITEMS } from '../../config/site';
import { Logotipo, LogoUnpilar, SolDeMayo } from '../marca/Marca';

export default function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor pie-grid">
        <div className="pie-marca">
          <a href="https://unpilar.edu.ar" target="_blank" rel="noopener noreferrer" className="pie-unpilar">
            <LogoUnpilar variante="blanco" />
          </a>
          <div className="pie-logo">
            <SolDeMayo className="pie-sol" conCara={false} />
            <Logotipo tamano="sm" />
          </div>
          <p>
            Plataforma que reúne las producciones sobre Malvinas realizadas por estudiantes de la Universidad Nacional
            de Pilar.
          </p>
        </div>

        <nav className="pie-col" aria-label="Secciones">
          <h2>Secciones</h2>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <a href={GAME_URL} target="_blank" rel="noopener noreferrer">
                Jugar la trivia ↗
              </a>
            </li>
          </ul>
        </nav>

        <div className="pie-col pie-cita">
          <h2>Constitución Nacional</h2>
          <blockquote>
            «La Nación Argentina ratifica su legítima e imprescriptible soberanía sobre las Islas Malvinas, Georgias
            del Sur y Sandwich del Sur y los espacios marítimos e insulares correspondientes.»
          </blockquote>
          <p className="pie-cita-fuente">Disposición transitoria primera</p>
        </div>
      </div>

      <div className="pie-base">
        <div className="contenedor">© 2026 MalvinizAR · Comunicación Digital · Universidad Nacional de Pilar</div>
      </div>
    </footer>
  );
}
