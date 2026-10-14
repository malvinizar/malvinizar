import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <header className="bg-dark text-white py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
          MalvinizAR
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline" style={{ color: 'var(--primaryLight)' }}>Inicio</Link>
          <Link to="/historia" className="hover:underline" style={{ color: 'var(--primaryLight)' }}>Historia</Link>
          <Link to="/testimonios" className="hover:underline" style={{ color: 'var(--primaryLight)' }}>Testimonios</Link>
          {/* add more links as needed */}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-dark text-white py-4 px-6 text-center">
        © {new Date().getFullYear()} MalvinizAR – Universidad
      </footer>
    </>
  );
}
