import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Package, Settings, LogOut, ChevronRight } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  order_items: { id: string; product_name: string; product_image: string | null; quantity: number; price: number }[];
}

const statusMap: Record<string, { label: string; color: string }> = {
  processing: { label: "Processando", color: "bg-yellow-100 text-yellow-800" },
  shipped: { label: "Enviado", color: "bg-blue-100 text-blue-800" },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
};

const MyAccount = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<"orders" | "settings">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [profile, setProfile] = useState<{ full_name: string } | null>(null);

  // Settings form
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      if (profileData) setProfile(profileData);

      // Fetch orders with items
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (ordersData) setOrders(ordersData as any);
      setLoadingOrders(false);
    };
    fetchData();
  }, [user]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ title: "Erro", description: "A nova senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Senha alterada com sucesso!" });
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setSavingEmail(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setSavingEmail(false);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "E-mail atualizado!" });
      setNewEmail("");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Carregando...</p></div>;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Minha Conta</h1>
          <p className="text-muted-foreground mt-1">
            Olá, <span className="font-medium text-foreground">{profile?.full_name || user?.email}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-4 space-y-1">
              <button
                onClick={() => setTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${tab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
              >
                <Package size={18} /> Meus Pedidos <ChevronRight size={14} className="ml-auto" />
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${tab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
              >
                <Settings size={18} /> Configurações <ChevronRight size={14} className="ml-auto" />
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut size={18} /> Sair
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === "orders" && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-xl font-semibold mb-6">Meus Pedidos</h2>
                {loadingOrders ? (
                  <p className="text-muted-foreground text-sm">Carregando pedidos...</p>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Você ainda não fez nenhum pedido.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const st = statusMap[order.status] || statusMap.processing;
                      return (
                        <div key={order.id} className="border border-border rounded-lg p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div>
                              <span className="text-sm font-bold">Pedido {order.order_number}</span>
                              <span className="text-xs text-muted-foreground ml-3">
                                {new Date(order.created_at).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${st.color}`}>{st.label}</span>
                          </div>
                          <div className="space-y-2">
                            {order.order_items?.map((item) => (
                              <div key={item.id} className="flex items-center gap-3">
                                {item.product_image && (
                                  <img src={item.product_image} alt={item.product_name} className="w-10 h-10 rounded object-cover bg-secondary" />
                                )}
                                <span className="text-sm flex-1">{item.product_name}</span>
                                <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-border mt-3 pt-3 text-right">
                            <span className="text-sm font-bold">Total: {formatPrice(Number(order.total))}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {tab === "settings" && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">Alterar Senha</h3>
                  <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Nova senha</label>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Confirmar nova senha</label>
                      <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={savingPassword} className="btn-primary disabled:opacity-50">
                      {savingPassword ? "Salvando..." : "Alterar Senha"}
                    </button>
                  </form>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">Alterar E-mail</h3>
                  <p className="text-sm text-muted-foreground mb-4">E-mail atual: {user?.email}</p>
                  <form onSubmit={handleChangeEmail} className="space-y-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Novo e-mail</label>
                      <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="novo@email.com" />
                    </div>
                    <button type="submit" disabled={savingEmail} className="btn-primary disabled:opacity-50">
                      {savingEmail ? "Salvando..." : "Alterar E-mail"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
