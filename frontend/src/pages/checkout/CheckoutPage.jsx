import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, MapPin, User, ShieldCheck } from 'lucide-react';
import { useCheckout } from '../../hooks/useCheckout';
import { Button } from '../../components/atoms/Button';

export const CheckoutPage = () => {
  const {
    formData,
    submitting,
    error,
    orderSuccess,
    handleChange,
    handleSubmit,
    items,
    totalItems,
    totalAmount
  } = useCheckout();

  if (orderSuccess) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 animate-fade-in">
        <div className="bg-neutral-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 mb-6">
            <CheckCircle2 size={44} strokeWidth={2} />
          </div>
          <span className="font-inter text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full mb-3">
            ¡Compra confirmada!
          </span>
          <h1 className="font-spartan font-bold text-3xl text-primary mb-2">
            ¡Gracias por tu compra, {orderSuccess.customerName.split(' ')[0]}!
          </h1>
          <p className="font-inter text-sm text-gray-500 mb-6 leading-relaxed">
            Tu pedido fue registrado con éxito y ya estamos preparando el envío a{' '}
            <strong className="text-primary">{orderSuccess.shippingAddress}</strong>.
          </p>

          <div className="w-full bg-[#F4F7FB] border border-gray-200 rounded-xl p-4 mb-8 flex flex-col gap-1">
            <span className="font-inter text-xs text-gray-500 uppercase tracking-wider">Número de Orden</span>
            <span className="font-spartan font-bold text-lg md:text-xl text-primary select-all break-all">
              #{orderSuccess.id}
            </span>
            <span className="font-inter text-xs text-gray-500 mt-1">
              Total abonado: <strong className="text-primary">${orderSuccess.totalPaid.toFixed(2)} USD</strong>
            </span>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/categorias" className="w-full">
              <Button variant="secondary" fullWidth>Volver al catálogo</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 animate-fade-in">
      <Link to="/carrito" className="inline-flex items-center gap-2 font-inter text-sm font-medium text-gray-500 hover:text-primary transition-colors min-h-11 mb-6">
        <ArrowLeft size={16} /> Volver al carrito
      </Link>

      <h1 className="font-spartan font-bold text-3xl text-primary mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-neutral-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-5">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-spartan font-bold text-xl text-primary">Datos de envío</h2>
            <p className="font-inter text-sm text-gray-500 mt-1">Completá la dirección donde recibirás tus productos</p>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl font-inter text-sm">{error}</div>}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="font-inter text-sm font-medium text-primary flex items-center gap-1.5">
              <User size={16} className="text-secondary" /> Nombre completo de quien recibe *
            </label>
            <input id="fullName" type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Ej: Facundo Ledesma" className="p-3 border border-gray-300 rounded-xl font-inter text-sm focus:outline-none focus:border-secondary transition-all" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="font-inter text-sm font-medium text-primary flex items-center gap-1.5">
                <MapPin size={16} className="text-secondary" /> Dirección de entrega *
              </label>
              <input id="address" type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="Ej: Av. Argentina 450, Piso 2" className="p-3 border border-gray-300 rounded-xl font-inter text-sm focus:outline-none focus:border-secondary transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="city" className="font-inter text-sm font-medium text-primary">Ciudad / Provincia</label>
              <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ej: Neuquén Capital" className="p-3 border border-gray-300 rounded-xl font-inter text-sm focus:outline-none focus:border-secondary transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="notes" className="font-inter text-sm font-medium text-primary">Indicaciones adicionales (opcional)</label>
            <textarea id="notes" name="notes" rows={2} value={formData.notes} onChange={handleChange} placeholder="Ej: Timbre B, entregar en recepción..." className="p-3 border border-gray-300 rounded-xl font-inter text-sm focus:outline-none focus:border-secondary transition-all resize-none" />
          </div>

          <div className="pt-2">
            <Button variant="secondary" type="submit" loading={submitting} disabled={submitting} fullWidth>
              {submitting ? 'Procesando orden...' : 'Confirmar compra'}
            </Button>
          </div>
        </form>

        <div className="bg-neutral-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h2 className="font-spartan font-bold text-xl text-primary pb-3 border-b border-gray-100">Tu pedido ({totalItems})</h2>
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm font-inter gap-2">
                <div className="flex flex-col">
                    <span className="font-medium text-primary line-clamp-1">{item.name}</span><span className="text-xs text-gray-500">Cant: {item.quantity}</span>
                </div>
                <span className="font-semibold text-primary shrink-0">${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
            <div className="flex justify-between font-inter text-sm text-gray-600"><span>Envío</span><span className="text-green-600 font-semibold">Gratis</span></div>
            <div className="flex justify-between items-baseline pt-2"><span className="font-spartan font-bold text-base text-primary">Total a pagar</span><span className="font-spartan font-bold text-2xl text-primary">${totalAmount.toFixed(2)}</span></div>
          </div>
          <div className="bg-[#F4F7FB] p-3 rounded-xl flex items-center gap-2.5 text-xs font-inter text-gray-600 mt-2">
            <ShieldCheck size={18} className="text-secondary shrink-0" /><span>Transacción protegida y encriptada por NovaMarket.</span>
          </div>
        </div>
      </div>
    </div>
  );
};