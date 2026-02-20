import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Star, ShoppingBag, Heart, Truck, Shield, RotateCcw, ChevronLeft, ArrowRight, TrendingUp, Users } from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: "none" });
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product?.variants ? product.variants[0].id : null
  );
  const fav = product ? isFavorite(product.id) : false;

  const currentVariant = product?.variants?.find(v => v.id === selectedVariantId) || null;
  const currentPrice = currentVariant ? currentVariant.price : product?.price || 0;
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product?.originalPrice;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundImage: `url(${product?.images ? product.images[currentImageIndex] : product?.image})`,
      backgroundPosition: `${x}% ${y}%`,
      left: `${e.clientX - left}px`,
      top: `${e.clientY - top}px`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

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
          {/* Images Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div
              className="relative aspect-square bg-secondary rounded-xl overflow-hidden group cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images ? product.images[currentImageIndex] : product.image}
                  alt={product.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Zoom Lens */}
              <div
                className="absolute pointer-events-none border-2 border-white/50 rounded-full w-40 h-40 shadow-2xl hidden md:block"
                style={{
                  ...zoomStyle,
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  backgroundSize: "250%",
                  backgroundRepeat: "no-repeat",
                  zIndex: 20,
                }}
              />

              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : product.images!.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev < product.images!.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <ArrowRight size={20} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === i ? "bg-primary w-4" : "bg-primary/30"
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === i ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              {product.socialProof?.trendLabel && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    <TrendingUp size={12} /> {product.socialProof.trendLabel}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">✨ Mais Vendido</span>
                </div>
              )}
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.brand}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{product.name}</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"} />
                  ))}
                </div>
                <span className="text-sm text-foreground font-medium">({product.reviews})</span>
              </div>

              {product.socialProof?.salesCount && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground border-l border-border pl-4">
                  <Users size={16} className="text-primary/60" />
                  <span>+{product.socialProof.salesCount} clientes atendidas</span>
                </div>
              )}
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

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tighter">100% Original</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">Garantia total de procedência</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tighter">Envio Seguro</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">Rastreamento em tempo real</p>
                </div>
              </div>
            </div>

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

            {product.scarcityMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor: ["rgba(234, 179, 8, 0.1)", "rgba(234, 179, 8, 0.2)", "rgba(234, 179, 8, 0.1)"]
                }}
                transition={{
                  backgroundColor: { repeat: Infinity, duration: 2 }
                }}
                className="p-3 rounded-lg border border-yellow-500/30 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-sm font-bold text-yellow-700 uppercase tracking-tight">
                  {product.scarcityMessage}
                </span>
              </motion.div>
            )}

            {product.id === "15" && (
              <div className="flex items-center gap-2 text-[11px] font-semibold text-primary/80 uppercase tracking-tight px-1 font-inter">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                <span>🔥 17 pessoas viram este produto nos últimos 30 min</span>
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
