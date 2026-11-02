import { useContext } from 'react';
import { User, Mail, Shield, RefreshCw } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useUserOrders } from '../../hooks/useUserOrders';
import { OrderCard } from '../../components/molecules/OrderCard';
import { EmptyOrders } from '../../components/molecules/EmptyOrders';
import { AlertError } from '../../components/atoms/AlertError';

export const AccountPage = () => {
  const { user } = useContext(AuthContext);
  const { orders, loading, error, refetch } = useUserOrders();

  return (
    <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="font-spartan font-bold text-3xl text-primary">Mi Cuenta</h1>
        <p className="font-inter text-sm text-gray-500 mt-1">
          Gestioná tus datos personales y revisá tu historial de pedidos
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Columna Izquierda: Información del Perfil */}
        <section aria-labelledby="profile-heading" className="bg-neutral-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
          <h2 id="profile-heading" className="font-spartan font-bold text-lg text-primary border-b border-gray-100 pb-3">
            Datos del Cliente
          </h2>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gray-50 text-secondary">
                <User size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-gray-400 block font-medium">Nombre Completo</span>
                <span className="font-semibold text-primary truncate block">
                  {user?.fullName || 'Usuario'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gray-50 text-secondary">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-gray-400 block font-medium">Correo Electrónico</span>
                <span className="font-semibold text-primary truncate block">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gray-50 text-secondary">
                <Shield size={18} />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-medium">Rol de Usuario</span>
                <span className="inline-block bg-primary/5 text-primary text-xs font-bold px-2 py-0.5 rounded-md mt-0.5">
                  {user?.role || 'CLIENTE'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Columna Derecha: Historial de Compras */}
        <section aria-labelledby="orders-heading" className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 id="orders-heading" className="font-spartan font-bold text-xl text-primary">
              Historial de Compras
            </h2>
            {!loading && orders.length > 0 && (
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
              </span>
            )}
          </div>

          {/* Estado de Error */}
          {error && (
            <div className="flex flex-col gap-3">
              <AlertError>{error}</AlertError>
              <button
                type="button"
                onClick={refetch}
                className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:underline cursor-pointer"
              >
                <RefreshCw size={14} /> Reintentar cargar compras
              </button>
            </div>
          )}

          {/* Estado de Carga (Skeletons) */}
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse flex flex-col gap-3">
                  <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-1/2"></div>
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id || order._id} order={order}  onOrderUpdated={refetch}/>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};