import { Link } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";

import Button from "../components/Button";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const {
    addToCart,
  } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product._id);
  };

  if (wishlist?.length === 0) {
    return (
      <div className="py-20 text-center">

        <FiHeart
          size={70}
          className="mx-auto text-gray-400 mb-6"
        />

        <h1 className="text-4xl font-bold">
          Your Wishlist Is Empty
        </h1>

        <p className="text-gray-500 mt-4 mb-8">
          Save your favourite grocery products here.
        </p>

        <Link to="/products">
          <Button>
            Browse Products
          </Button>
        </Link>

      </div>
    );
  }

  return (
    <div className="py-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          My Wishlist
        </h1>

        <Link to="/products">
          <Button>
            Continue Shopping
          </Button>
        </Link>

      </div>

      {/* Wishlist Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {wishlist.map((item) => (

          <div
            key={item._id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition"
          >

            <figure>

              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
              />

            </figure>

            <div className="card-body">

              <h2 className="card-title">
                {item.name}
              </h2>

              <p className="text-gray-500">
                {item.category}
              </p>

              <p className="text-success text-xl font-bold">
                ₹ {item.price}
              </p>

              <div className="card-actions mt-5">

                <button
                  className="btn btn-success flex-1"
                  onClick={() => handleAddToCart(item)}
                >
                  <FiShoppingCart />
                  Add To Cart
                </button>

                <button
                  className="btn btn-error btn-outline"
                  onClick={() =>
                    removeFromWishlist(item._id)
                  }
                >
                  <FiTrash2 />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Wishlist;