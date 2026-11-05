import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';
import { useContext } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../services/authService', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

let authContextValues;
const TestAuthComponent = () => {
  authContextValues = useContext(AuthContext);
  const { user, token } = authContextValues || {};

  return (
    <div>
      <span data-testid="auth-status">{user ? 'authenticated' : 'guest'}</span>
      <span data-testid="user-name">{user?.fullName || user?.name || 'No user'}</span>
      <span data-testid="auth-token">{localStorage.getItem('token') || 'No token'}</span>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe iniciar como invitado (sin usuario ni token)', () => {
    render(
      <AuthProvider>
        <TestAuthComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('guest');
    expect(screen.getByTestId('user-name').textContent).toBe('No user');
    expect(screen.getByTestId('auth-token').textContent).toBe('No token');
  });

  it('debe iniciar sesión correctamente y guardar los datos', async () => {
    const mockResponse = {
      token: 'fake-jwt-token-123',
      user: { id: 1, fullName: 'Facundo Ledesma', email: 'facu@test.com' },
    };
    authService.login.mockResolvedValueOnce(mockResponse);

    render(
      <AuthProvider>
        <TestAuthComponent />
      </AuthProvider>
    );

    await act(async () => {
      await authContextValues.login({ email: 'facu@test.com', password: '123' });
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
      expect(screen.getByTestId('user-name').textContent).toBe('Facundo Ledesma');
      expect(screen.getByTestId('auth-token').textContent).toBe('fake-jwt-token-123');
      expect(localStorage.getItem('token')).toBe('fake-jwt-token-123');
    });
  });

  it('debe cerrar sesión correctamente y limpiar el estado', async () => {
    const mockResponse = {
      token: 'fake-jwt-token-123',
      user: { id: 1, fullName: 'Facundo Ledesma' },
    };
    authService.login.mockResolvedValueOnce(mockResponse);

    render(
      <AuthProvider>
        <TestAuthComponent />
      </AuthProvider>
    );

    await act(async () => {
      await authContextValues.login({ email: 'facu@test.com', password: '123' });
    });

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');

    await act(async () => {
      authContextValues.logout();
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('guest');
      expect(screen.getByTestId('user-name').textContent).toBe('No user');
      expect(screen.getByTestId('auth-token').textContent).toBe('No token');
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
});