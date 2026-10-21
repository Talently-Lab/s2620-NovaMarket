import { useNavigate } from "react-router-dom";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

export const HeroProductCard = ({
  product,
  totalItems,
  currentIndex,
  onPrev,
  onNext,
  onSelectIndex,
  onMouseEnter,
  onMouseLeave,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex-1 w-full flex justify-center lg:justify-end items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[460px]">
        {product ? (
          <div className="flex flex-col justify-between h-full gap-5">
            {/* Header del producto */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-bold text-highlight uppercase tracking-wider block mb-1">
                  {typeof product.category === "object"
                    ? product.category?.name
                    : product.category || "Destacado"}
                </span>
                <h3 className="font-spartan font-bold text-xl text-neutral-white line-clamp-1">
                  {product.name}
                </h3>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10 shrink-0">
                {product.stock > 0 ? `${product.stock} disp.` : "Agotado"}
              </span>
            </div>

            {/* Imagen interactiva */}
            <div className="relative aspect-4/3 w-full flex items-center justify-center overflow-hidden py-2">
              <img
                key={product.id}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:scale-105"
              />
            </div>

            {/* Footer con precio y acciones */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Precio final</span>
                  <span className="font-spartan font-bold text-2xl text-neutral-white">
                    USD {Number(product.price).toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/producto/${product.id}`)}
                  className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-neutral-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  <Eye size={16} />
                  <span>Ver producto</span>
                </button>
              </div>

              {/* Paginador y flechas */}
              {totalItems > 1 && (
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalItems }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onSelectIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentIndex === idx 
                            ? "w-6 bg-highlight" 
                            : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Ir al producto ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={onPrev}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Producto anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Siguiente producto"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full animate-pulse gap-6 py-4">
            <div className="h-6 w-2/3 bg-white/10 rounded-lg" />
            <div className="aspect-4/3 w-full bg-white/5 rounded-2xl" />
            <div className="h-10 w-full bg-white/10 rounded-xl" />
          </div>
        )}
      </div>
    </div>
  );
};