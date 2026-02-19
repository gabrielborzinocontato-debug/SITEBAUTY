import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

const ProductCarousel = ({ title, subtitle, products }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            <h2 className="section-title">{title}</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, i) => (
            <div key={product.id} className="min-w-[260px] max-w-[260px] snap-start">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
