import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiClipboard,
  FiSettings,
} from "react-icons/fi";

const AdminSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FiHome />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FiGrid />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FiShoppingBag />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiClipboard />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-base-200 shadow-lg p-5">

      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-success">
          GroceryMart
        </h2>

        <p className="text-sm text-gray-500">
          Admin Panel
        </p>
      </div>

      {/* Menu */}
      <ul className="menu">

        {menuItems.map((item) => (
          <li key={item.name}>

            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-success"
                  : ""
              }
            >
              <span className="text-xl">
                {item.icon}
              </span>

              {item.name}

            </NavLink>

          </li>
        ))}

      </ul>

    </aside>
  );
};

export default AdminSidebar;