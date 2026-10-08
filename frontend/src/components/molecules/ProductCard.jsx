
export const ProductCard = ({ imageIcon, title, specs, rating, reviews, price }) => {
  return (
    <div className="flex flex-col bg-neutral-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex-1 min-w-60">

      <div className="bg-[#F4F7FB] aspect-4/3 flex items-center justify-center text-secondary">
        {imageIcon}
      </div>
      
      <div className="p-4 flex flex-col gap-1">
        <h4 className="font-spartan font-bold text-primary text-base leading-tight">
          {title}
        </h4>
        <p className="font-inter text-xs text-gray-500">
          {specs}
        </p>
        <p className="font-inter text-xs text-gray-400 mt-1">
          {rating} · {reviews} opiniones
        </p>
        <span className="font-spartan font-bold text-lg text-primary mt-2">
          {price}
        </span>
      </div>
    </div>
  );
};