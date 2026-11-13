import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import isotipo from '../../assets/novamarket-isotipo-reverse.svg';
import logotipo from '../../assets/novamarket-logotipo-reverse.svg';
import { SocialLinks } from '../molecules/SocialLinks';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

  return (
    <footer className="mt-auto w-full bg-primary text-gray-400 border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto pt-8 pb-6 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto pb-4 border-b border-white/10 md:border-none md:pb-0">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={isotipo} 
              alt="Icono" 
              width="24" 
              height="24" 
              className="h-6 w-auto object-contain" 
            />
            <img 
              src={logotipo} 
              alt="NovaMarket" 
              width="120" 
              height="24" 
              className="h-4 md:h-5 w-auto object-contain" 
            />
          </Link>
          <p className="text-sm text-gray-300 font-inter">
            Tecnología que se siente fácil.
          </p>
        </div>

        <div className="flex flex-col gap-1 w-full md:w-auto">
          <Link to="/ayuda" className="font-spartan font-bold text-base text-neutral-white hover:text-accent transition-colors">
            Ayuda
          </Link>
          <p className="text-sm text-gray-300 font-inter">
            Envíos · Devoluciones · Garantía
          </p>
        </div>

        <div className="flex flex-col gap-1 w-full md:w-auto items-center md:items-start">
          <Link to="/cuenta" className="font-spartan font-bold text-base text-neutral-white hover:text-accent transition-colors">
            Tu cuenta
          </Link>
          <p className="text-sm text-gray-300 font-inter">
            Mis pedidos · Datos
          </p>

          {isAdmin && (
            <Link 
              to="/admin" 
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-white transition-colors"
              title="Ir al Panel de Administración"
            >
              <ShieldCheck size={14} />
              Panel Admin
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full md:w-auto">
          <h3 className="font-spartan font-bold text-base text-neutral-white">
            Pago seguro
          </h3>
          <p className="text-sm text-gray-300 font-inter">
            Tarjetas · Transferencia
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-inter text-xs text-gray-400 text-center md:text-left order-2 md:order-1">
          © {currentYear} NovaMarket. Todos los derechos reservados.
        </p>

        <SocialLinks className="order-1 md:order-2" />
      </div>
    </footer>
  );
};