import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProducts } from "./useProducts";

export const useProductsCatalog = () => {
  const { category: urlCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim() || "";

  const {
    products,
    categories,
    selectedCategory,
    loading,
    error,
    handleCategoryChange,
  } = useProducts(urlCategory || "Todos");

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter((product) =>
      product.name?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleClearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleResetCatalog = () => {
    handleClearSearch();
    handleCategoryChange("Todos");
  };

  return {
    products: filteredProducts,
    categories,
    selectedCategory,
    loading,
    error,
    searchQuery,
    handleCategoryChange,
    handleClearSearch,
    handleResetCatalog,
  };
};