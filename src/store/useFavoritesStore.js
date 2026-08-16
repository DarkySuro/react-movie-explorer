import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
  favorites: (() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  })(),
  addFavorite: (movie) => {
    if (get().isFavorite(movie.imdbID)) return;
    
    const updated = [...get().favorites, movie];
    set({ favorites: updated });
    localStorage.setItem('favorites', JSON.stringify(updated));
  },
  removeFavorite: (id) => {
    if (!get().isFavorite(id)) return;

    const updated = get().favorites.filter((f) => f.imdbID !== id);
    set({ favorites: updated });
    localStorage.setItem("favorites", JSON.stringify(updated));
  },
  isFavorite: (id) => get().favorites.some((f) => f.imdbID === id)
}));