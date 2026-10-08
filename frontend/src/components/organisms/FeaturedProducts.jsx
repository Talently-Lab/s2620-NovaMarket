import { Link } from 'react-router-dom';
import { Headphones, Keyboard, Mouse, Monitor } from 'lucide-react';
import { ProductCard } from '../molecules/ProductCard';

export const FeaturedProducts = () => {
  const products = [
    {
      imageIcon: <Headphones size={64} strokeWidth={1} />,
      title: "Auriculares inalámbricos Pro",
      specs: "Bluetooth 5.3 · ANC",
      rating: "4.6",
      reviews: "128",
      price: "$ 89.990"
    },
    {
      imageIcon: <Keyboard size={64} strokeWidth={1} />,
      title: "Teclado mecánico 75%",
      specs: "Switch red · RGB",
      rating: "4.6",
      reviews: "128",
      price: "$ 74.500"
    },
    {
      imageIcon: <Mouse size={64} strokeWidth={1} />,
      title: "Mouse gamer 16K DPI",
      specs: "Inalámbrico · 60 g",
      rating: "4.6",
      reviews: "128",
      price: "$ 42.990"
    },
    {
      imageIcon: <Monitor size={64} strokeWidth={1} />,
      title: 'Monitor 27" QHD 165 Hz',
      specs: "IPS · 1 ms",
      rating: "4.6",
      reviews: "128",
      price: "$ 329.000"
    }
  ];

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-end">
        <h2 className="font-spartan font-bold text-xl text-primary">Productos destacados</h2>
        <Link to="/ofertas" className="font-inter text-sm font-semibold text-secondary hover:underline">
          Ver todo
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={index}
            {...product}
          />
        ))}
      </div>
    </section>
  );
};