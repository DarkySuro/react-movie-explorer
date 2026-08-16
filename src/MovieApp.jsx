import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";

// Styles
import "./MovieApp.css";

export default function MovieApp() {
  return (
    <BrowserRouter>
      <nav className="app-nav">
        <span className="brand">🎬 Movie Finder</span>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
