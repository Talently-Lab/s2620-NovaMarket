import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <NavBar />
      
      <main className="grow max-w-7xl mx-auto px-6 py-8 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};