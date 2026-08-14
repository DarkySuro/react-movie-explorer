import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const apikey = import.meta.env.VITE_OMDB_API_KEY;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncerTimer = useRef(null);

  async function fetchMovies() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch!" + res.status);
      }
      const movie = await res.json();

      if (movie.Response === "False") {
        throw new Error("Wrong movie name or Movie does not exist!");
      }

      setMovies(movie.Search);
    } catch (e) {
      console.log(e.message); //debug
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!searchTerm.trim()) {
      setMovies([]); // clear old results if the user erases their search
      setError(null); // don't show a stale error either
      return; // don't schedule a fetch at all
    }
    // clearTimeout(debouncerTimer.current);
    debouncerTimer.current = setTimeout(() => {
      fetchMovies();
    }, 1000);

    return () => clearTimeout(debouncerTimer.current);
  }, [searchTerm]);

  return (
    <div className="page">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!searchTerm.trim()) return;
          clearTimeout(debouncerTimer.current);
          fetchMovies();
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p className="status-message">Loading...</p>
      ) : error ? (
        <p className="status-message error" style={{ color: "red" }}>
          {error}
        </p>
      ) : (
        <div className="movie-grid">
          {movies.map((m) => (
            <Link
              className="movie-card"
              key={m.imdbID}
              to={`/movie/${m.imdbID}`}
            >
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
          ))}
        </div>
      )}
    </div>
  );
}
