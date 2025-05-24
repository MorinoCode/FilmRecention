import AdminNavbar from "../../components/adminNavbar/AdminNavbar.jsx";
import { Outlet } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>
      <AdminNavbar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
