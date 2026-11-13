import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProducts } from "./useProducts";

export const useProductsCatalog = () => {
  const { category: urlCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim() || "";
  
  const [sortOption, setSortOption] = useState("recent");

  const {
    products,
    categories,
    selectedCategory,
    loading,
    error,
    handleCategoryChange,
  } = useProducts(urlCategory || "Todos");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.name?.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case "price-asc":
        return result.sort((a, b) => Number(a.price) - Number(b.price));
      case "price-desc":
        return result.sort((a, b) => Number(b.price) - Number(a.price));
      case "name-asc":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "recent":
      default:
        return result.sort((a, b) => b.id - a.id);
    }
  }, [products, searchQuery, sortOption]);

  const handleClearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleResetCatalog = () => {
    handleClearSearch();
    handleCategoryChange("Todos");
    setSortOption("recent");
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
  };

  return {
    products: filteredAndSortedProducts,
    categories,
    selectedCategory,
    loading,
    error,
    searchQuery,
    sortOption,
    handleCategoryChange,
    handleClearSearch,
    handleResetCatalog,
    handleSortChange,
  };
};