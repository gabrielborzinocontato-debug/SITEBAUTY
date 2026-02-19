import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import MyAccount from "./pages/MyAccount";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1 } } });

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <CartDrawer />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/perfumes" element={<Products fixedCategory="perfumes" />} />
                <Route path="/skincare" element={<Products fixedCategory="skincare" />} />
                <Route path="/maquiagem" element={<Products fixedCategory="maquiagem" />} />
                <Route path="/cabelos" element={<Products fixedCategory="cabelos" />} />
                <Route path="/corpo-e-banho" element={<Products fixedCategory="corpo" />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/minha-conta" element={<MyAccount />} />
                <Route path="/favoritos" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
