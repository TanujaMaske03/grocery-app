import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <AdminNavbar />

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;