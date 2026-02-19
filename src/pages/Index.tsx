import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryBanner from "@/components/CategoryBanner";
import TrustBadges from "@/components/TrustBadges";
import TestimonialsSection from "@/components/TestimonialsSection";
import {
  products,
  getBestsellers,
  getNewProducts,
  getProductsByCategory,
} from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBadges />
      <CategoryBanner />
      <ProductCarousel
        title="Mais Vendidos"
        subtitle="Favoritos"
        products={getBestsellers().length > 0 ? getBestsellers() : products.slice(0, 6)}
      />
      <ProductCarousel
        title="Perfumes"
        subtitle="Fragrâncias exclusivas"
        products={getProductsByCategory("perfumes")}
      />
      <ProductCarousel
        title="Skincare"
        subtitle="Cuide da sua pele"
        products={getProductsByCategory("skincare")}
      />
      <ProductCarousel
        title="Novidades"
        subtitle="Acabou de chegar"
        products={getNewProducts().length > 0 ? getNewProducts() : products.slice(0, 4)}
      />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
