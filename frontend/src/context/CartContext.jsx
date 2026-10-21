import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CART_STORAGE_KEY = "novamarket_cart";

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al leer el carrito de localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    if (!user) {
      setItems([]);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [items]);

  const addItem = (product, quantityToAdd = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex >= 0) {
        const updatedItems = [...prevItems];
        const currentQty = updatedItems[existingIndex].quantity;
        const maxStock = product.stock ?? 99;
        const newQty = Math.min(currentQty + quantityToAdd, maxStock);

        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: newQty,
        };

        return updatedItems;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          imageUrl: product.imageUrl,
          category:
            typeof product.category === "object"
              ? product.category?.name
              : product.category,
          stock: product.stock ?? 99,
          quantity: quantityToAdd,
        },
      ];
    });
  };

  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, q) => {
    const newQuantity = Number(q);

    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const maxStock = item.stock ?? 99;
          return { ...item, quantity: Math.min(newQuantity, maxStock) };
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const { totalItems, totalAmount } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const itemQty = Number(item.quantity) || 0;
        const itemPrice = Number(item.price) || 0;

        acc.totalItems += itemQty;
        acc.totalAmount += itemPrice * itemQty;
        return acc;
      },
      { totalItems: 0, totalAmount: 0 },
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context)
    throw new Error("useCart debe utilizarse dentro de un CartProvider");
  return context;
};
