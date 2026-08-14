import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { FavoritesContext } from "../context/FavoritesContext";

const apikey = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`);

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  return (
    <div className="page">
      <Link to="/" className="detail-back">
        ← Back to Search
      </Link>
      {loading ? (
        <p className="status-message">Loading...</p>
      ) : error ? (
        <p className="status-message error">{error}</p>
      ) : (
        <div className="detail-layout">
          <div className="poster-wrap">
            {movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={movie.Title} />
            ) : (
              <div className="no-poster">No Image</div>
            )}
          </div>
          <div className="detail-info">
            <h1>{movie.Title}</h1>
            <div className="meta-row">
              <span>{movie.Year}</span>
              <span>{movie.Genre}</span>
              <span>★ {movie.imdbRating}</span>
            </div>
            <div className="field">
              <div className="label">Director</div>
              <div className="value">{movie.Director}</div>
            </div>
            <div className="field">
              <div className="label">Plot</div>
              <div className="value">{movie.Plot}</div>
            </div>
            <button
              className={`favorite-btn ${isFavorite(movie.imdbID) ? "is-favorite" : ""}`}
              onClick={() =>
                isFavorite(movie.imdbID)
                  ? removeFavorite(movie.imdbID)
                  : addFavorite(movie)
              }
            >
              {isFavorite(movie.imdbID)
                ? "★ Saved to Favorites"
                : "☆ Add to Favorites"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
