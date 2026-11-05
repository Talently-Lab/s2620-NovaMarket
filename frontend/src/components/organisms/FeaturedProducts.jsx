import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../molecules/ProductCard';
import { ProductCardSkeleton } from '../molecules/ProductCardSkeleton';

export const FeaturedProducts = () => {
  const { products, loading, error } = useProducts('Todos');
  const featured = products.slice(0, 4);

  return (
    <section className="flex flex-col gap-6 w-full py-4">
      <div className="flex justify-between items-end">
        <h2 className="font-spartan font-bold text-xl sm:text-2xl text-primary">
          Productos destacados
        </h2>
        <Link 
          to="/categorias" 
          className="font-inter text-sm font-semibold text-secondary hover:underline"
        >
          Ver todo
        </Link>
      </div>

      {error && !loading && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-inter">
          {error}
        </div>
      )}

      {!error && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-4 md:gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : featured.length === 0 ? (
            <p className="text-gray-500 font-inter text-sm col-span-full">
              No hay productos destacados por el momento.
            </p>
          ) : (
            featured.map((product, index) => (
              <ProductCard 
                key={product.id}
                {...product}
                isPriority={index === 0} 
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};