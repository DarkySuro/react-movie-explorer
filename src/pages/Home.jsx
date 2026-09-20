import { useState, useEffect, useRef } from "react";

import { useSortFilter } from "../hooks/useSortFilter";

import SortFilterBar from "../components/SortFilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const apikey = import.meta.env.VITE_OMDB_API_KEY;
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const isResettingPage = useRef(false);
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
        `http://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}&page=${currentPage}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch!" + res.status);
      }
      const movies = await res.json();

      if (movies.Response === "False") {
        throw new Error("Wrong movie name or Movie does not exist!");
      }

      setTotalResults(Number(movies.totalResults));
      setMovies(movies.Search);
    } catch (e) {
      console.log(e.message); //debug
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Effect 1 — debounced search, fires on searchTerm change
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

  // Effect 2 — pagination, fires on currentPage change, no debounce
  useEffect(() => {
    if (!searchTerm.trim()) return; // don't fetch if there is no active search
    if (isResettingPage.current) {
      isResettingPage.current = false; //consume the flag, reset it
      return; // skip - this was a search-reset, not real navigation
    }
    fetchMovies();
  }, [currentPage]);

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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
            isResettingPage.current = true; // mark: this page-1 reset came from a new search
          }}
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
          {movies.length > 0 && (
            <SortFilterBar
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              showRatingSort={false}
            />
          )}
          <div className="movie-grid">
            {displayedMovies.map((m) => (
              <MovieCard key={m.imdbID} movie={m} />
            ))}
          </div>
          {movies.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / 10)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      )}
    </div>
  );
}
