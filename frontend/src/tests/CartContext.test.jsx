import { render, screen, act, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { describe, it, expect } from 'vitest';

let contextValues;
const TestComponent = () => {
  contextValues = useCart();
  const { items = [], totalItems = 0 } = contextValues;

  return (
    <div>
      <span data-testid="total-items">{totalItems}</span>
      <span data-testid="cart-length">{items.length}</span>
    </div>
  );
};

describe('CartContext', () => {
  it('debe iniciar con el carrito vacío y 0 items', () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1, fullName: 'Test User' } }}>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  it('debe agregar un producto y actualizar el total de items correctamente', async () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1, fullName: 'Test User' } }}>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </AuthContext.Provider>
    );

    await act(async () => {
      contextValues.addItem({ id: 1, name: 'Laptop Pro', price: 1000, quantity: 1 });
    });

    await waitFor(() => {
      expect(screen.getByTestId('total-items').textContent).toBe('1');
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
    });
  });
});