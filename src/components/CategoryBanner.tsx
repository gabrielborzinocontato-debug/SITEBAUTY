import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

const CategoryBanner = () => {
  const icons: Record<string, string> = {
    perfumes: "🌸",
    skincare: "✨",
    maquiagem: "💄",
    cabelos: "💇‍♀️",
    corpo: "🧴",
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="section-subtitle">Explore</p>
          <h2 className="section-title">Categorias</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/produtos?categoria=${cat.id}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-secondary/50 hover:bg-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <span className="text-3xl">{icons[cat.id] || "✨"}</span>
                <span className="text-sm font-semibold group-hover:text-primary transition-colors">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count} produtos</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
