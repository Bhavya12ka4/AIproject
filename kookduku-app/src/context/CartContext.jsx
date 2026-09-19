import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "kookduku_cart_items";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  // Add or increment item
  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const currentQty = existing ? existing.qty : 0;
      const newQty = qty > 1 ? qty : currentQty + 1;
      return {
        ...prev,
        [item.id]: {
          item,
          qty: newQty,
        },
      };
    });
  };

  // Decrement item
  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: {
          ...existing,
          qty: existing.qty - 1,
        },
      };
    });
  };

  // Set explicit quantity
  const setItemQty = (item, qty) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[item.id];
        return next;
      }
      return {
        ...prev,
        [item.id]: {
          item,
          qty,
        },
      };
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart({});
  };

  // Calculated properties
  const cartList = Object.values(cart);
  const totalItems = cartList.reduce((sum, entry) => sum + entry.qty, 0);

  const subtotal = cartList.reduce((sum, entry) => {
    const priceNum = typeof entry.item.price === "number" ? entry.item.price : 0;
    return sum + priceNum * entry.qty;
  }, 0);

  const gstAmount = 0;
  const grandTotal = subtotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartList,
        totalItems,
        subtotal,
        gstAmount,
        grandTotal,
        addToCart,
        removeFromCart,
        setItemQty,
        clearCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout: () => setIsCheckoutOpen(true),
        closeCheckout: () => setIsCheckoutOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
