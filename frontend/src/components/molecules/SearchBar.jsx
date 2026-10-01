import { Search } from 'lucide-react';

export const SearchBar = ({ placeholder = "Buscar productos, marcas y más..." }) => {
  return (
    <div className="flex-1 max-w-2xl relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};