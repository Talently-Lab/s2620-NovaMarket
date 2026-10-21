import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Button } from "../../components/atoms/Button";

export const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalAmount, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-16 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-6">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        <h2 className="font-spartan font-bold text-2xl md:text-3xl text-primary mb-2">
          Tu carrito está vacío
        </h2>
        <p className="font-inter text-gray-500 max-w-md mb-8">
          Explorá nuestro catálogo y descubrí los mejores periféricos y equipamiento para tu setup.
        </p>
        <Link to="/categorias">
          <Button variant="secondary" className="px-8 py-3">
            Explorar catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-spartan font-bold text-2xl md:text-3xl text-primary">
            Carrito de compras
          </h1>
          <p className="font-inter text-sm text-gray-500 mt-1">
            Revisá tus productos antes de finalizar la compra
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-gray-400 hover:text-error transition-colors cursor-pointer"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Lista de Productos */}
        <div className="lg:col-span-2 flex flex-col divide-y divide-gray-100 bg-neutral-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-xs">
          {items.map((item) => {
            const price = Number(item.price) || 0;
            const subtotal = price * item.quantity;
            const maxStock = item.stock ?? 99;

            return (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center gap-4 justify-between"
              >
                {/* Imagen y Detalle */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-2">
                    <img
                      src={item.imageUrl || "https://placehold.co/100x100?text=Producto"}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      {item.category || "General"}
                    </span>
                    <h3 className="font-spartan font-bold text-base text-primary line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="font-inter text-sm font-semibold text-secondary sm:hidden mt-1">
                      ${price.toLocaleString("es-AR")} c/u
                    </span>
                  </div>
                </div>

                {/* Controles de Cantidad y Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                  <span className="hidden sm:block font-inter text-sm text-gray-500 whitespace-nowrap">
                    ${price.toLocaleString("es-AR")}
                  </span>

                  {/* Selector Sumar / Restar */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-primary transition-colors cursor-pointer min-h-10 min-w-10 flex items-center justify-center"
                      title="Restar cantidad"
                      aria-label="Restar una unidad"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 font-inter text-sm font-bold text-primary min-w-8 text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= maxStock}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer min-h-10 min-w-10 flex items-center justify-center"
                      title="Sumar cantidad"
                      aria-label="Sumar una unidad"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Subtotal por ítem */}
                  <span className="font-inter font-bold text-base text-primary min-w-20 text-right">
                    ${subtotal.toLocaleString("es-AR")}
                  </span>

                  {/* Botón Eliminar */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-error transition-colors rounded-lg hover:bg-red-50 cursor-pointer min-h-10 min-w-10 flex items-center justify-center"
                    title="Eliminar producto"
                    aria-label={`Eliminar ${item.name} del carrito`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen del Pedido (Sidebar) */}
        <div className="bg-neutral-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-6 shadow-xs sticky top-24">
          <h2 className="font-spartan font-bold text-xl text-primary border-b border-gray-100 pb-4">
            Resumen de compra
          </h2>

          <div className="flex flex-col gap-3 font-inter text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Cantidad de productos</span>
              <span className="font-semibold text-primary">{totalItems} u.</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-semibold text-primary">
                ${totalAmount.toLocaleString("es-AR")}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Envío</span>
              <span className="text-highlight font-semibold bg-primary px-2 py-0.5 rounded-sm text-xs">
                Gratis
              </span>
            </div>
            <hr className="border-gray-100 my-1" />
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-base text-primary">Total</span>
              <span className="font-spartan font-bold text-2xl text-secondary">
                ${totalAmount.toLocaleString("es-AR")}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-primary hover:bg-secondary text-neutral-white font-inter font-bold text-base py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm min-h-12"
          >
            <span>Ir al Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};