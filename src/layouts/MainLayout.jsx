import { Outlet } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import Footer from '../components/Navigation/Footer';

export default function MainLayout() {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
