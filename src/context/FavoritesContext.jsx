import { useState, useEffect, useContext, createContext } from "react";

export const FavoritesContext = createContext();
export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : []; 
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(movie) {
    const alreadyExists = favorites.some((f) => f.imdbID === movie.imdbID);
    if (alreadyExists) {
      return `${movie.Title} already added to favorite List!`;
    }
    setFavorites((favorites) => [...favorites, movie]);
  }

  function removeFavorite(id) {
    const alreadyExists = favorites.some((movie) => movie.imdbID === id);
    if (!alreadyExists) {
      return `Movie is not in Favorite List!`;
    } 
    setFavorites((favorites) => favorites.filter((f) => f.imdbID !== id));
      
  }

  function isFavorite(id) {
    return favorites.some((movie) => movie.imdbID === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}