import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";
import { jwtDecode } from "jwt-decode";

const MovieDetails = ({ updateRate }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
    updateRate();
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${id}/recentions`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingComments(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !newRating) {
      setSubmitMessage("Both comment and rating are required.");
      return;
    }

    const url = editingId
  ? `http://localhost:8000/recention/${editingId}/edit-recention/${userId}`
  : `http://localhost:8000/recention/${id}/send-recention/${userId}`;


    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: newComment,
          rating: parseFloat(newRating),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data[0]?.message || "Something went wrong.");
      } else {
        setSubmitMessage(
          editingId ? "Review updated!" : "Review submitted!"
        );
        setEditingId(null);
        setNewComment("");
        setNewRating("");
        // Refresh comments
        const refreshed = await fetch(
          `http://localhost:8000/movies/${id}/recentions`
        ).then((res) => res.json());
        setComments(refreshed);
      }
    } catch (error) {
      setSubmitMessage("Server connection error.");
      console.error(error);
    }
  };

  const handleDelete = async (recId) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8000/recention/${recId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data[0]?.message || "Failed to delete.");
      } else {
        setComments((prev) => prev.filter((c) => c._id !== recId));
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (comment) => {
    setNewComment(comment.comment);
    setNewRating(comment.rating);
    setEditingId(comment._id);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div className="details-container">
      <div className="movie-info">
        <div className="details-text">
          <h1>{movie.title}</h1>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>IMDB:</strong> {movie.IMDB_rating}/10</p>
          <p><strong>User Rating:</strong> {movie.user_rating?.toFixed(1)}/10</p>
        </div>
        <img src={movie.image} alt={movie.title} className="details-image" />
      </div>

      <div className="recentions-section">
        <h2>User Reviews</h2>
        {loadingComments ? (
          <p>Loading reviews...</p>
        ) : comments?.length > 0 ? (
          <ul className="review-list">
            {comments.map((comment) => (
              <li key={comment._id} className="review-card">
                <p><strong>{comment.userId?.username}</strong></p>
                <p>{comment.comment}</p>
                <p className="rating">⭐ {comment.rating}/10</p>
                {comment.userId?._id === userId && (
                  <div className="review-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(comment)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(comment._id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to write one!</p>
        )}
      </div>

      {userId && (
        <div className="review-form">
          <h3>{editingId ? "Edit your Review" : "Write a Review"}</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              placeholder="Rating (0–10)"
              required
            />
            <button type="submit">{editingId ? "Update" : "Submit"}</button>
            {submitMessage && <p className="submit-message">{submitMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
