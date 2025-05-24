import { useNavigate } from "react-router-dom";
import { SiImdb } from "react-icons/si";
import { FaUsersRectangle } from "react-icons/fa6";


import "./MovieSlider.css";

const MovieSlider = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <div className="slider-container">
      {movies.map((movie) => (
        <div
          className="movie-card"
          key={movie._id}
          onClick={() => navigate(`/movie/${movie._id}`)}
        >
          <img src={movie.image} alt={movie.title} />
          <p>{movie.title}</p>
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
  );
};

export default MovieSlider;
