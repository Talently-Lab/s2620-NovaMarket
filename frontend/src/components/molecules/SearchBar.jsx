import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export const SearchBar = ({ placeholder = "Buscar productos, marcas y más..." }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/categorias?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/categorias');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm"
        placeholder={placeholder}
      />
    </form>
  );
};