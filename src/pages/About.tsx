import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-subtitle">Conheça</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">Nossa História</h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="prose prose-lg mx-auto space-y-6 text-foreground/80">
          <p className="text-lg leading-relaxed">
            A <strong className="text-foreground">Aura Beauty</strong> nasceu em 2024 com o propósito de democratizar o acesso a cosméticos premium no Brasil. 
            Acreditamos que toda pessoa merece ter acesso a produtos de alta qualidade que realcem sua beleza natural.
          </p>
          <p className="leading-relaxed">
            Com uma curadoria cuidadosa das melhores marcas nacionais e internacionais, oferecemos uma experiência de compra 
            única, com atendimento personalizado e entrega rápida em todo o Brasil.
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground mt-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-6 not-prose">
            {[
              { emoji: "✨", title: "Qualidade", desc: "Apenas produtos originais e certificados" },
              { emoji: "🌱", title: "Sustentabilidade", desc: "Compromisso com o meio ambiente" },
              { emoji: "💝", title: "Confiança", desc: "Mais de 50.000 clientes satisfeitas" },
            ].map((v) => (
              <div key={v.title} className="text-center p-6 bg-secondary/50 rounded-xl">
                <span className="text-3xl">{v.emoji}</span>
                <h3 className="font-semibold mt-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
              </div>
            ))}
          </div>
          <h2 className="font-display text-2xl font-semibold text-foreground mt-12">Números que Inspiram</h2>
          <div className="grid grid-cols-3 gap-6 not-prose text-center">
            {[
              { num: "50K+", label: "Clientes" },
              { num: "500+", label: "Produtos" },
              { num: "4.8★", label: "Avaliação" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary">{s.num}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
