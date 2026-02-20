import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Star, ShoppingBag, Heart, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product?.variants ? product.variants[0].id : null
  );
  const fav = product ? isFavorite(product.id) : false;

  const currentVariant = product?.variants?.find(v => v.id === selectedVariantId) || null;
  const currentPrice = currentVariant ? currentVariant.price : product?.price || 0;
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product?.originalPrice;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Link to="/produtos" className="btn-primary">Ver produtos</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <Link to="/produtos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ChevronLeft size={16} /> Voltar para produtos
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.brand}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{product.name}</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} avaliações)</span>
            </div>

            <div className="space-y-1">
              {currentOriginalPrice && (
                <p className="text-sm text-muted-foreground line-through">{formatPrice(currentOriginalPrice)}</p>
              )}
              <p className="text-3xl font-bold text-foreground">{formatPrice(currentPrice)}</p>
              <p className="text-sm text-muted-foreground">
                ou 3x de {formatPrice(currentPrice / 3)} sem juros
              </p>
            </div>

            <p className="text-foreground/80 leading-relaxed">{product.description}</p>

            {product.benefits && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase tracking-wider">Benefícios</h3>
                <ul className="space-y-1">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.variants && (
              <div className="space-y-3 pt-2">
                <h3 className="font-semibold text-sm uppercase tracking-wider">Tamanho</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedVariantId === variant.id
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border hover:border-primary/50 text-muted-foreground"
                        }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  -
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product, selectedVariantId || undefined);
                }}
                className="flex-1 btn-hero flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Adicionar à Sacola
              </button>
              <button
                onClick={() => product && toggleFavorite(product.id)}
                className={`w-12 h-12 border border-border rounded-lg flex items-center justify-center transition-colors ${fav ? "text-primary border-primary bg-primary/5" : "text-foreground hover:text-primary hover:border-primary"
                  }`}
              >
                <Heart size={20} className={fav ? "fill-primary" : ""} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground">Frete grátis</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Shield size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground">Compra segura</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RotateCcw size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground">Troca fácil</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="section-title mb-8">Avaliações</h2>
          <div className="space-y-6">
            {(product.customReviews || [
              { name: "Maria S.", rating: 5, text: "Produto maravilhoso! Superou minhas expectativas. Embalagem linda e entrega rápida.", date: "15/01/2026" },
              { name: "Ana P.", rating: 4, text: "Muito bom! A qualidade é excelente, só achei o preço um pouco alto. Mas vale a pena pelo resultado.", date: "08/01/2026" },
              { name: "Camila R.", rating: 5, text: "Amei! Já é minha segunda compra e não troco por nada. Recomendo demais!", date: "02/01/2026" },
            ]).map((review, i) => (
              <div key={i} className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={12} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-foreground/80">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
