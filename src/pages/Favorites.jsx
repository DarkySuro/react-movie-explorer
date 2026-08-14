import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="page">
      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((m) => (
            <div key={m.imdbID} className="movie-card">
              <Link to={`/movie/${m.imdbID}`}>
                <div className="poster-wrap">
                  {m.Poster !== "N/A" ? (
                    <img src={m.Poster} alt={m.Title} />
                  ) : (
                    <div className="no-poster">No Image</div>
                  )}
                </div>
                <div className="card-body">
                  <h2>{m.Title}</h2>
                  <div className="year">{m.Year}</div>
                </div>
              </Link>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(m.imdbID)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Search for a movie and save it here.</p>
        </div>
      )}
    </div>
  );
}
