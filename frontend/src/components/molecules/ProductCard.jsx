import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';

export const ProductCard = (props) => {
  // Blindaje: funciona tanto si recibe {...product} como product={product}
  const data = props.product || props || {};
  const { 
    id = 1, 
    image, 
    imageIcon, 
    title, 
    name, 
    category, 
    specs, 
    rating, 
    reviews, 
    price = 0 
  } = data;

  const productTitle = title || name || 'Producto sin nombre';
  const fallbackImage = `https://picsum.photos/seed/novamarket-${id}/400/300`;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  const formattedPrice = typeof price === 'number' 
    ? `$ ${price.toLocaleString('es-AR')}` 
    : price;

  return (
    <div className="flex flex-col bg-neutral-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex-1 min-w-60">

      <div className="bg-[#F4F7FB] aspect-4/3 flex items-center justify-center text-secondary overflow-hidden">
        {imageIcon && !image ? (
          imageIcon
        ) : (
          <img 
            src={image || fallbackImage} 
            alt={productTitle}
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
          {productTitle}
        </h4>

        {specs && (
          <p className="font-inter text-xs text-gray-500">
            {specs}
          </p>
        )}

        {(rating || reviews) && (
          <p className="font-inter text-xs text-gray-400 mt-1">
            {rating} · {reviews} opiniones
          </p>
        )}

        <span className="font-spartan font-bold text-lg text-primary mt-2">
          {formattedPrice}
        </span>

        <Link to={`/producto/${id}`} className="mt-auto pt-3">
          <Button variant="secondary" className="w-full text-sm py-2">
            Ver detalle
          </Button>
        </Link>
      </div>
    </div>
  );
};