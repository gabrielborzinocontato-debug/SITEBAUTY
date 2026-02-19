import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, Heart, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";

const navLinks = [
  { label: "Perfumes", href: "/perfumes" },
  { label: "Skincare", href: "/skincare" },
  { label: "Maquiagem", href: "/maquiagem" },
  { label: "Cabelos", href: "/cabelos" },
  { label: "Corpo & Banho", href: "/corpo-e-banho" },
  { label: "Ofertas", href: "/produtos?ofertas=true" },
];

const Header = () => {
  const { totalItems, setIsOpen } = useCart();
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="gradient-rose text-primary-foreground text-xs py-2 text-center tracking-widest font-medium uppercase">
        Frete grátis acima de R$ 199 | Use o cupom BELEZA10 e ganhe 10% OFF
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Favorites icon - top left area */}
              <Link
                to="/favoritos"
                className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
                title="Favoritos"
              >
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>

            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Aura<span className="text-primary"> Beauty</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <Search size={20} />
              </button>

              {user ? (
                <>
                  <Link
                    to="/minha-conta"
                    className="p-2 text-foreground/70 hover:text-primary transition-colors hidden sm:block"
                    title="Minha Conta"
                  >
                    <User size={20} />
                  </Link>
                  <button
                    onClick={async () => { await signOut(); navigate("/"); }}
                    className="p-2 text-foreground/70 hover:text-primary transition-colors hidden sm:block"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-foreground/70 hover:text-primary transition-colors hidden sm:block"
                >
                  <User size={20} />
                </Link>
              )}

              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="md:hidden overflow-hidden border-t border-border bg-background">
              <nav className="flex flex-col py-4 px-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/favoritos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors uppercase tracking-wide"
                >
                  Favoritos
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/minha-conta"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors uppercase tracking-wide"
                    >
                      Minha Conta
                    </Link>
                    <button
                      onClick={async () => { setMobileMenuOpen(false); await signOut(); navigate("/"); }}
                      className="py-3 px-4 text-sm font-medium text-left text-destructive hover:bg-destructive/10 rounded-lg transition-colors uppercase tracking-wide"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors uppercase tracking-wide"
                  >
                    Login / Cadastro
                  </Link>
                )}
              </nav>
            </div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
