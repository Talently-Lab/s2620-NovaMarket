import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { AlertError } from "../../components/atoms/AlertError";
import { FormField } from "../../components/molecules/FormField";
import { useLogin } from "../../hooks/useLogin";

export const LoginPage = () => {
  const { credentials, submitting, error, handleChange, handleSubmit } = useLogin();
  const camposInvalidos = Boolean(error?.camposInvalidos);

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-10 animate-fade-in">

      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        <div className="bg-neutral-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="font-spartan font-bold text-3xl text-primary mb-2 text-center">¡Hola de nuevo!</h2>
          <p className="font-inter text-gray-500 text-sm mb-6 text-center">Ingresa a tu cuenta para continuar</p>

          <AlertError>{error?.message}</AlertError>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField
              id="login-email"
              label="Email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              autoComplete="email"
              error={camposInvalidos}
              disabled={submitting}
            />
            <FormField
              id="login-password"
              label="Contraseña"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              error={camposInvalidos}
              disabled={submitting}
            />

            <div className="mt-2 flex flex-col gap-3">
              <Button variant="secondary" type="submit" fullWidth loading={submitting}>
                {submitting ? 'Ingresando...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </form>

          <p className="font-inter text-sm text-gray-500 mt-6 text-center">
            ¿No tienes cuenta? <Link to="/registro" className="text-secondary font-semibold hover:underline">Regístrate aquí</Link>
          </p>
        </div>
      </div>

    </div>
  );
};
