import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="bg-primary/10 border-t border-border">
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Receba ofertas exclusivas
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Cadastre-se e ganhe 15% de desconto na primeira compra
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 bg-background text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border"
            />
            <button className="btn-primary whitespace-nowrap">
              Cadastrar
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Aura Beauty</h4>
            <p className="text-sm text-background/60 leading-relaxed">
              A maior loja de cosméticos online do Brasil. Beleza, qualidade e sofisticação ao seu alcance.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/perfumes" className="hover:text-background transition-colors">Perfumes</Link></li>
              <li><Link to="/skincare" className="hover:text-background transition-colors">Skincare</Link></li>
              <li><Link to="/maquiagem" className="hover:text-background transition-colors">Maquiagem</Link></li>
              <li><Link to="/cabelos" className="hover:text-background transition-colors">Cabelos</Link></li>
              <li><Link to="/corpo-e-banho" className="hover:text-background transition-colors">Corpo & Banho</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/sobre" className="hover:text-background transition-colors">Sobre nós</Link></li>
              <li><Link to="/politica-privacidade" className="hover:text-background transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-background transition-colors">Termos de Uso</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Fale Conosco</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li className="flex items-center gap-2"><Mail size={14} /> contato@aurabeauty.com.br</li>
              <li>SAC: 0800 123 4567</li>
              <li>Seg a Sex: 8h às 20h</li>
              <li>Sáb: 8h às 14h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">© 2024 Aura Beauty. Todos os direitos reservados. CNPJ: 55.808.768/0001-88</p>
          <div className="flex items-center gap-4 text-xs text-background/40">
            <span>🔒 Compra Segura</span>
            <span>✓ Site Verificado</span>
            <span>🚚 Entrega Garantida</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
