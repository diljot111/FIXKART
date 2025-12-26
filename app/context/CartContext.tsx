"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure of a cart item based on your Prisma Product model
// We add a 'cartQuantity' field to track how many of this item are in the cart
export type CartItem = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  price: number;
  vendorId: string;
  cartQuantity: number; // Current quantity selected in cart
  maxStock: number;     // Max available from inventory
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('fixkart_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('fixkart_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, update its quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        // If new item, add it to cart
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          price: product.price,
          vendorId: product.vendorId,
          maxStock: product.quantity, // Assuming your DB field is 'quantity' for stock
          cartQuantity: quantity,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate total number of items in cart for the header badge
  const cartCount = cart.reduce((total, item) => total + item.cartQuantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context easily
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}