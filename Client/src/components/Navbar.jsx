import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiHeart,
  FiUser,
} from "react-icons/fi";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-6">

      {/* Logo */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">

          <button
            className="btn btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {menuOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

              <li>
                <NavLink to="/" onClick={closeMenu}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/products" onClick={closeMenu}>
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" onClick={closeMenu}>
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" onClick={closeMenu}>
                  Contact
                </NavLink>
              </li>

            </ul>
          )}

        </div>

        <Link
          to="/"
          className="text-2xl font-bold text-success"
        >
          GroceryMart
        </Link>

      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-success font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-success font-bold" : ""
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-success font-bold" : ""
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-success font-bold" : ""
              }
            >
              Contact
            </NavLink>
          </li>

        </ul>

      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3">

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="btn btn-ghost btn-circle"
        >
          <div className="indicator">

            <FiHeart size={22} />

            <span className="badge badge-error badge-sm indicator-item">
              {wishlist?.length || 0}
            </span>

          </div>

        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="btn btn-ghost btn-circle"
        >
          <div className="indicator">

            <FiShoppingCart size={22} />

            <span className="badge badge-success badge-sm indicator-item">
              {totalItems}
            </span>

          </div>

        </Link>

        {/* User */}
        {user ? (
          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <FiUser size={22} />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >

              <li>
                <Link to="/profile">
                  {user.name}
                </Link>
              </li>

              <li>
                <button onClick={logout}>
                  Logout
                </button>
              </li>

            </ul>

          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-success"
          >
            Login
          </Link>
        )}

      </div>

    </div>
  );
};

export default Navbar;