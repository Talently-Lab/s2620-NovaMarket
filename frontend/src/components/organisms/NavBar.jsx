import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { SearchBar } from '../molecules/SearchBar';
import { Badge } from '../atoms/Badge';
import logo from '../../assets/novamarket-logo-horizontal-color.svg';
import { AuthContext } from '../../context/AuthContext';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-neutral-white border-b border-gray-200 py-3 px-4 md:px-6 w-full relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        <Link to="/" className="shrink-0 z-50">
          <img 
            src={logo} 
            alt="NovaMarket" 
            className="h-6 md:h-8 w-auto" 
          />
        </Link>

        <div className="hidden md:block flex-1 max-w-2xl">
          <SearchBar />
        </div>

        {/* Botón Hamburguesa */}
        <button 
          className="md:hidden text-primary p-2 focus:outline-none z-50"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-primary">
          <Link to="/categorias" className="hover:text-secondary transition-colors">Categorías</Link>
          <Link to="/ofertas" className="hover:text-secondary transition-colors">Ofertas</Link>
          <Link to="/ayuda" className="hover:text-secondary transition-colors">Ayuda</Link>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/cuenta" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <User size={20} />
                <span className="font-bold">Hola, {user.nombre || 'Usuario'}</span>
              </Link>
              <button 
                onClick={logout} 
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-secondary transition-colors ml-4">
              <User size={20} />
              <span>Ingresar</span>
            </Link>
          )}

          <Link to="/checkout" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <ShoppingCart size={20} />
            <span>Carrito</span>
            <Badge count={2} /> 
          </Link>
        </div>
      </div>

      {/* Menú Desplegable */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-white border-b border-gray-200 flex flex-col p-4 gap-4 shadow-lg animate-fade-in">
          
          <div className="w-full mb-2">
            <SearchBar />
          </div>

          <Link to="/categorias" onClick={toggleMenu} className="text-base font-medium text-primary hover:text-secondary py-2">Categorías</Link>
          <Link to="/ofertas" onClick={toggleMenu} className="text-base font-medium text-primary hover:text-secondary py-2">Ofertas</Link>
          <Link to="/ayuda" onClick={toggleMenu} className="text-base font-medium text-primary hover:text-secondary py-2">Ayuda</Link>
          
          <hr className="border-gray-100" />
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/cuenta" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <User size={20} />
                <span className="font-bold">Hola, {user.nombre || 'Usuario'}</span>
              </Link>
              <button 
                onClick={logout} 
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-secondary transition-colors ml-4">
              <User size={20} />
              <span>Ingresar</span>
            </Link>
          )}
          
          <Link to="/checkout" onClick={toggleMenu} className="flex items-center justify-between text-base font-medium text-primary hover:text-secondary py-2">
            <div className="flex items-center gap-3">
              <ShoppingCart size={22} />
              <span>Carrito</span>
            </div>
            <Badge count={2} />
          </Link>
        </div>
      )}
    </nav>
  );
};