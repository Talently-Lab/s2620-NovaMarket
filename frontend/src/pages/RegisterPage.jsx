import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Button } from '../components/atoms/Button';
import { AlertError } from '../components/atoms/AlertError';
import { FormField } from '../components/molecules/FormField';
import { useRegister } from '../hooks/useRegister';

export const RegisterPage = () => {
  // Consumimos toda la lógica desde el custom hook
  const { formData, fieldErrors, error, submitting, handleChange, handleSubmit } = useRegister();

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-10 animate-fade-in">

      <div className="w-full max-w-md">
        {/* Botón de regresar */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        {/* Tarjeta del formulario */}
        <div className="bg-neutral-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="font-spartan font-bold text-3xl text-primary mb-2 text-center">Crear cuenta</h2>
          <p className="font-inter text-gray-500 text-sm mb-6 text-center">Únete a NovaMarket y mejora tu setup</p>

          <AlertError>{error}</AlertError>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField
              id="register-nombre"
              label="Nombre completo"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              autoComplete="name"
              disabled={submitting}
            />
            <FormField
              id="register-email"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              error={fieldErrors.email}
              disabled={submitting}
            />
            <FormField
              id="register-password"
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              error={fieldErrors.password}
              disabled={submitting}
            />
            <FormField
              id="register-confirm"
              label="Confirmar Contraseña"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              error={fieldErrors.confirmPassword}
              disabled={submitting}
            />

            <div className="mt-2">
              <Button variant="secondary" type="submit" fullWidth loading={submitting}>
                {submitting ? 'Creando cuenta...' : 'Registrarse'}
              </Button>
            </div>
          </form>

          <p className="font-inter text-sm text-gray-500 mt-6 text-center">
            ¿Ya tienes cuenta? <Link to="/login" className="text-secondary font-semibold hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>

    </div>
  );
};
