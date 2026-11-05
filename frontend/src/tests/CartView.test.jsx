import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { describe, it, expect } from 'vitest';
import { useCart } from '../context/CartContext';

const CartViewComponent = () => {
  const { items, removeItem, clearCart, totalAmount, totalItems } = useCart();

  if (items.length === 0) {
    return <div data-testid="empty-cart-message">Tu carrito está vacío</div>;
  }

  return (
    <div>
      <h2>Resumen de Compra</h2>
      <span data-testid="cart-total-items">Items totales: {totalItems}</span>
      <ul>
        {items.map((item) => (
          <li key={item.id} data-testid={`cart-item-${item.id}`}>
            <span>{item.name}</span>
            <span>Cantidad: {item.quantity}</span>
            <span>Precio: USD {item.price * item.quantity}</span>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div data-testid="cart-total-amount">Total: USD {totalAmount}</div>
      <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
  );
};

describe('CartView / Resumen del Carrito', () => {
  const mockUser = { id: 1, fullName: 'Facundo Ledesma' };
  
  const mockInitialItems = [
    { id: 1, name: 'Notebook Developer', price: 1000, quantity: 2 },
    { id: 2, name: 'Mouse Inalámbrico', price: 50, quantity: 1 },
  ];

  it('debe mostrar el mensaje de carrito vacío cuando no hay productos', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: mockUser }}>
          <CartProvider>
            <CartViewComponent />
          </CartProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('empty-cart-message')).toBeDefined();
    expect(screen.getByText('Tu carrito está vacío')).toBeDefined();
  });

  it('debe renderizar correctamente los productos, las cantidades y el monto total', () => {
    localStorage.setItem('novamarket_cart_1', JSON.stringify(mockInitialItems));

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: mockUser }}>
          <CartProvider>
            <CartViewComponent />
          </CartProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Notebook Developer')).toBeDefined();
    expect(screen.getByText('Mouse Inalámbrico')).toBeDefined();

    expect(screen.getByTestId('cart-total-items').textContent).toContain('Items totales: 3');
    expect(screen.getByTestId('cart-total-amount').textContent).toContain('Total: USD 2050');
  });

  it('debe permitir eliminar un producto del carrito', async () => {
    localStorage.setItem('novamarket_cart_1', JSON.stringify(mockInitialItems));

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: mockUser }}>
          <CartProvider>
            <CartViewComponent />
          </CartProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Notebook Developer')).toBeDefined();

    const deleteButtons = screen.getAllByText('Eliminar');
    
    await act(async () => {
      deleteButtons[0].click();
    });

    expect(screen.queryByText('Notebook Developer')).toBeNull();
    expect(screen.getByTestId('cart-total-amount').textContent).toContain('Total: USD 50');
  });
});