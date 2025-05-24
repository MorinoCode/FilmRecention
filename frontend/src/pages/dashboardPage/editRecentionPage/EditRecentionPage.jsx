import React, { useState, useEffect } from "react";
import './EditRecentionPage.css';

const EditRecensionPage = () => {
  const [recensions, setRecensions] = useState([]);
  const [selectedRecension, setSelectedRecension] = useState(null);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Hämta alla recensioner
  useEffect(() => {
    const fetchRecensions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/recention", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch recensions");
        const data = await response.json();
        setRecensions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecensions();
  }, []);

  // När admin klickar på Edit-knappen
  const handleEditClick = (recension) => {
    setSelectedRecension(recension);
    setFormData({
      comment: recension.comment || "",
      rating: recension.rating ?? 0,
    });
    setMessage("");
    setError("");
  };

  // Hantera ändring i formuläret
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value, 10) || 0 : value,
    }));
  };

  // Skicka ändringar till backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!selectedRecension) {
      setError("No recension selected for editing");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/recention/${selectedRecension._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Recension updated successfully!");
        setRecensions((prev) =>
          prev.map((r) =>
            r._id === selectedRecension._id ? data.updatedRecension : r
          )
        );
        setSelectedRecension(data.updatedRecension);
      } else {
        setError(data[0]?.message || "Update failed");
      }
    } catch (err) {
      setError("Error communicating with server");
    }
  };

  if (loading) return <p>Loading recensions...</p>;

  return (
    <div className="edit-recension-container">
      <h2>Edit Reviews</h2>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <div className="recension-list">
        {recensions.length === 0 && <p>No reviews found.</p>}
        {recensions.map((recension) => (
          <div key={recension._id} className="recension-item">
            <p>
              <strong>Comment:</strong> {recension.comment} <br />
              <strong>Rating:</strong> {recension.rating}
            </p>
            <button onClick={() => handleEditClick(recension)}>Edit</button>
          </div>
        ))}
      </div>

      {selectedRecension && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <h3>Editing Review</h3>

          <label>
            Comment:
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Rating:
            <input
              type="number"
              name="rating"
              min="0"
              max="10"
              step="1"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditRecensionPage;
