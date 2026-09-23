import { Link } from "react-router-dom";
import { memo } from "react";
import { useFavoritesStore } from "../store/useFavoritesStore";

const MovieCard = memo(function MovieCard({ movie, showRemoveButton = false }) {
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  return (
    <div key={movie.imdbID} className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="poster-wrap">
          {movie.Poster !== "N/A" ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="no-poster">No Image</div>
          )}
        </div>
        <div className="card-body">
          <h2>{movie.Title}</h2>
          <div className="year">{movie.Year}</div>
        </div>
      </Link>
      {showRemoveButton && (
        <button className="remove-btn" onClick={() => removeFavorite(movie.imdbID)}>
          Remove
        </button>
      )}
    </div>
  );
});

export default MovieCard;
