import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-auto w-full md:px-6 md:pb-6">

      <div className="w-full max-w-7xl mx-auto bg-primary rounded-none md:rounded-2xl py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6 shadow-lg">
        
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto pb-4 border-b border-gray-700/50 md:border-none md:pb-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="font-spartan font-bold text-2xl tracking-tighter text-neutral-white">
              NOVAMARKET
            </div>
            <div className="w-6 h-6 bg-neutral-white rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm relative flex items-center justify-center rotate-45">
              <div className="w-2 h-2 bg-highlight rounded-full absolute"></div>
            </div>
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