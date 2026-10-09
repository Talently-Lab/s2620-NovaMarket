import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Button } from '../components/atoms/Button';
import { useRegister } from '../hooks/useRegister';

export const RegisterPage = () => {
  // Consumimos toda la lógica desde el custom hook
  const { error, loading, handleChange, handleSubmit } = useRegister();

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

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-inter text-sm font-medium text-primary">Nombre completo</label>
              <input 
                type="text" 
                name="nombre" 
                required
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-inter text-sm font-medium text-primary">Email</label>
              <input 
                type="email" 
                name="email" 
                required
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-inter text-sm font-medium text-primary">Contraseña</label>
              <input 
                type="password" 
                name="password" 
                required
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-inter text-sm font-medium text-primary">Confirmar Contraseña</label>
              <input 
                type="password" 
                name="confirmPassword" 
                required
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>

            <div className="mt-2">
              <Button variant="secondary" type="submit" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'Registrarse'}
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