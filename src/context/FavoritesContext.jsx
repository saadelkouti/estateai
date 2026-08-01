import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('estateai:favorites', []);
  const { showToast } = useToast();

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id, title) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        showToast(`Removed "${title}" from favorites`, 'info');
        return prev.filter((f) => f !== id);
      }
      showToast(`Added "${title}" to favorites`, 'success');
      return [...prev, id];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFavorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
