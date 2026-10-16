import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, PackageX } from 'lucide-react';
import { useProductDetail } from '../hooks/useProductDetail';
import { ProductDetailSkeleton } from '../components/molecules/ProductDetailSkeleton';
import { Button } from '../components/atoms/Button';
import { AuthContext } from '../context/AuthContext'; // <-- Agregado

export const ProductDetailPage = () => {
  const { product, loading, error, handleImageError } = useProductDetail();
  
  // Traemos el estado de usuario y el navegador
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Función para manejar el clic en el carrito
  const handleAddToCart = () => {
    if (!user) {
      return navigate('/login');
    }
    // Lógica futura para agregar al carrito
    console.log("Agregando al carrito el producto:", product.name);
  };

  if (loading) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 flex flex-col items-center text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
          <PackageX size={32} strokeWidth={1.5} />
        </div>
        <h2 className="font-spartan font-bold text-2xl text-primary mb-2">Producto no encontrado</h2>
        <p className="font-inter text-sm text-gray-500 mb-6">{error}</p>
        <Link to="/categorias">
          <Button variant="secondary">Volver al catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 animate-fade-in">
      <Link to="/categorias" className="inline-flex items-center gap-2 font-inter text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-6">
        <ArrowLeft size={16} /> Volver al catálogo
      </Link>

      <div className="bg-neutral-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-[#F4F7FB] aspect-4/3 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
          <img src={product.imageUrl} alt={product.name} onError={handleImageError} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-inter text-xs font-semibold text-secondary uppercase tracking-wider bg-[#F0F4F8] px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className={`font-inter text-xs font-medium px-2.5 py-1 rounded-full ${product.stock > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {product.stock > 0 ? `Stock disponible (${product.stock} u.)` : 'Sin stock'}
              </span>
            </div>

            <h1 className="font-spartan font-bold text-2xl md:text-3xl text-primary leading-tight mt-1">{product.name}</h1>

            <div className="my-2">
              <span className="font-spartan font-bold text-3xl md:text-4xl text-primary">{product.formattedPrice}</span>
              <p className="font-inter text-xs text-gray-400 mt-1">Precio expresado en dólares estadounidenses (USD)</p>
            </div>

            <div className="py-4 border-y border-gray-100 my-2">
              <h3 className="font-spartan font-bold text-sm text-primary mb-1">Descripción del producto</h3>
              <p className="font-inter text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button
              variant="secondary"
              type="button"
              disabled={product.stock <= 0}
              onClick={handleAddToCart} // <-- Validamos sesión acá
              className="w-full py-3.5 flex items-center justify-center gap-2 text-base"
            >
              <ShoppingCart size={20} />
              Agregar al carrito
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-gray-500 font-inter text-xs">
                <Truck size={18} className="text-secondary shrink-0" />
                <span>Envío gratis a todo el país</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-500 font-inter text-xs">
                <ShieldCheck size={18} className="text-secondary shrink-0" />
                <span>Garantía oficial de 12 meses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};