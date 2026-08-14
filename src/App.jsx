import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// Pages
import Home from './pages/Home';
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import FavoritesProvider from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

