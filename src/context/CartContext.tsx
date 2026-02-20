import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
  selectedVariantName?: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, variantId?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  coupon: string;
  setCoupon: (c: string) => void;
  discount: number;
  applyCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const addItem = useCallback((product: Product, variantId?: string) => {
    setItems((prev) => {
      const variant = variantId ? product.variants?.find(v => v.id === variantId) : null;
      const price = variant ? variant.price : product.price;
      const itemId = variantId ? `${product.id}-${variantId}` : product.id;

      const existing = prev.find((i) => (i.variantId ? `${i.product.id}-${i.variantId}` : i.product.id) === itemId);
      if (existing) {
        return prev.map((i) =>
          (i.variantId ? `${i.product.id}-${i.variantId}` : i.product.id) === itemId
            ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, variantId, selectedVariantName: variant?.name, price }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => (i.variantId ? `${i.product.id}-${i.variantId}` : i.product.id) !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => (i.variantId ? `${i.product.id}-${i.variantId}` : i.product.id) !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => ((i.variantId ? `${i.product.id}-${i.variantId}` : i.product.id) === itemId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalPrice = subtotal - discount;

  const applyCoupon = useCallback(() => {
    if (coupon.toUpperCase() === "BELEZA10") {
      setDiscount(subtotal * 0.1);
    } else if (coupon.toUpperCase() === "PRIMEIRA") {
      setDiscount(subtotal * 0.15);
    } else {
      setDiscount(0);
    }
  }, [coupon, subtotal]);

  return (
    <CartContext.Provider
      value={{
        items, isOpen, setIsOpen, addItem, removeItem, updateQuantity,
        clearCart, totalItems, totalPrice, coupon, setCoupon, discount, applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
