import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productService';

export const useProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fallbackImage = `https://picsum.photos/seed/novamarket-${id}/600/450`;

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await productService.getProductById(id);

                const formattedProduct = {
                    ...data,
                    title: data.title || data.name,
                    imageSrc: data.image || fallbackImage,
                    formattedPrice: typeof data.price === 'number'
                        ? `$ ${data.price.toLocaleString('en-US')}`
                        : data.price,
                        description: data.description ||
                            'Diseñado para ofrecer el máximo rendimiento y durabilidad en tu setup diario. Cuenta con materiales de primera calidad, excelente ergonomía y garantía oficial de NovaMarket',
                            stock: data.stock ?? 12
                };

                setProduct(formattedProduct);
            } catch (error) {
                setError('No pudimos encontrar el producto que estás buscando');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, fallbackImage]);

    
    const handleImageError = e => {
        e.target.onerror = null;
        e.target.src = fallbackImage;
    };

    return {
        product,
        loading,
        error,
        handleImageError
    };
};