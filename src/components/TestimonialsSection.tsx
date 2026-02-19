import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Carolina Mendes",
    text: "Os produtos são incríveis! O sérum de Vitamina C mudou minha pele completamente. Entrega rápida e embalagem perfeita.",
    rating: 5,
    product: "Sérum Vitamina C Radiance",
  },
  {
    name: "Fernanda Oliveira",
    text: "Melhor loja online de cosméticos! Os perfumes são originais e chegam super bem embalados. Já sou cliente fiel.",
    rating: 5,
    product: "Eau de Parfum Lumière Dorée",
  },
  {
    name: "Juliana Santos",
    text: "A paleta de sombras Nude Glow é maravilhosa! Pigmentação perfeita e dura o dia inteiro. Super recomendo!",
    rating: 5,
    product: "Paleta Nude Glow",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="section-subtitle">O que dizem</p>
          <h2 className="section-title">Nossas Clientes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-xl p-6 border border-border/50 shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">sobre {t.product}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
