import { Link } from "react-router-dom";
import { FiBell, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-6">

      {/* Left */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-success">
          Admin Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex-none gap-3">

        {/* Notification */}
        <button className="btn btn-ghost btn-circle">
          <FiBell size={20} />
        </button>

        {/* Settings */}
        <button className="btn btn-ghost btn-circle">
          <FiSettings size={20} />
        </button>

        {/* Profile */}
        <div className="dropdown dropdown-end">

          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <FiUser size={22} />
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <span className="font-semibold">
                {user?.name || "Admin"}
              </span>
            </li>

            <li>
              <Link to="/admin/profile">
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="text-error"
              >
                <FiLogOut />
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
};

export default AdminNavbar;