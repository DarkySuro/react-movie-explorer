/**
 * TODO:
 * 1. Sort be Year (latest to oldest) / rating
 * 2. Filter -> All/Movies/Series/Episodes
 *  
 */
import { useState } from "react";

export function useSortFilter(movies) {
  const [sortOrder, setSortOrder] = useState('none');
  const [typeFilter, setTypeFilter] = useState('all');

  function parseYear(yearString) {
    const match = yearString.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 0;
  }

  const displayedMovies = movies
    .filter((m) => typeFilter === 'all' || m.Type === typeFilter)
    .sort((a, b) => {
      if (sortOrder === 'newest') return parseYear(b.Year) - parseYear(a.Year);
      if (sortOrder === "oldest") return parseYear(a.Year) - parseYear(b.Year);
      return 0;
    });
  
  return {displayedMovies, sortOrder, setSortOrder, typeFilter, setTypeFilter };
}