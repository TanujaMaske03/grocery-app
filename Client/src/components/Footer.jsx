import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-success">
            GroceryMart
          </h2>

          <p className="mt-3 text-sm">
            Fresh groceries delivered to your doorstep.
            Fast, secure and affordable shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li>
              <Link to="/" className="hover:text-success">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-success">
                Products
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-success">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-success">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p>Email : support@grocerymart.com</p>

          <p>Phone : +91 9876543210</p>

          <p>India</p>

          <div className="flex gap-4 mt-5 text-2xl">

            <a href="#">
              <FaFacebook className="hover:text-blue-600" />
            </a>

            <a href="#">
              <FaInstagram className="hover:text-pink-500" />
            </a>

            <a href="#">
              <FaLinkedin className="hover:text-blue-500" />
            </a>

            <a href="#">
              <FaGithub className="hover:text-black" />
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-base-300 text-center py-4">

        <p>
          © {new Date().getFullYear()} GroceryMart. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;