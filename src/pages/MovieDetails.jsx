import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const apikey = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {addFavorite, removeFavorite, isFavorite} = useContext(FavoritesContext)

  useEffect(() => {
    async function fetchMovieDetails() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apikey}&i=${id}`,
        );

        if (!res.ok) throw new Error("Failed to fetch details!");
        const data = await res.json();

        if (data.Response === "False")
          throw new Error("Wrong Movie or does not exist!");

        setMovie(data);
      } catch (e) {
        console.log(e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      <Link to="/">Back to Search</Link>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1 style={{ color: "red" }}>{error}</h1>
      ) : (
        <div>
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/200x300?text=No+Poster"
            }
            style={{ width: "360px", height: "240px" }}
            alt={movie.Title}
          />
          <h1>{"Title: " + movie.Title}</h1>
          <p>{"Year: " + movie.Year}</p>
          <p>{"Genre: " + movie.Genre}</p>
          <p>{"Director: " + movie.Director}</p>
          <p>{"Plot: " + movie.Plot}</p>
          <p>{"Rating: " + movie.imdbRating}</p>
          <button onClick={() => isFavorite(movie.imdbID) ? removeFavorite(movie.imdbID): addFavorite(movie)}>
            {isFavorite(movie.imdbID) ? 'Remove from favorite' : 'Add to favorite'}
          </button>
        </div>
      )}
    </div>
  );
}
