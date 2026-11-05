import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { describe, it, expect } from 'vitest';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = React.useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const ProtectedContent = () => <div data-testid="protected-page">Panel Secreto de Usuario</div>;
const LoginPage = () => <div data-testid="login-page">Página de Iniciar Sesión</div>;

describe('ProtectedRoute Component', () => {
  it('debe redirigir al usuario al login si no está autenticado', () => {
    render(
      <MemoryRouter initialEntries={['/perfil']}>
        <AuthContext.Provider value={{ user: null }}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<ProtectedContent />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('login-page')).toBeDefined();
    expect(screen.queryByTestId('protected-page')).toBeNull();
  });

  it('debe permitir el acceso al contenido protegido si el usuario está autenticado', () => {
    const mockUser = { id: 1, fullName: 'Facundo Ledesma' };

    render(
      <MemoryRouter initialEntries={['/perfil']}>
        <AuthContext.Provider value={{ user: mockUser }}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<ProtectedContent />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-page')).toBeDefined();
    expect(screen.queryByTestId('login-page')).toBeNull();
  });
});