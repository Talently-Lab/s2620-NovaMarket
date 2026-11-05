import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from '../components/molecules/ProductCard';
import { describe, it, expect } from 'vitest';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 42,
    name: 'Laptop Gamer Pro',
    description: 'Una laptop de alto rendimiento para desarrollo y gaming.',
    price: 1250.5,
    imageUrl: 'https://images.example.com/laptop.jpg',
    category: 'Tecnología',
  };

  it('debe renderizar correctamente la información del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Laptop Gamer Pro')).toBeDefined();
    expect(screen.getByText('Tecnología')).toBeDefined(); // Corregido respetando el texto original
    expect(screen.getByText('USD 1250.50')).toBeDefined();
    expect(screen.getByText('Una laptop de alto rendimiento para desarrollo y gaming.')).toBeDefined();
  });

  it('debe generar el enlace correcto al detalle del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: /ver detalle/i });
    expect(linkElement.getAttribute('href')).toBe('/producto/42');
  });

  it('debe aplicar la imagen de fallback si el dominio es falso (cdn.novamarket.com)', () => {
    const fakeDomainProduct = {
      ...mockProduct,
      imageUrl: 'https://cdn.novamarket.com/fake-image.jpg',
    };

    render(
      <MemoryRouter>
        <ProductCard {...fakeDomainProduct} />
      </MemoryRouter>
    );

    const imageElement = screen.getByAltText('Laptop Gamer Pro');
    expect(imageElement.src).toContain('placehold.co');
  });

  it('debe cambiar a la imagen de fallback cuando ocurre un error de carga (onError)', () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>
    );

    const imageElement = screen.getByAltText('Laptop Gamer Pro');
    
    fireEvent.error(imageElement);

    expect(imageElement.src).toContain('placehold.co');
  });
});