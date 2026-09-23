import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Zustand store
import { useFavoritesStore } from "../store/useFavoritesStore";

import { useSortFilter } from "../hooks/useSortFilter";

import SortFilterBar from "../components/SortFilterBar";
import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const [sortOrder, setSortOrder] = useState("none");
  const [typeFilter, setTypeFilter] = useState("all");
  const [favPage, setFavPage] = useState(1);
  const PER_PAGE = 10;

  
  const displayedMovies = useSortFilter(favorites, sortOrder, typeFilter);
  
  const totalFavPages = Math.ceil(displayedMovies.length / PER_PAGE);
  const paginatedFavorites = displayedMovies.slice(
    (favPage - 1) * PER_PAGE,
    favPage * PER_PAGE
  );

  const typeLabels = { movie: "movies", series: "series", episode: "episodes" };

  useEffect(() => {
    setFavPage(1);
  }, [typeFilter,sortOrder]);

  return (
    <div className="page">
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
          {paginatedFavorites.map((m) => (
            <MovieCard key={m.imdbID} movie={m} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={favPage}
        totalPages={totalFavPages}
        onPageChange={(page) => setFavPage(page)}
      />
    </div>
  );
}
