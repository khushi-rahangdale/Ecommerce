import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists)
        return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((p) => p.id === id ? { ...p, qty } : p));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
