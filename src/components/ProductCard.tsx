import { Star, ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group product-card-hover bg-card rounded-xl overflow-hidden border border-border/50"
    >
      <div className="relative overflow-hidden aspect-square bg-secondary">
        <Link to={`/produto/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        {product.discount && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
        {product.isNew && !product.discount && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full">
            NOVO
          </span>
        )}
        <button
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-3 right-3 w-9 h-9 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-lg ${
            fav ? "text-primary" : "text-foreground opacity-0 group-hover:opacity-100"
          }`}
          style={fav ? { opacity: 1 } : undefined}
        >
          <Heart size={16} className={fav ? "fill-primary" : ""} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => addItem(product)}
            className="w-full bg-foreground/90 backdrop-blur-sm text-background py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-colors"
          >
            <ShoppingBag size={16} />
            Adicionar à sacola
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {product.price > 100 && (
          <p className="text-xs text-muted-foreground mt-1">
            ou 3x de {formatPrice(product.price / 3)} sem juros
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
