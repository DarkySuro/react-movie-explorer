import { Link } from "react-router-dom";
import { memo } from "react";

const MovieCard = memo(function MovieCard({ movie }) {
  console.log("Rendering card:", movie.Title); // temporary, to observe re-renders

  return (
    <Link className="movie-card" to={`/movie/${movie.imdbID}`}>
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
  );
});

export default MovieCard;
