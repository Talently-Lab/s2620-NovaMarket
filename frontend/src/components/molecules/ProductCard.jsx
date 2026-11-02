import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

export const ProductCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  imageIcon,
}) => {
  const fallbackImage = `https://placehold.co/400x300/F4F7FB/8592A3?text=Sin+Imagen`;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  const formattedPrice =
    price !== undefined && price !== null
      ? `USD ${Number(price).toFixed(2)}`
      : "";

  return (
    <div className="flex flex-col bg-neutral-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow w-full min-w-0">
      <div className="bg-[#F4F7FB] aspect-4/3 flex items-center justify-center text-secondary overflow-hidden shrink-0">
        {imageIcon && !imageUrl ? (
          imageIcon
        ) : (
          <img
            src={imageUrl || fallbackImage}
            alt={name}
            onError={handleImageError}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
        {category && (
          <span className="font-inter text-[10px] sm:text-[11px] font-semibold text-secondary uppercase tracking-wider truncate">
            {typeof category === "object" ? category?.name : category}
          </span>
        )}

        <h4 className="font-spartan font-bold text-primary text-xs sm:text-base leading-snug line-clamp-2 min-h-8 sm:min-h-10">
          {name}
        </h4>

        {description && (
          <p className="hidden sm:block font-inter text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        )}

        <span className="font-spartan font-bold text-sm sm:text-lg text-primary mt-1 sm:mt-2">
          {formattedPrice}
        </span>

        {id && (
          <Link to={`/producto/${id}`} className="mt-auto pt-2 sm:pt-3">
            <Button
              variant="secondary"
              fullWidth
              className="text-xs sm:text-sm py-1.5 sm:py-2 min-h-8 sm:min-h-10 flex items-center justify-center"
            >
              Ver detalle
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

};