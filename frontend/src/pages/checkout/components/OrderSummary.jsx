import { ShieldCheck } from 'lucide-react';

export const OrderSummary = ({ items, totalItems, totalAmount }) => {
  return (
    <div className="bg-neutral-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <h2 className="font-spartan font-bold text-xl text-primary pb-3 border-b border-gray-100">Tu pedido ({totalItems})</h2>
      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm font-inter gap-2">
            <div className="flex flex-col">
              <span className="font-medium text-primary line-clamp-1">{item.name}</span>
              <span className="text-xs text-gray-500">Cant: {item.quantity}</span>
            </div>
            <span className="font-semibold text-primary shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
        <div className="flex justify-between font-inter text-sm text-gray-600">
          <span>Envío</span>
          <span className="text-green-600 font-semibold">Gratis</span>
        </div>
        <div className="flex justify-between items-baseline pt-2">
          <span className="font-spartan font-bold text-base text-primary">Total a pagar</span>
          <span className="font-spartan font-bold text-2xl text-primary">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="bg-[#F4F7FB] p-3 rounded-xl flex items-center gap-2.5 text-xs font-inter text-gray-600 mt-2">
        <ShieldCheck size={18} className="text-secondary shrink-0" />
        <span>Transacción protegida y encriptada por NovaMarket.</span>
      </div>
    </div>
  );
};