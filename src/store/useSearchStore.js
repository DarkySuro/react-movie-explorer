import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchTerm: "",
  movies: [],
  currentPage: 1,
  totalResults: 0,
  sortOrder: "none",
  typeFilter: "all",

  setSearchTerm: (term) => set({ searchTerm: term }),
  setMovies: (movies) => set({ movies }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalResults: (total) => set({ totalResults: total }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setTypeFilter: (filter) => set({typeFilter: filter})
}));