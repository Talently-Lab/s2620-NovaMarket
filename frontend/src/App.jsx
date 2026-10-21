import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONTEXTOS (Estado Global)
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// COMPONENTES ESTRUCTURALES
import { Layout } from "./components/organisms/Layout";
import { PrivateRoute } from "./routes/PrivateRoute";

// PÁGINAS
import { Home, ProductsPage, ProductDetailPage, CartPage, CheckoutPage, LoginPage, RegisterPage, AdminPage, Ayuda } from "./pages";

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* RUTAS PÚBLICAS (Sin Layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />

            {/* RUTAS ESTRUCTURALES (Con Layout) */}
            <Route element={<Layout />}>
              {/* RUTAS PÚBLICAS DE NAVEGACIÓN */}
              <Route path="/" element={<Home />} />
              <Route path="/categorias" element={<ProductsPage />} />
              <Route path="/categorias/:category" element={<ProductsPage />} />
              <Route path="/producto/:id" element={<ProductDetailPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/ayuda" element={<Ayuda />} />

              {/* RUTAS PROTEGIDAS */}
              <Route element={<PrivateRoute />}>
                <Route
                  path="/cuenta"
                  element={<div>Mi Cuenta (Protegido)</div>}
                />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );

};