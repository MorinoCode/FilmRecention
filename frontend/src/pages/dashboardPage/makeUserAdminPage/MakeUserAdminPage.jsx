import React, { useState } from "react";
import "./MakeUserAdminPage.css";

const MakeUserAdminPage = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!userId.trim()) {
      setError("Please enter a valid user ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/users/make-admin/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage("The user has been promoted to admin.");
        setUserId("");
      } else {
        setError(data[0]?.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Error communicating with the server.");
    }
  };

  return (
    <div className="make-admin-container">
      <h2>Promote User to Admin</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleMakeAdmin}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleInputChange}
          placeholder="Enter user ID"
          required
        />
        <button type="submit" className="make-admin-button">
          Promote to Admin
        </button>
      </form>
    </div>
  );
};

export default MakeUserAdminPage;
