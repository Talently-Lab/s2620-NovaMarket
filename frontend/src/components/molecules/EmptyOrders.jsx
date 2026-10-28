import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../atoms/Button';

export const EmptyOrders = () => {
  return (
    <div className="bg-neutral-white border border-gray-200 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-secondary mb-4">
        <ShoppingBag size={30} strokeWidth={1.5} />
      </div>
      <h3 className="font-spartan font-bold text-xl text-primary mb-2">
        Aún no realizaste compras
      </h3>
      <p className="font-inter text-sm text-gray-500 max-w-md mb-6">
        Explorá nuestro catálogo de hardware y periféricos para equipar tu setup.
      </p>
      <Link to="/categorias">
        <Button variant="secondary" className="min-h-11 px-6">
          Explorar catálogo
        </Button>
      </Link>
    </div>
  );
};