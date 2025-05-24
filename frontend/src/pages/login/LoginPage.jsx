import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');
    setLoading(true);

    try {
      const body = {
        password: formData.password,
      };

      if (formData.identifier.includes("@")) {
        body.email = formData.identifier;
      } else {
        body.username = formData.identifier;
      }

      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      setSuccess(data.message);
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setErrors([{ message: "Something went wrong. Please try again." }]);
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h1>Log In</h1>

      <form className="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {errors.length > 0 && (
        <div className="error-box">
          {errors.map((err, index) => (
            <p key={index}>{err.message}</p>
          ))}
        </div>
      )}
      {success && (
        <div className="success-box">
          <p>{success}</p>
        </div>
      )}

      <p className="login-link">
        Don’t have an account? <Link to="/create-account">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
