import React, { useState } from "react";
import "./NewMoviePage.css";

const NewMoviePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    releaseYear: "",
    genre: "",
    IMDB_rating: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "releaseYear" || name === "IMDB_rating") {
      setFormData({ ...formData, [name]: value === "" ? "" : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data[0]?.message || "Something went wrong");
        return;
      }

      setMessage("Movie has been registered!");
      setFormData({
        title: "",
        director: "",
        releaseYear: "",
        genre: "",
        IMDB_rating: "",
        image: "",
      });
    } catch (err) {
      setMessage("Failed to send data to the server.");
    }
  };

  return (
    <div className="new-movie-container">
      <h2>Register New Movie</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={formData.director}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="IMDB_rating"
          placeholder="IMDB Rating (e.g., 7.5)"
          step="0.1"
          value={formData.IMDB_rating}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Movie</button>
      </form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default NewMoviePage;
