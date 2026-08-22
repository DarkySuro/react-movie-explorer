export default function SortFilterBar({ typeFilter, setTypeFilter, sortOrder, setSortOrder}) {
  return (
    <div className="sort-filter-bar">
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

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="none">Sort by</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}