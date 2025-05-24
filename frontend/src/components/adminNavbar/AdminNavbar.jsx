import { NavLink, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const location = useLocation();

  // Markera "New Movie" som aktiv även när path är "/dashboard"
  const isNewMovieActive = location.pathname === "/dashboard" || location.pathname === "/dashboard/new-movie";

  return (
    <nav className="admin-navbar">
      <ul className="admin-navbar-links">
        <li className="dropdown">
          <span>Movies ▾</span>
          <ul className="dropdown-menu">
            <li>
              <NavLink
                to="/dashboard/new-movie"
                className={() => (isNewMovieActive ? "active-link" : "")}
              >
                New Movie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/delete-movie"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Delete a Movie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/edit-movie"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Edit a Movie
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="dropdown">
          <span>Recension ▾</span>
          <ul className="dropdown-menu">
            <li>
              <NavLink
                to="/dashboard/delete-recention"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Delete a Recension
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/edit-recention"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Edit a Recension
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="dropdown">
          <span>Users ▾</span>
          <ul className="dropdown-menu">
            <li>
              <NavLink
                to="/dashboard/delete-user"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Delete a User
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/make-admin"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Make a User Admin
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
