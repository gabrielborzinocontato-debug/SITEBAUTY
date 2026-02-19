import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [placing, setPlacing] = useState(false);

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleFinalize = async () => {
    if (!user) {
      toast({ title: "Faça login", description: "Você precisa estar logado para finalizar o pedido.", variant: "destructive" });
      navigate("/login");
      return;
    }
    setPlacing(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({ user_id: user.id, total: totalPrice, status: "processing" })
        .select()
        .single();
      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.product.name,
        product_image: item.product.image,
        quantity: item.quantity,
        price: item.product.price,
      }));
      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      toast({ title: "Pedido realizado! 🎉", description: `Pedido ${order.order_number} criado com sucesso.` });
      navigate("/minha-conta");
    } catch (err: any) {
      toast({ title: "Erro", description: err.message || "Erro ao criar pedido.", variant: "destructive" });
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4">Carrinho vazio</h2>
          <Link to="/produtos" className="btn-primary">Ver produtos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ChevronLeft size={16} /> Voltar à loja
        </Link>

        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {["Dados", "Entrega", "Pagamento"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= i + 1 ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium ${step >= i + 1 ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              {i < 2 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-semibold mb-4">Dados Pessoais</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Nome</label>
                      <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Sobrenome</label>
                      <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Seu sobrenome" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">E-mail</label>
                    <input type="email" className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">CPF</label>
                    <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="000.000.000-00" />
                  </div>
                  <button onClick={() => setStep(2)} className="btn-hero w-full mt-4">Continuar</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-semibold mb-4">Endereço de Entrega</h2>
                  <div>
                    <label className="text-sm font-medium mb-1 block">CEP</label>
                    <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="00000-000" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1 block">Rua</label>
                      <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Número</label>
                      <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Cidade</label>
                      <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Estado</label>
                      <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Opções de frete:</p>
                    <label className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border cursor-pointer mb-2">
                      <input type="radio" name="shipping" defaultChecked className="accent-primary" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">PAC - 5 a 8 dias úteis</span>
                        <span className="text-sm text-muted-foreground ml-2">Grátis</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border cursor-pointer">
                      <input type="radio" name="shipping" className="accent-primary" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">SEDEX - 2 a 3 dias úteis</span>
                        <span className="text-sm text-muted-foreground ml-2">R$ 14,90</span>
                      </div>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline-hero flex-1">Voltar</button>
                    <button onClick={() => setStep(3)} className="btn-hero flex-1">Continuar</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-semibold mb-4">Pagamento</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border border-border cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="accent-primary" />
                      <span className="text-sm font-medium">Cartão de Crédito</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border border-border cursor-pointer">
                      <input type="radio" name="payment" className="accent-primary" />
                      <span className="text-sm font-medium">PIX (5% de desconto)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border border-border cursor-pointer">
                      <input type="radio" name="payment" className="accent-primary" />
                      <span className="text-sm font-medium">Boleto Bancário</span>
                    </label>
                  </div>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Número do cartão</label>
                      <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Validade</label>
                        <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="MM/AA" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">CVV</label>
                        <input className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="000" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setStep(2)} className="btn-outline-hero flex-1">Voltar</button>
                    <button onClick={handleFinalize} disabled={placing} className="btn-hero flex-1 disabled:opacity-50">
                      {placing ? "Processando..." : "Finalizar Pedido"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="font-display text-lg font-semibold mb-4">Resumo do Pedido</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded bg-secondary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
