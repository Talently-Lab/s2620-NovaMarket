import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/organisms/Layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './routes/PrivateRoute'; 
import { LoginPage } from './pages/LoginPage'; 
import { RegisterPage } from './pages/RegisterPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS (No requieren sesión) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        
        {/* RUTAS CON LAYOUT (NavBar y Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<div>Categorías</div>} />
          
          {/* RUTAS PROTEGIDAS (Solo para usuarios logueados) */}
          <Route element={<PrivateRoute />}>
            <Route path="/cuenta" element={<div>Mi Cuenta (Protegido)</div>} />
            <Route path="/checkout" element={<div>Checkout (Protegido)</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};