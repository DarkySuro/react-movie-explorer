import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return favorites.length > 0 ? (
    <div>
      {favorites.map((m) => (
        <div key={m.imdbID}>
          <Link to={`/movie/${m.imdbID}`} style={{ display: "block" }}>
            <h2>{m.Title}</h2>
            <img
              src={
                m.Poster !== "N/A"
                  ? m.Poster
                  : "https://via.placeholder.com/200x300?text=No+Poster"
              }
              style={{ width: "360px", height: "240px" }}
              alt={m.Title}
            />
          </Link>
          <button onClick={() => removeFavorite(m.imdbID)}>
            Remove from favorite
          </button>
        </div>
      ))}
    </div>
  ) : (
    <h2>No favorites yet — go save some movies!</h2>
  );
}
