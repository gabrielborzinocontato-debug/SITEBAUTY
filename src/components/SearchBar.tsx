import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const highlight = (text: string) => {
    if (!query || query.length < 2) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, '<mark class="bg-primary/20 text-foreground rounded px-0.5">$1</mark>');
  };

  const handleSelect = (productId: string) => {
    navigate(`/produto/${productId}`);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="border-t border-border overflow-hidden"
    >
      <div className="container mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produtos, marcas, categorias..."
            className="w-full bg-secondary text-foreground pl-12 pr-10 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          )}
        </form>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden max-h-[400px] overflow-y-auto"
            >
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors text-left border-b border-border/50 last:border-0"
                >
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium text-foreground truncate"
                      dangerouslySetInnerHTML={{ __html: highlight(product.name) }}
                    />
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground whitespace-nowrap">{formatPrice(product.price)}</span>
                </button>
              ))}
              {query.length >= 2 && (
                <button
                  onClick={() => { navigate(`/produtos?busca=${encodeURIComponent(query)}`); onClose(); }}
                  className="w-full p-3 text-sm text-primary font-medium hover:bg-secondary/50 transition-colors text-center"
                >
                  Ver todos os resultados para "{query}"
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {query.length >= 2 && results.length === 0 && (
          <p className="text-sm text-muted-foreground mt-3 text-center">Nenhum produto encontrado para "{query}"</p>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;
