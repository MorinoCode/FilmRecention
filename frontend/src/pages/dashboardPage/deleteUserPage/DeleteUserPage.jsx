import React, { useEffect, useState } from "react";
import "./DeleteUserPage.css";

const DeleteUserPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        setError(data[0]?.message || "Failed to fetch users.");
      }
    } catch (err) {
      setError("Error communicating with the server.");
    }
  };

  const handleDelete = async (userId) => {
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/users/delete-user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User deleted successfully.");
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        setError(data[0]?.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Error communicating with the server.");
    }
  };

  console.log(users);
  return (
    <div className="delete-user-container">
      <h2>Delete Users</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="user-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="user-item">
              <div>
                <strong>{user.username}</strong> – {user.email}
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeleteUserPage;
