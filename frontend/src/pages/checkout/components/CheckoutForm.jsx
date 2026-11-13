import { MapPin, User, Building, FileText } from 'lucide-react';
import { Button } from '../../../components/atoms/Button';
import { AlertError } from '../../../components/atoms/AlertError';
import { FormField } from '../../../components/molecules/FormField';

export const CheckoutForm = ({
  formData,
  fieldErrors = {},
  handleChange,
  handleSubmit,
  submitting,
  error,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="lg:col-span-2 bg-neutral-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-5"
    >
      <div className="border-b border-gray-100 pb-4">
        <h2 className="font-spartan font-bold text-xl text-primary">Datos de envío</h2>
        <p className="font-inter text-sm text-gray-500 mt-1">
          Completá la dirección donde recibirás tus productos
        </p>
      </div>

      {error && (
          <AlertError>{error}</AlertError>
      )}

      <p className="font-inter text-xs text-gray-500 -mt-2">
        <span className="text-error font-semibold">*</span> Campos obligatorios
      </p>

      <FormField
        id="fullName"
        name="fullName"
        label={
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-secondary" aria-hidden="true" />
            Nombre completo de quien recibe
          </span>
        }
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Ej: Facundo Ledesma"
        autoComplete="name"
        error={fieldErrors.fullName}
        disabled={submitting}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="address"
          name="address"
          label={
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-secondary" aria-hidden="true" />
              Dirección de entrega
            </span>
          }
          value={formData.address}
          onChange={handleChange}
          placeholder="Ej: Av. Argentina 450, Piso 2"
          autoComplete="street-address"
          error={fieldErrors.address}
          disabled={submitting}
          required
        />

        <FormField
          id="city"
          name="city"
          label={
            <span className="flex items-center gap-1.5">
              <Building size={16} className="text-secondary" aria-hidden="true" />
              Ciudad / Provincia
            </span>
          }
          value={formData.city}
          onChange={handleChange}
          placeholder="Ej: Neuquén Capital"
          autoComplete="address-level2"
          error={fieldErrors.city}
          disabled={submitting}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="font-inter text-sm font-medium text-primary flex items-center gap-1.5">
          <FileText size={16} className="text-secondary" aria-hidden="true" />
          Indicaciones adicionales (opcional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          value={formData.notes}
          onChange={handleChange}
          disabled={submitting}
          placeholder="Ej: Timbre B, entregar en recepción..."
          className="p-3 border border-gray-300 rounded-lg font-inter text-base sm:text-sm focus:outline-none focus:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/30 transition-all resize-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        />
      </div>

      <div className="pt-2">
        <Button variant="secondary" type="submit" loading={submitting} disabled={submitting} fullWidth>
          {submitting ? 'Procesando orden...' : 'Confirmar compra'}
        </Button>
      </div>
    </form>
  );
};