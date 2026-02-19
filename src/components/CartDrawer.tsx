import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const {
    items, isOpen, setIsOpen, removeItem, updateQuantity,
    totalItems, totalPrice, coupon, setCoupon, discount, applyCoupon,
  } = useCart();

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-display text-xl font-semibold">Sacola ({totalItems})</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={48} className="text-muted-foreground/30" />
                  <p className="text-muted-foreground">Sua sacola está vazia</p>
                  <button onClick={() => setIsOpen(false)} className="btn-primary text-sm">
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg bg-secondary"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.product.brand}</p>
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.product.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                {/* Coupon */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Cupom de desconto"
                    className="flex-1 bg-secondary text-foreground px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button onClick={applyCoupon} className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity">
                    Aplicar
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600">Desconto: -{formatPrice(discount)}</p>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="btn-hero block text-center w-full"
                >
                  Finalizar Compra
                </Link>
                <button onClick={() => setIsOpen(false)} className="w-full text-sm text-muted-foreground text-center hover:text-foreground transition-colors py-2">
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
