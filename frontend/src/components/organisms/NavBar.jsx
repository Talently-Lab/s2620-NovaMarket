import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { SearchBar } from "../molecules/SearchBar";
import { Badge } from "../atoms/Badge";
import logo from "../../assets/novamarket-logo-horizontal-color.svg";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();

  const cartAriaLabel = `Carrito, ${totalItems} ${totalItems === 1 ? "producto" : "productos"}`;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-neutral-white border-b border-gray-200 py-3 px-4 md:px-6 w-full relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        <Link to="/" className="shrink-0 z-50 min-h-11 flex items-center">
          <img src={logo} alt="NovaMarket" className="h-6 md:h-8 w-auto" />
        </Link>

        <div className="hidden md:block flex-1 max-w-2xl">
          <SearchBar />
        </div>

        {/* Botón Hamburguesa */}
        <button
          className="md:hidden text-primary p-2 focus:outline-none z-50 min-h-11 min-w-11 flex items-center justify-center cursor-pointer"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>

        {/* NAVEGACIÓN DE ESCRITORIO */}
        <div className="hidden md:flex items-center text-sm font-medium text-primary">
          <div className="flex items-center gap-6 pr-6 border-r border-gray-200">
            <Link
              to="/categorias"
              className="hover:text-secondary transition-colors min-h-11 flex items-center"
            >
              Categorías
            </Link>
            <Link
              to="/ofertas"
              className="hover:text-secondary transition-colors min-h-11 flex items-center"
            >
              Ofertas
            </Link>
            <Link
              to="/ayuda"
              className="hover:text-secondary transition-colors min-h-11 flex items-center"
            >
              Ayuda
            </Link>
          </div>

          <div className="flex items-center pl-6 gap-5">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/cuenta"
                  className="flex items-center hover:text-secondary transition-colors min-h-11"
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold leading-none">
                      Hola,
                    </span>
                    <span className="font-bold leading-tight truncate max-w-55">
                      {user.fullName || "Usuario"}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors min-h-11 min-w-11 flex items-center justify-center cursor-pointer"
                >
                  <LogOut size={18} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-secondary transition-colors min-h-11"
              >
                <User size={20} />
                <span>Ingresar</span>
              </Link>
            )}

            <Link
              to="/carrito"
              aria-label={cartAriaLabel}
              className="relative flex items-center justify-center min-h-11 min-w-11 hover:bg-gray-50 rounded-xl transition-colors text-primary hover:text-secondary cursor-pointer"
            >
              <ShoppingCart size={22} aria-hidden="true" />
              {totalItems > 0 && (
                <div className="absolute -top-1 -right-1" aria-hidden="true">
                  <Badge count={totalItems} />
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-white border-b border-gray-200 flex flex-col px-4 pt-2 pb-6 gap-2 shadow-xl animate-fade-in">
          <div className="w-full mb-4">
            <SearchBar />
          </div>

          <div className="flex flex-col gap-1">
            <Link
              to="/categorias"
              onClick={toggleMenu}
              className="text-base font-semibold text-primary hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 flex items-center"
            >
              Categorías
            </Link>
            <Link
              to="/ofertas"
              onClick={toggleMenu}
              className="text-base font-semibold text-primary hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 flex items-center"
            >
              Ofertas
            </Link>
            <Link
              to="/ayuda"
              onClick={toggleMenu}
              className="text-base font-semibold text-primary hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 flex items-center"
            >
              Ayuda
            </Link>
          </div>

          <hr className="border-gray-100 my-2" />

          {user ? (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 mt-2">
              <Link to="/cuenta" onClick={toggleMenu} className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">
                  Conectado como
                </span>
                <span className="font-bold text-lg text-primary">
                  {user.fullName || "Usuario"}
                </span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-600 bg-red-100/50 hover:bg-red-100 py-3 rounded-xl transition-colors min-h-11 cursor-pointer"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="flex items-center gap-3 text-base font-semibold text-primary hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 mt-2"
            >
              <div className="bg-gray-100 p-2 rounded-full">
                <User size={20} />
              </div>
              <span>Ingresar a mi cuenta</span>
            </Link>
          )}

          <Link
            to="/carrito"
            onClick={toggleMenu}
            aria-label={cartAriaLabel}
            className="flex items-center justify-between text-base font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-xl px-4 py-3 min-h-11 mt-4 transition-colors"
          >
            <div className="flex items-center gap-3" aria-hidden="true">
              <ShoppingCart size={22} className="text-secondary" />
              <span>Mi Carrito</span>
            </div>
            {totalItems > 0 && (
              <div aria-hidden="true">
                <Badge count={totalItems} />
              </div>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};
