import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../services/productService";

const CATEGORIES = [
  "Todos",
  "Gaming",
  "Home Office",
  "Periféricos",
  "Audio",
  "Monitores",
  "Accesorios",
];

const normalize = (str = "") =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const useProducts = (initialCategory = "Todos") => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        const list = data?.data || data || [];
        setAllProducts(list);
        setProducts(list);
      } catch (err) {
        setError(
          "No pudimos cargar los productos. Intentá de nuevo más tarde.",
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    if (!initialCategory || normalize(initialCategory) === "todos") {
      setProducts(allProducts);
      setSelectedCategory("Todos");
    } else {
      const filtered = allProducts.filter((p) => {
        const cat = p.category?.name || p.category;
        return normalize(cat) === normalize(initialCategory);
      });
      setProducts(filtered);

      const categoriaCorrecta =
        CATEGORIES.find(
          (c) => normalize(c) === normalize(initialCategory),
        ) || initialCategory;

      setSelectedCategory(categoriaCorrecta);
    }
  }, [initialCategory, allProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "Todos") {
      navigate("/categorias");
    } else {
      navigate(`/categorias/${normalize(category)}`);
    }
  };

  return {
    products,
    categories: CATEGORIES,
    selectedCategory,
    loading,
    error,
    handleCategoryChange,
  };
};