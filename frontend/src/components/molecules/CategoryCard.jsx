import { Link } from 'react-router-dom';

export const CategoryCard = ({ icon, title, path }) => {
  return (
    <Link
      to={path}
      className="group relative overflow-hidden flex flex-col items-center justify-center gap-3 min-w-30 md:w-full p-6 bg-neutral-white border border-gray-200 rounded-2xl transition-colors duration-600"
    >

      <div className="absolute inset-y-0 -inset-x-24 bg-secondary z-0 origin-left scale-x-0 skew-x-[-45deg] transition-transform duration-600 ease-out group-hover:scale-x-100"></div>

      <div className="relative z-10 flex flex-col items-center gap-3 text-secondary group-hover:text-neutral-white transition-colors duration-600">
        <div className="text-secondary group-hover:text-neutral-white transition-colors duration-300">
          {icon}
        </div>
        
        <span className="font-inter font-semibold text-sm text-primary group-hover:text-neutral-white transition-colors duration-600">
          {title}
        </span>
      </div>
    </Link>
  );
};