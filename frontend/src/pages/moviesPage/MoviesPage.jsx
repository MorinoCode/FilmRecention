import { useEffect, useState } from "react";
import { SiImdb } from "react-icons/si";
import { FaUsersRectangle } from "react-icons/fa6";
import "./MoviesPage.css";
import { useNavigate } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:8000/movies");
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <div className="movies-slider">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card" 
          onClick={() => navigate(`/movie/${movie._id}`)}>
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <div className="rating">
              <p>
                <SiImdb color="yellow" /> IMDB : {movie.IMDB_rating}
              </p>
              <p>
                <FaUsersRectangle /> User's Rate {movie.user_rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
