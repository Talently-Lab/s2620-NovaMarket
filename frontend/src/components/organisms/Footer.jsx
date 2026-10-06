import { Link } from 'react-router-dom';
import isotipo from '../../assets/novamarket-isotipo-reverse.svg';
import logotipo from '../../assets/novamarket-logotipo-reverse.svg'; 

export const Footer = () => {
  return (

    <footer className="mt-auto w-full bg-primary">
      
      <div className="w-full max-w-7xl mx-auto py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto pb-4 border-b border-gray-700/50 md:border-none md:pb-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={isotipo} alt="Icono" className="h-6 w-auto object-contain" />
            <img src={logotipo} alt="NovaMarket" className="h-4 md:h-5 w-auto object-contain" />
          </Link>
          <p className="text-sm text-gray-300 font-inter">
            Tecnología que se siente fácil.
          </p>
        </div>

        <div className="flex flex-col gap-1 w-full md:w-auto">
          <h3 className="font-spartan font-bold text-base text-neutral-white">Ayuda</h3>
          <p className="text-sm text-gray-300 font-inter">
            Envíos · Devoluciones · Garantía
          </p>
        </div>

        <div className="flex flex-col gap-1 w-full md:w-auto">
          <h3 className="font-spartan font-bold text-base text-neutral-white">Tu cuenta</h3>
          <p className="text-sm text-gray-300 font-inter">
            Mis pedidos · Datos
          </p>
        </div>

        <div className="flex flex-col gap-1 w-full md:w-auto">
          <h3 className="font-spartan font-bold text-base text-neutral-white">Pago seguro</h3>
          <p className="text-sm text-gray-300 font-inter">
            Tarjetas · Transferencia
          </p>
        </div>

      </div>
    </footer>
  );
};