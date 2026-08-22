import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useSortFilter } from "../hooks/useSortFilter";

import SortFilterBar from "../components/SortFilterBar";

const apikey = import.meta.env.VITE_OMDB_API_KEY;
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    displayedMovies,
    sortOrder,
    setSortOrder,
    typeFilter,
    setTypeFilter,
  } = useSortFilter(movies);

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
      const movies = await res.json();

      if (movies.Response === "False") {
        throw new Error("Wrong movie name or Movie does not exist!");
      }

      setMovies(movies.Search);
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
    // start a new timer upon each key press
    // Wait 1 minute for next key press before searching for movies with typed keywords
    debouncerTimer.current = setTimeout(() => {
      fetchMovies();
    }, 1000);

    // clear the timer before re-rendering or unmouting
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
        <div>
          {/* <div className="sort-filter-bar">
            <div className="filter-group">
              <button
                disabled={typeFilter === "all"}
                onClick={() => setTypeFilter("all")}
              >
                All
              </button>
              <button
                disabled={typeFilter === "movie"}
                onClick={() => setTypeFilter("movie")}
              >
                Movies
              </button>
              <button
                disabled={typeFilter === "series"}
                onClick={() => setTypeFilter("series")}
              >
                Series
              </button>
              <button
                disabled={typeFilter === "episode"}
                onClick={() => setTypeFilter("episode")}
              >
                Episodes
              </button>
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div> */}
          {movies.length >0 && 
            <SortFilterBar
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              showRatingSort={false}
            />
          }
          <div className="movie-grid">
            {displayedMovies.map((m) => (
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
        </div>
      )}
    </div>
  );
}
