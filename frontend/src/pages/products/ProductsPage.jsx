import { PackageSearch, X } from "lucide-react";
import { useProductsCatalog } from "../../hooks/useProductsCatalog";
import { ProductCard } from "../../components/molecules/ProductCard";
import { ProductCardSkeleton } from "../../components/molecules/ProductCardSkeleton";
import { Button } from "../../components/atoms/Button";
import {
  MARKETING_EMPTY_TEXT,
  SEARCH_EMPTY_TEXT,
} from "../../const/catalogMessages";

export const ProductsPage = () => {
  const {
    products,
    categories,
    selectedCategory,
    loading,
    error,
    searchQuery,
    handleCategoryChange,
    handleClearSearch,
    handleResetCatalog,
  } = useProductsCatalog();

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

          {searchQuery && (
            <div className="inline-flex items-center gap-2 mt-3 bg-[#F0F4F8] text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
              <span>Resultados para: "{searchQuery}"</span>
              <button
                type="button"
                onClick={handleClearSearch}
                title="Quitar filtro de búsqueda"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`cursor-pointer min-h-11 px-4 py-2 whitespace-nowrap rounded-lg font-inter text-sm font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-secondary text-neutral-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center font-inter text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-neutral-white border border-gray-200 rounded-2xl p-12 my-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F0F4F8] flex items-center justify-center text-secondary mb-4">
            <PackageSearch size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-spartan font-bold text-xl text-primary mb-2">
            {searchQuery
              ? "Sin resultados coincidentes"
              : "Sin productos disponibles"}
          </h3>
          <p className="font-inter text-sm text-gray-500 mb-6 leading-relaxed">
            {searchQuery
              ? SEARCH_EMPTY_TEXT(searchQuery)
              : MARKETING_EMPTY_TEXT}
          </p>
          <Button variant="secondary" onClick={handleResetCatalog}>
            Ver todos los productos
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};
