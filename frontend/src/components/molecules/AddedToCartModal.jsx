import { CheckCircle2, X, ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddedToCartModal = ({ isOpen, onClose, product, quantity = 1 }) => {
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const price = Number(product.price) || 0;
  const subtotal = price * quantity;

  const handleGoToCart = () => {
    onClose();
    navigate("/carrito");
  };

  const handleGoToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-primary/50 backdrop-blur-xs transition-opacity"
      />

      {/* Caja del Modal */}
      <div className="relative bg-neutral-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg p-6 flex flex-col gap-5 z-10 animate-fade-in">
        {/* Encabezado con estado de éxito y botón cerrar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 size={22} className="shrink-0" />
            <span className="font-spartan font-bold text-base text-primary">
              ¡Agregado al carrito!
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-primary rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Fila del Producto */}
        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-3">
          <div className="w-16 h-16 shrink-0 bg-neutral-white rounded-lg border border-gray-200 p-1 flex items-center justify-center overflow-hidden">
            <img
              src={product.imageUrl || "https://placehold.co/100x100?text=Producto"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-inter font-semibold text-sm text-primary truncate">
              {product.name}
            </h4>
            <p className="font-inter text-xs text-gray-500 mt-0.5">
              Cantidad: <span className="font-bold text-primary">{quantity}</span>
            </p>
            <span className="font-inter font-bold text-sm text-secondary mt-1 block">
              ${subtotal.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* Botones de Acción (estilo MercadoLibre) */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleGoToCart}
            className="flex-1 border border-gray-300 hover:border-primary text-primary font-inter font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-11"
          >
            <ShoppingCart size={18} />
            <span>Ver Carrito</span>
          </button>

          <button
            onClick={handleGoToCheckout}
            className="flex-1 bg-primary hover:bg-secondary text-neutral-white font-inter font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm min-h-11"
          >
            <span>Comprar ahora</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};