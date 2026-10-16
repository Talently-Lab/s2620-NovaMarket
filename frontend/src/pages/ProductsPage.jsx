import { PackageSearch } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/molecules/ProductCard";
import { ProductCardSkeleton } from "../components/molecules/ProductCardSkeleton";
import { Button } from "../components/atoms/Button";

const MARKETING_EMPTY_TEXT =
  "¡Ups! Por el momento no encontramos productos en esta categoría, pero estamos preparando nuevos ingresos para potenciar tu setup. ¡Explorá el resto de nuestro catálogo!";

export const ProductsPage = () => {
  const {
    products,
    categories,
    selectedCategory,
    loading,
    error,
    handleCategoryChange,
  } = useProducts();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="font-spartan font-bold text-3xl text-primary">
            Catálogo de Productos
          </h1>
          <p className="font-inter text-sm text-gray-500 mt-1">
            Encontrá el equipamiento ideal para tu espacio de trabajo y gaming
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-inter text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-secondary text-white shadow-sm scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary"
                } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {category}
              </button>
            );
          })}

        </div>
      </div>

      {/* Estado de Error */}
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center font-inter text-sm">
            {error}
        </div>
      )}

      {/* Estado de Carga: Grilla de Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center bg-neutral-white border border-gray-200 rounded-2xl p-12 my-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F0F4F8] flex items-center justify-center text-secondary mb-4">
            <PackageSearch size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-spartan font-bold text-xl text-primary mb-2">
            Sin productos disponibles
          </h3>
          <p className="font-inter text-sm text-gray-500 mb-6 leading-relaxed">
            {MARKETING_EMPTY_TEXT}
          </p>
          <Button 
            variant="secondary" 
            onClick={() => handleCategoryChange('Todos')}
          >
            Ver todos los productos
          </Button>

        </div>

      ) : (
        /* Grilla Responsiva de Productos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
      )}

    </div>
  );
};
