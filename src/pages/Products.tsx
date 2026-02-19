import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

interface ProductsProps {
  fixedCategory?: string;
}

const Products = ({ fixedCategory }: ProductsProps) => {
  const [searchParams] = useSearchParams();
  const categoryParam = fixedCategory || searchParams.get("categoria") || "";
  const offersParam = searchParams.get("ofertas");
  const searchQuery = searchParams.get("busca") || "";
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    const cat = fixedCategory || selectedCategory;
    if (cat) {
      filtered = filtered.filter((p) => p.category === cat);
    }
    if (offersParam) {
      filtered = filtered.filter((p) => p.discount);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    return filtered;
  }, [selectedCategory, fixedCategory, offersParam, sortBy, searchQuery]);

  const pageTitle = searchQuery
    ? `Resultados para "${searchQuery}"`
    : fixedCategory
    ? categories.find((c) => c.id === fixedCategory)?.name || "Produtos"
    : selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name || "Produtos"
    : offersParam
    ? "Ofertas"
    : "Todos os Produtos";

  return (
    <div className="min-h-screen">
      <div className="bg-secondary/50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground text-sm mt-1">{filteredProducts.length} produtos encontrados</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 gap-4">
          {!fixedCategory && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium border border-border px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <SlidersHorizontal size={16} /> Filtros
            </button>
          )}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 ml-auto"
          >
            <option value="relevance">Relevância</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="rating">Avaliação</option>
          </select>
        </div>

        {!fixedCategory && showFilters && (
          <div className="flex flex-wrap gap-2 mb-6 p-4 bg-secondary/30 rounded-lg">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory ? "bg-primary text-primary-foreground" : "bg-background border border-border hover:bg-secondary"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-background border border-border hover:bg-secondary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
