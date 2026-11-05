import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONTEXTOS (Estado Global)
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// COMPONENTES ESTRUCTURALES
import { Layout } from "./components/organisms/Layout";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AdminRoute } from "./routes/AdminRoute";

// PÁGINAS
const Home = lazy(() => import("./pages").then(m => ({ default: m.Home })));
const ProductsPage = lazy(() => import("./pages").then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import("./pages").then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import("./pages").then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import("./pages").then(m => ({ default: m.CheckoutPage })));
const LoginPage = lazy(() => import("./pages").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("./pages").then(m => ({ default: m.RegisterPage })));
const AdminPage = lazy(() => import("./pages").then(m => ({ default: m.AdminPage })));
const Ayuda = lazy(() => import("./pages").then(m => ({ default: m.Ayuda })));
const AboutUsPage = lazy(() => import("./pages").then(m => ({ default: m.AboutUsPage })));
const AccountPage = lazy(() => import("./pages").then(m => ({ default: m.AccountPage })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
  </div>
);

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
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
                <Route path="/nosotros" element={<AboutUsPage />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/ayuda" element={<Ayuda />} />

                {/* RUTAS PROTEGIDAS */}
                <Route element={<PrivateRoute />}>
                  <Route path="/cuenta" element={<AccountPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Route>

                {/* RUTAS PROTEGIDAS ADMIN */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};