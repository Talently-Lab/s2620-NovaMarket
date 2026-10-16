import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';

export const ProductCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  imageIcon
}) => {
  const fallbackImage = `https://picsum.photos/seed/novamarket-${id}/400/300`;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  const formattedPrice =
    price !== undefined && price !== null
      ? `USD ${Number(price).toFixed(2)}`
      : '';

  return (
    <div className="flex flex-col bg-neutral-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex-1 min-w-60">
      <div className="bg-[#F4F7FB] aspect-4/3 flex items-center justify-center text-secondary overflow-hidden">
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

      <div className="p-4 flex flex-col gap-1 flex-1">
        {category && (
          <span className="font-inter text-[11px] font-semibold text-secondary uppercase tracking-wider">
            {category}
          </span>
        )}

        <h4 className="font-spartan font-bold text-primary text-base leading-tight">
          {name}
        </h4>

        {description && (
          <p className="font-inter text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        )}

        <span className="font-spartan font-bold text-lg text-primary mt-2">
          {formattedPrice}
        </span>

        {id && (
          <Link to={`/producto/${id}`} className="mt-auto pt-3">
            <Button variant="secondary" className="w-full text-sm py-2">
              Ver detalle
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};