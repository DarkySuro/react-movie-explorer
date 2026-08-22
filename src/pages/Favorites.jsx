import { Link } from "react-router-dom";
// Zustand store
import { useFavoritesStore } from "../store/useFavoritesStore";

import { useSortFilter } from "../hooks/useSortFilter";

import SortFilterBar from "../components/SortFilterBar";

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const {
    displayedMovies,
    sortOrder,
    setSortOrder,
    typeFilter,
    setTypeFilter,
  } = useSortFilter(favorites);

  const typeLabels = { movie: "movies", series: "series", episode: "episodes" };

  return (
    <div className="page">
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
      {favorites.length > 0 && (
        <SortFilterBar
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          showRatingSort={true}
        />
      )}
      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Search for a movie and save it here.</p>
        </div>
      ) : displayedMovies.length === 0 ? (
        <div className="empty-state">
          <h2>No {typeLabels[typeFilter] ?? "favorites"} found</h2>
          <p>Try a different filter.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {displayedMovies.map((m) => (
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
      )}
    </div>
  );
}
