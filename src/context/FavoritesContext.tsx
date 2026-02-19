import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const LOCAL_KEY = "aura_favorites";

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorites
  useEffect(() => {
    if (user) {
      setLoading(true);
      supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", user.id)
        .then(({ data }) => {
          setFavorites(data?.map((f) => f.product_id) ?? []);
          setLoading(false);
        });
    } else {
      const stored = localStorage.getItem(LOCAL_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    }
  }, [user]);

  const toggleFavorite = useCallback(
    async (productId: string) => {
      const isFav = favorites.includes(productId);

      if (user) {
        if (isFav) {
          setFavorites((prev) => prev.filter((id) => id !== productId));
          await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId);
        } else {
          setFavorites((prev) => [...prev, productId]);
          await supabase.from("favorites").insert({ user_id: user.id, product_id: productId });
        }
      } else {
        let next: string[];
        if (isFav) {
          next = favorites.filter((id) => id !== productId);
        } else {
          next = [...favorites, productId];
        }
        setFavorites(next);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      }
    },
    [favorites, user]
  );

  const isFavorite = useCallback((productId: string) => favorites.includes(productId), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
