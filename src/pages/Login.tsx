import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (!isLogin && password !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    if (!isLogin && password.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({ title: "Bem-vindo(a)!", description: "Login realizado com sucesso." });
        navigate("/minha-conta");
      } else {
        if (!fullName.trim()) {
          toast({ title: "Erro", description: "Preencha seu nome.", variant: "destructive" });
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        toast({ title: "Conta criada!", description: "Sua conta foi criada com sucesso." });
        navigate("/minha-conta");
      }
    } catch (err: any) {
      toast({ title: "Erro", description: err.message || "Ocorreu um erro.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl font-bold text-foreground">
            Aura<span className="text-primary"> Beauty</span>
          </Link>
          <h2 className="font-display text-2xl font-semibold mt-6">
            {isLogin ? "Entrar na sua conta" : "Criar uma conta"}
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            {isLogin ? "Acesse sua conta para acompanhar seus pedidos" : "Cadastre-se para aproveitar ofertas exclusivas"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-1 block">Nome completo</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Seu nome" />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-1 block">Confirmar senha</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="••••••••"
                />
              </div>
            )}
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-xs text-primary hover:underline">Esqueci minha senha</a>
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-hero w-full disabled:opacity-50">
              {loading ? "Aguarde..." : isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
