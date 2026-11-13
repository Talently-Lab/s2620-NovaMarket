import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = ({ paths = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full pb-2">
      <ol className="flex flex-wrap items-center gap-y-2 gap-x-1.5 sm:gap-x-2 text-xs sm:text-sm">
        
        <li>
          <Link 
            to="/" 
            className="text-gray-400 hover:text-primary transition-colors flex items-center p-1 -ml-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 shrink-0"
            title="Ir al inicio"
          >
            <Home size={16} />
          </Link>
        </li>

        {paths.map((item, index) => {
          const isLast = index === paths.length - 1;

          return (
            <li key={index} className="flex items-center gap-x-1.5 sm:gap-x-2">
              <ChevronRight size={14} className="text-gray-300 shrink-0" strokeWidth={2.5} aria-hidden="true" />
              
              {isLast ? (
                <span 
                  className="font-inter font-medium text-primary wrap-break-word line-clamp-2" 
                  aria-current="page"
                  title={item.label} 
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="font-inter text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};