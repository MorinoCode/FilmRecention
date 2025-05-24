import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // korrekt import
import "./Navbar.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // dekoda token
      userRole = decodedToken.userRole;      // läs ut rollen
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  console.log(userRole);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        🎬 MovieReviews
      </div>

      <ul className="navbar-links">
        <li><Link to="/movies">Movies</Link></li>

        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </>
        ) : (
          <>
            {userRole === "admin" && <li><Link to="/dashboard">Dashboard</Link></li>}
            <li><button onClick={handleLogout} className="logout-btn">Log Out</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
