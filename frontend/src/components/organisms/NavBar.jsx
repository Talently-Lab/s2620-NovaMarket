import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { SearchBar } from "../molecules/SearchBar";
import { Badge } from "../atoms/Badge";
import logoColor from "../../assets/novamarket-logo-horizontal-color.svg";
import logoWhite from "../../assets/novamarket-logo-horizontal-mono-white.svg";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const isAdmin = user?.role === 'ADMIN';

  const navClasses = isAdmin 
    ? "bg-secondary text-white border-secondary shadow-md transition-colors duration-300"
    : "bg-neutral-white text-primary border-gray-200 shadow-sm transition-colors duration-300";

  const cartAriaLabel = `Carrito, ${totalItems} ${totalItems === 1 ? "producto" : "productos"}`;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={`border-b py-3 px-4 md:px-6 w-full relative z-50 ${navClasses}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        <Link to="/" className="shrink-0 z-50 min-h-11 flex items-center">
          <img 
            src={isAdmin ? logoWhite : logoColor} 
            alt="NovaMarket" 
            width="150"
            height="32"
            className="h-6 md:h-8 w-auto transition-all duration-300" 
          />
        </Link>

        <div className="hidden md:block flex-1 max-w-2xl">
          <SearchBar />
        </div>

        {/* Botón Hamburguesa */}
        <button
          className="md:hidden p-2 focus:outline-none z-50 min-h-11 min-w-11 flex items-center justify-center cursor-pointer text-current hover:opacity-80"
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
        <div className={`hidden md:flex items-center text-sm font-medium ${isAdmin ? 'text-white' : 'text-primary'}`}>
          <div className={`flex items-center gap-6 pr-6 border-r ${isAdmin ? 'border-white/20' : 'border-gray-200'}`}>
            <Link
              to="/categorias"
              className={`transition-colors min-h-11 flex items-center ${isAdmin ? 'hover:text-gray-200' : 'hover:text-secondary'}`}
            >
              Categorías
            </Link>
            
            <Link
              to="/nosotros"
              className={`transition-colors min-h-11 flex items-center ${isAdmin ? 'hover:text-gray-200' : 'hover:text-secondary'}`}
            >
              Nosotros
            </Link>
            <Link
              to="/ayuda"
              className={`transition-colors min-h-11 flex items-center ${isAdmin ? 'hover:text-gray-200' : 'hover:text-secondary'}`}
            >
              Ayuda
            </Link>
          </div>

          <div className="flex items-center pl-6 gap-5">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/cuenta"
                  className={`flex items-center transition-colors min-h-11 ${isAdmin ? 'hover:text-gray-200' : 'hover:text-secondary'}`}
                >
                  <div className="flex flex-col">
                    <span className={`text-xs uppercase tracking-wider font-bold leading-none ${isAdmin ? 'text-white/70' : 'text-gray-500'}`}>
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
                  aria-label="Cerrar sesión"
                  className={`p-2 rounded-xl transition-colors min-h-11 min-w-11 flex items-center justify-center cursor-pointer ${isAdmin ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'}`}
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
              className={`relative flex items-center justify-center min-h-11 min-w-11 rounded-xl transition-colors cursor-pointer ${isAdmin ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-50 text-primary hover:text-secondary'}`}
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
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-neutral-white border-b border-gray-200 flex flex-col px-4 pt-2 pb-6 gap-2 shadow-xl animate-fade-in text-primary"
        >
          <div className="w-full mb-4">
            <SearchBar />
          </div>

          <div className="flex flex-col gap-1">
            <Link to="/categorias" onClick={toggleMenu} className="text-base font-semibold hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 flex items-center">
              Categorías
            </Link>
            <Link to="/nosotros" onClick={toggleMenu} className="text-base font-semibold hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 flex items-center">
              Nosotros
            </Link>
            <Link to="/ayuda" onClick={toggleMenu} className="text-base font-semibold hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 flex items-center">
              Ayuda
            </Link>
          </div>

          <hr className="border-gray-100 my-2" />

          {user ? (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 mt-2">
              <Link to="/cuenta" onClick={toggleMenu} className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Conectado como</span>
                <span className="font-bold text-lg">{user.fullName || "Usuario"}</span>
              </Link>
              <button
                onClick={() => { handleLogout(); toggleMenu(); }}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-600 bg-red-100/50 hover:bg-red-100 py-3 rounded-xl transition-colors min-h-11 cursor-pointer"
              >
                <LogOut size={18} /> Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="flex items-center gap-3 text-base font-semibold hover:bg-gray-50 rounded-xl px-3 py-3 min-h-11 mt-2">
              <div className="bg-gray-100 p-2 rounded-full"><User size={20} /></div>
              <span>Ingresar a mi cuenta</span>
            </Link>
          )}

          <Link to="/carrito" onClick={toggleMenu} className="flex items-center justify-between text-base font-semibold bg-primary/5 hover:bg-primary/10 rounded-xl px-4 py-3 min-h-11 mt-4 transition-colors">
            <div className="flex items-center gap-3"><ShoppingCart size={22} className="text-secondary" /><span>Mi Carrito</span></div>
            {totalItems > 0 && <Badge count={totalItems} />}
          </Link>
        </div>
      )}
    </nav>
  );
};