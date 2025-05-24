import React, { useState } from "react";
import "./DeleteMoviePage.css";

const DeleteMoviePage = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`http://localhost:8000/movies`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: movieTitle }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data[0]?.message || "Something went wrong");
        return;
      }

      setMessage(`Movie titled "${movieTitle}" has been deleted.`);
      setMovieTitle("");
    } catch (err) {
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="delete-movie-container">
      <h2>Delete a Movie</h2>
      <form onSubmit={handleDelete} className="delete-form">
        <input
          type="text"
          placeholder="Enter movie title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          required
        />
        <button type="submit">Delete Movie</button>
      </form>
      {message && <p className="delete-message">{message}</p>}
    </div>
  );
};

export default DeleteMoviePage;
