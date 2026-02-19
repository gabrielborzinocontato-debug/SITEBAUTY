import { useFavorites } from "@/context/FavoritesContext";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen">
      <div className="bg-secondary/50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Heart className="text-primary" size={28} /> Meus Favoritos
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? "produto" : "produtos"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">Nenhum favorito ainda</p>
            <Link to="/produtos" className="btn-primary inline-block mt-4">
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {favoriteProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl overflow-hidden border border-border/50 group"
              >
                <div className="relative overflow-hidden aspect-square bg-secondary">
                  <Link to={`/produto/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                  </Link>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-destructive hover:scale-110 transition-transform shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-foreground mt-2">{formatPrice(product.price)}</p>
                  <button
                    onClick={() => addItem(product)}
                    className="w-full mt-3 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag size={16} /> Comprar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
