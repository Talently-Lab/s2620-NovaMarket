import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/organisms/Layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './routes/PrivateRoute'; 
import { LoginPage } from './pages/LoginPage'; 
import { RegisterPage } from './pages/RegisterPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPage } from './pages/AdminPage';



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
          <Route path="/categorias" element={<ProductsPage />} />
          <Route path="/categorias/:category" element={<ProductsPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          
          {/* RUTAS PROTEGIDAS (Solo para usuarios logueados) */}
          <Route element={<PrivateRoute />}>
            <Route path="/cuenta" element={<div>Mi Cuenta (Protegido)</div>} />
            <Route path="/checkout" element={<div>Checkout (Protegido)</div>} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};