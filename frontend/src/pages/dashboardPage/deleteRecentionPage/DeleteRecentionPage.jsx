import React, { useState, useEffect } from "react";
import './DeleteRecentionPage.css';

const DeleteRecensionPage = () => {
  const [recensions, setRecensions] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  // Fetch all recensions on component mount
  useEffect(() => {
    const fetchRecensions = async () => {
      setLoading(true);
      setError("");
      setMessage("");

      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:8000/recention', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recensions");
        }

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

  const handleDelete = async (recId) => {
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8000/recention/${recId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Recension deleted successfully!");
        // Remove deleted recension from state
        setRecensions(prev => prev.filter(rec => rec._id !== recId));
      } else {
        setError(data[0]?.message || "Failed to delete recension");
      }
    } catch (err) {
      setError("Error communicating with server");
    }
  };

  return (
    <div className="delete-recension-container">
      <h2>Delete Recensions</h2>

      {loading && <p>Loading recensions...</p>}
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {recensions.length === 0 && !loading && <p>No recensions found.</p>}

      <ul className="recension-list">
        {recensions.map((recension) => (
          <li key={recension._id} className="recension-item">
            <p> {recension.comment || "No content"}</p> 
            <button onClick={() => handleDelete(recension._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteRecensionPage;
