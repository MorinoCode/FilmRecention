import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

//import pages
import Home from "./pages/home/Home.jsx";
import MovieDetails from "./pages/movieDetails/MovieDetails.jsx";
import CreateAccount from "./pages/createAccount/CreateAccount.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";

//import Dashboard page and subs routes
import DashboardPage from "./pages/dashboardPage/DashboardPage.jsx";
import NewMoviePage from "./pages/dashboardPage/newMoviePage/NewMoviePage.jsx";
import DeleteMoviePage from "./pages/dashboardPage/deleteMoviePage/DeleteMoviePage.jsx";
import EditMoviePage from "./pages/dashboardPage/editMoviePage/EditMoviePage.jsx";
import DeleteRecentionPage from "./pages/dashboardPage/deleteRecentionPage/DeleteRecentionPage.jsx";
import EditRecentionPage from "./pages/dashboardPage/EditRecentionPage/EditRecentionPage.jsx";
import DeleteUserPage from "./pages/dashboardPage/deleteUserPage/DeleteUserPage.jsx";
import MakeUserAdminPage from "./pages/dashboardPage/makeUserAdminPage/MakeUserAdminPage.jsx";

//import components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MoviesPage from "./pages/moviesPage/MoviesPage.jsx";

export const updateRate = async () => {
  fetch("http://localhost:8000/movies/rating");
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    updateRate();
  });

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetails updateRate={updateRate} />} />

        <Route path="/dashboard" element={<DashboardPage />}>

          <Route index element={<Navigate to="new-movie" replace />} />
          <Route path="new-movie" element={<NewMoviePage />} />
          <Route path="delete-movie" element={<DeleteMoviePage />} />
          <Route path="edit-movie" element={<EditMoviePage />} />
          <Route path="delete-recention" element={<DeleteRecentionPage />} />
          <Route path="edit-recention" element={<EditRecentionPage />} />
          <Route path="delete-user" element={<DeleteUserPage />} />
          <Route path="make-admin" element={<MakeUserAdminPage />} />
          
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
