import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroBanner1 from "@/assets/hero-banner.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";

const slides = [
  {
    image: heroBanner1,
    subtitle: "Nova Coleção",
    title: "Fragrâncias que Encantam",
    description: "Descubra perfumes exclusivos com até 30% de desconto",
    cta: "Ver Coleção",
    link: "/produtos?categoria=perfumes",
  },
  {
    image: heroBanner2,
    subtitle: "Skincare Premium",
    title: "Cuide da sua Pele",
    description: "Os melhores séruns e hidratantes para uma pele radiante",
    cta: "Explorar Skincare",
    link: "/produtos?categoria=skincare",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl"
          >
            <p className="text-primary-foreground/80 text-sm uppercase tracking-[0.3em] font-medium mb-4">
              {slides[current].subtitle}
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4">
              {slides[current].title}
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8">
              {slides[current].description}
            </p>
            <div className="flex gap-4">
              <Link to={slides[current].link} className="btn-hero bg-primary">
                {slides[current].cta}
              </Link>
              <Link to="/produtos" className="btn-outline-hero border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                Ver Tudo
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
