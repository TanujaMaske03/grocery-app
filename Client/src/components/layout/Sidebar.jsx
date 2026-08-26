import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <FiShoppingBag />,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <FiHeart />,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <FiShoppingCart />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FiUser />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-base-200 shadow-lg p-5">

      <h2 className="text-2xl font-bold text-success mb-8">
        GroceryMart
      </h2>

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

export default Sidebar;