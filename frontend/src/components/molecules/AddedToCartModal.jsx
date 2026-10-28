import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../atoms/Button";

export const AddedToCartModal = ({ isOpen, onClose, product, quantity = 1 }) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¡Agregado al carrito!"
      maxWidth="max-w-md"
    >
      <div className="p-6 flex flex-col gap-6">
        {/* Info del producto agregado */}
        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-xl">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-secondary text-xs font-semibold mb-0.5">
              <CheckCircle2 size={15} />
              <span>Listo para comprar</span>
            </div>
            <h4 className="font-spartan font-bold text-sm text-primary truncate">
              {product.name}
            </h4>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>Cantidad: <strong className="text-primary">{quantity}</strong></span>
              <span className="font-bold text-sm text-primary">
                {product.formattedPrice || `$${product.price} USD`}
              </span>
            </div>
          </div>
        </div>

        {/* Botones de acción accesibles */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 font-inter text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors min-h-11 flex items-center justify-center cursor-pointer"
          >
            Seguir comprando
          </button>

          <Link to="/carrito" className="flex-1" onClick={onClose}>
            <Button
              variant="secondary"
              fullWidth
              className="min-h-11 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              <span>Ir al carrito</span>
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};