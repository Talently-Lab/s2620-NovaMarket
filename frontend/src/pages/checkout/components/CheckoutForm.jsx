import { MapPin, User } from 'lucide-react';
import { Button } from '../../../components/atoms/Button';

export const CheckoutForm = ({ formData, handleChange, handleSubmit, submitting, error }) => {
  return (
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
  );
};