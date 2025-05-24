import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAccount.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
  setSuccessMessages ('');

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessages(data);
        setLoading(false);
        return;
      }
      
   setSuccessMessages('Account created successfully')


      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrorMessages([{ message: "Something went wrong. Please try again." }]);
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h1>Create Account</h1>

      <form className="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      {errorMessages.length > 0 && (
        <div className="error-box">
          {errorMessages.map((err, index) => (
            <p key={index}>{err.message}</p>
          ))}
        </div>
      )}
      {successMessages && (
        <div className="success-box">
            <p>{successMessages}</p>
        </div>
      )}

      <p className="login-link">
        Do you have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default CreateAccount;
