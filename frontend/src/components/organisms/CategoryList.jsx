import { Gamepad2, Laptop, Mouse, Headphones, Monitor, Package } from 'lucide-react';
import { CategoryCard } from '../molecules/CategoryCard';

export const CategoryList = () => {
  const categories = [
    { icon: <Gamepad2 size={28} strokeWidth={1.5} />, title: "Gaming", path: "/categorias/gaming" },
    { icon: <Laptop size={28} strokeWidth={1.5} />, title: "Home Office", path: "/categorias/home-office" },
    { icon: <Mouse size={28} strokeWidth={1.5} />, title: "Periféricos", path: "/categorias/perifericos" },
    { icon: <Headphones size={28} strokeWidth={1.5} />, title: "Audio", path: "/categorias/audio" },
    { icon: <Monitor size={28} strokeWidth={1.5} />, title: "Monitores", path: "/categorias/monitores" },
    { icon: <Package size={28} strokeWidth={1.5} />, title: "Accesorios", path: "/categorias/accesorios" },
  ];

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="font-spartan font-bold text-xl text-primary">Categorías</h2>
      
      <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar md:grid md:grid-cols-6 md:pb-0">
        {categories.map((cat, index) => (
          <CategoryCard 
            key={index}
            icon={cat.icon}
            title={cat.title}
            path={cat.path}
          />
        ))}
      </div>
    </section>
  );
};