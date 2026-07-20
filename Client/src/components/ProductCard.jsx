import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const { addToWishlist } = useWishlist();

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 group">

      {/* Product Image */}
      <figure className="relative overflow-hidden h-60">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="badge badge-error absolute top-3 left-3">
            {product.discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => addToWishlist(product)}
          className="btn btn-circle btn-sm absolute top-3 right-3 bg-white text-red-500 hover:bg-red-500 hover:text-white"
        >
          <FaHeart />
        </button>

      </figure>

      {/* Card Body */}
      <div className="card-body">

        <h2 className="card-title">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">

          <FaStar className="text-yellow-400" />

          <span>
            {product.rating || "4.5"}
          </span>

        </div>

        {/* Price */}
        <div className="flex justify-between items-center mt-3">

          <span className="text-success text-xl font-bold">
            ₹ {product.price}
          </span>

          <span
            className={`badge ${
              product.quantity > 0
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {product.quantity > 0
              ? "In Stock"
              : "Out Of Stock"}
          </span>

        </div>

        {/* Buttons */}
        <div className="card-actions mt-5">

          <Link
            to={`/products/${product._id}`}
            className="btn btn-outline btn-success flex-1"
          >
            View
          </Link>

          <button
            onClick={() => addToCart(product)}
            className="btn btn-success flex-1"
            disabled={product.quantity === 0}
          >
            <FiShoppingCart />

            Add
          </button>

        </div>

      </div>

    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;