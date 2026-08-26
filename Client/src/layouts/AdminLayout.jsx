import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;