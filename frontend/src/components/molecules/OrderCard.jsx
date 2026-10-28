import { useState } from 'react';
import { Package, ChevronDown, Calendar, MapPin, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { ORDER_STATUS_CONFIG } from '../../const/orderStatus';

export const OrderCard = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const rawStatus = (order.status || 'CONFIRMED').toUpperCase();
  const statusInfo =
    ORDER_STATUS_CONFIG[rawStatus] ||
    (rawStatus.includes('COMPLET') || rawStatus.includes('CONFIRM')
      ? ORDER_STATUS_CONFIG.COMPLETED
      : ORDER_STATUS_CONFIG.PENDING);

  const { label, badgeClass, Icon } = statusInfo;

  const orderDate = order.createdAt || order.date;
  const formattedDate = orderDate
    ? new Date(orderDate).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Fecha reciente';

  return (
    <article className="bg-neutral-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:border-secondary/30 transition-all font-inter">
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-light/60 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <Package size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Orden #{order.id || order.orderNumber || order._id}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5">
              <Calendar size={13} className="text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-5">
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Total pagado</span>
            <span className="font-spartan font-bold text-lg text-primary">
              USD ${Number(order.total ?? order.totalPaid ?? order.totalAmount ?? 0).toFixed(2)}
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}
          >
            <Icon size={14} className="shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-primary">
            {order.items?.length || 0} {order.items?.length === 1 ? 'producto' : 'productos'}
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer min-h-11 px-2"
          >
            <span>{isOpen ? 'Ocultar detalles' : 'Ver productos'}</span>
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 animate-fade-in">
            {order.shippingAddress && (
              <div className="flex items-start gap-2 text-xs text-primary/80 bg-neutral-light p-3 rounded-xl border border-gray-100">
                <MapPin size={15} className="text-secondary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-semibold">Dirección de entrega:</strong> {order.shippingAddress}
                </span>
              </div>
            )}

            <ul className="divide-y divide-gray-100">
              {order.items?.map((item, index) => (
                <li key={index} className="py-2.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-neutral-light border border-gray-200 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-primary line-clamp-1">
                      {item.name || item.product?.name}
                    </span>
                  </div>
                  <span className="font-spartan font-bold text-primary shrink-0 ml-4">
                    USD ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
};