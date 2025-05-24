import { useEffect, useState } from "react";
import MovieSlider from "../../components/movieSlider/movieSlider";
import "./Home.css";
import pic1 from "../../assets/pics/movie.png";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies", err));
  }, []);

  // Sorteringslogik
  const newMovies = [...movies]
    .sort((a, b) => new Date(b.releaseYear) - new Date(a.releaseYear))
    .slice(0, 10);

  const highRatedMovies = [...movies]
    .sort((a, b) => b.IMDB_rating - a.IMDB_rating)
    .slice(0, 10);

  const oldMovies = [...movies]
    .sort((a, b) => new Date(a.releaseYear) - new Date(b.releaseYear))
    .slice(0, 10);

  return (
    <div className="home">
      <h1>Welcome to MovieWorld</h1>

      <h2>New Movies</h2>
      <MovieSlider movies={newMovies} />

      <h2>Top Rated Movies</h2>
      <MovieSlider movies={highRatedMovies} />

      <h2>Old Classics</h2>
      <MovieSlider movies={oldMovies} />

      <section className="about-section">
        <img src={pic1} alt="About us" />
        <div>
          <h2>Discover Movies</h2>
          <p>
            Find new movies, write reviews, and see what others think!
            Log in and start your movie journey today.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
