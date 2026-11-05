import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SearchBar } from '../components/molecules/SearchBar';
import { describe, it, expect } from 'vitest';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname + location.search}</div>;
};

describe('SearchBar Component', () => {
  it('debe renderizar con el placeholder por defecto', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    expect(input).toBeDefined();
    expect(input.getAttribute('placeholder')).toBe('Buscar productos, marcas y más...');
  });

  it('debe permitir escribir en el input de búsqueda', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    
    fireEvent.change(input, { target: { value: 'auriculares' } });
    
    expect(input.value).toBe('auriculares');
  });

  it('debe navegar a /categorias?search=... al enviar el formulario con texto', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/categorias" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'teclado mecanico' } });
    
    fireEvent.submit(form);

    const locationDisplay = screen.getByTestId('location-display');
    expect(locationDisplay.textContent).toBe('/categorias?search=teclado%20mecanico');
  });

  it('debe navegar a /categorias sin parámetros si se envía vacío o con espacios', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/categorias" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    const locationDisplay = screen.getByTestId('location-display');
    expect(locationDisplay.textContent).toBe('/categorias');
  });
});