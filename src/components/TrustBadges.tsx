import { Shield, Truck, RotateCcw, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Shield, title: "Compra Segura", desc: "Seus dados protegidos com criptografia SSL" },
  { icon: Truck, title: "Frete Grátis", desc: "Em compras acima de R$ 199" },
  { icon: RotateCcw, title: "Troca Fácil", desc: "Até 30 dias para trocas e devoluções" },
  { icon: CreditCard, title: "Parcele em 3x", desc: "Sem juros no cartão de crédito" },
];

const TrustBadges = () => {
  return (
    <section className="py-12 border-y border-border bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{badge.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
