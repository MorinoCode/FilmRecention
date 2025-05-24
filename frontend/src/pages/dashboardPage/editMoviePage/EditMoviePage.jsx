import { useState } from "react";
import './EditMoviePage.css'

const EditMoviePage = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDirector, setSearchDirector] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    releaseYear: "",
    genre: "",
    IMDB_rating: "",
    image: ""
  });

  // Hämtar token från localStorage
  const getToken = () => localStorage.getItem('token');

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTitle) params.append("title", searchTitle);
      if (searchDirector) params.append("director", searchDirector);

      const token = getToken();
      if (!token) return alert("Du måste vara inloggad för att söka filmer");

      const response = await fetch(`http://localhost:8000/movies/search-movie?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Movie not found");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
      alert("No matching movie found");
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
      genre: movie.genre,
      IMDB_rating: movie.IMDB_rating,
      image: movie.image
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
  try {
    if (!selectedMovie) return alert("No movie selected");

    const token = getToken();
    if (!token) return alert("Du måste vara inloggad för att uppdatera filmer");

    // Gör om releaseYear till number
    const updatedFormData = {
      ...formData,
      releaseYear: Number(formData.releaseYear),
      IMDB_rating: Number(formData.IMDB_rating)  // Om även denna ska vara nummer
    };

    const response = await fetch(`http://localhost:8000/movies/${selectedMovie._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedFormData)
    });

    if (!response.ok) {
      const error = await response.json();
      return alert(error[0]?.message || "Update failed");
    }

    const updated = await response.json();
    alert("Movie updated successfully!");
    setSelectedMovie(updated);
  } catch (error) {
    console.error(error);
    alert("Error updating movie");
  }
};


  return (
    <div className="edit-movie-page">
      <h2>Edit Movie</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by director"
          value={searchDirector}
          onChange={(e) => setSearchDirector(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item" onClick={() => handleSelectMovie(movie)}>
            <p><strong>{movie.title}</strong> ({movie.releaseYear}) - {movie.director}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="edit-form">
          <h3>Editing: {selectedMovie.title}</h3>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <input name="director" value={formData.director} onChange={handleChange} placeholder="Director" />
          <input name="releaseYear" value={formData.releaseYear} onChange={handleChange} placeholder="Release Year" />
          <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
          <input name="IMDB_rating" value={formData.IMDB_rating} onChange={handleChange} placeholder="IMDB Rating" />
          <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
          <button onClick={handleUpdate}>Update Movie</button>
        </div>
      )}
    </div>
  );
};

export default EditMoviePage;
