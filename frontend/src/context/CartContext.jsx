import { createContext, useState, useEffect, useMemo, useContext, useCallback } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const CART_STORAGE_KEY = user?.id 
    ? `novamarket_cart_${user.id}` 
    : "novamarket_cart_guest";

  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      setItems(savedCart ? JSON.parse(savedCart) : []);
    } catch (error) {
      setItems([]);
    }
  }, [CART_STORAGE_KEY]); 

  const addItem = useCallback((product, quantityToAdd = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      let newItems;

      if (existingIndex >= 0) {
        newItems = [...prevItems];
        const currentQty = newItems[existingIndex].quantity;
        const maxStock = product.stock ?? 99;
        newItems[existingIndex].quantity = Math.min(currentQty + quantityToAdd, maxStock);
      } else {
        newItems = [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            imageUrl: product.imageUrl,
            category: typeof product.category === "object" ? product.category?.name : product.category,
            stock: product.stock ?? 99,
            quantity: quantityToAdd,
          },
        ];
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
      return newItems;
    });
  }, [CART_STORAGE_KEY]);

  const removeItem = useCallback((productId) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
      return newItems;
    });
  }, [CART_STORAGE_KEY]);

  const updateQuantity = useCallback((productId, q) => {
    const newQuantity = Number(q);

    setItems((prevItems) => {
      if (newQuantity <= 0) {
        const newItems = prevItems.filter((item) => item.id !== productId);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
        return newItems;
      }

      const newItems = prevItems.map((item) => {
        if (item.id === productId) {
          const maxStock = item.stock ?? 99;
          return { ...item, quantity: Math.min(newQuantity, maxStock) };
        }
        return item;
      });

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
      return newItems;
    });
  }, [CART_STORAGE_KEY]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, [CART_STORAGE_KEY]);

  const { totalItems, totalAmount } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const itemQty = Number(item.quantity) || 0;
        const itemPrice = Number(item.price) || 0;
        acc.totalItems += itemQty;
        acc.totalAmount += itemPrice * itemQty;
        return acc;
      },
      { totalItems: 0, totalAmount: 0 }
    );
  }, [items]);

  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalAmount,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalAmount]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe utilizarse dentro de un CartProvider");
  return context;
};
