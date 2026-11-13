import { ArrowDownAZ, TrendingDown, TrendingUp, Clock } from "lucide-react";

export const SortSelect = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="font-inter text-sm text-gray-500 hidden md:block">
        Ordenar por:
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-gray-200 text-primary font-inter text-sm font-medium rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary cursor-pointer transition-colors hover:bg-gray-50"
        >
          <option value="recent">Más recientes</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre: A - Z</option>
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          {value === "recent" && <Clock size={16} />}
          {value === "price-asc" && <TrendingUp size={16} />}
          {value === "price-desc" && <TrendingDown size={16} />}
          {value === "name-asc" && <ArrowDownAZ size={16} />}
        </div>
      </div>
    </div>
  );
};