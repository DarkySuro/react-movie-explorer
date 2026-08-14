import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const apikey = import.meta.env.VITE_OMDB_API_KEY;

export default function Home() { 
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          async function fetchMovie() {
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
          fetchMovie();
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      { loading ? <h1>Loading...</h1> : error ?
      <h1 style={{ color: "red" }}>{error}</h1> :
      <div>
        {movies.map((m) => (
          <Link key={m.imdbID} to={`/movie/${m.imdbID}`}>
            <div>
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
            </div>
          </Link>
        ))}
      </div>}
    </div>
  );
}

