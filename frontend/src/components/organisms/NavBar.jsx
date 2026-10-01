import { Link } from 'react-router-dom'; 
import { User, ShoppingCart } from 'lucide-react';
import { SearchBar } from '../molecules/SearchBar';
import { Badge } from '../atoms/Badge';

export const NavBar = () => {
  return (
    <nav className="bg-neutral-white border-b border-gray-200 py-3 px-6 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="font-spartan font-bold text-2xl tracking-tighter">
            <span className="text-primary">NOVA</span>
            <span className="text-secondary">MARKET</span>
          </div>
          <div className="w-6 h-6 bg-primary rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm relative flex items-center justify-center rotate-45">
            <div className="w-2 h-2 bg-highlight rounded-full absolute"></div>
          </div>
        </Link>

        <SearchBar />

        <div className="flex items-center gap-6 text-sm font-medium text-primary">
          <Link to="/categorias" className="hover:text-secondary transition-colors">Categorías</Link>
          <Link to="/ofertas" className="hover:text-secondary transition-colors">Ofertas</Link>
          <Link to="/ayuda" className="hover:text-secondary transition-colors">Ayuda</Link>
          
          <Link to="/cuenta" className="flex items-center gap-2 hover:text-secondary transition-colors ml-4">
            <User size={20} />
            <span>Mi cuenta</span>
          </Link>

          <Link to="/checkout" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <ShoppingCart size={20} />
            <span>Carrito</span>
            <Badge count={2} /> 
          </Link>
        </div>

      </div>
    </nav>
  );
};