import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

import Button from "../components/Button";
import useCart from "../hooks/useCart";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const subtotal = totalPrice;

  const deliveryCharge = subtotal > 500 ? 0 : 50;

  const discount = subtotal > 2000 ? 200 : 0;

  const gst = Math.round(subtotal * 0.05);

  const total =
    subtotal + deliveryCharge + gst - discount;

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center">

        <h1 className="text-4xl font-bold mb-4">
          Your Cart Is Empty
        </h1>

        <p className="text-gray-500 mb-8">
          Looks like you haven't added any products yet.
        </p>

        <Link to="/products">
          <Button>
            Continue Shopping
          </Button>
        </Link>

      </div>
    );
  }

  return (
    <div className="py-10">

      {/* Page Header */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Shopping Cart
        </h1>

        <Link to="/products">
          <Button>
            Continue Shopping
          </Button>
        </Link>

      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Cart Items */}

        <div className="lg:col-span-2 space-y-6">

          {cartItems.map((item) => (

            <div
              key={item._id}
              className="card bg-base-100 shadow-md"
            >

              <div className="card-body md:flex-row items-center gap-6">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-success mt-2">
                    ₹ {item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-5">

                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  className="btn btn-error btn-outline"
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                >
                  <FiTrash2 size={20} />
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Order Summary */}

        <div>

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body">

              <h2 className="text-2xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharge === 0
                      ? "Free"
                      : `₹ ${deliveryCharge}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹ {gst}</span>
                </div>

                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>- ₹ {discount}</span>
                </div>

                <div className="divider"></div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹ {total}</span>
                </div>

              </div>

              <Link
                to="/checkout"
                className="mt-6"
              >
                <Button fullWidth>
                  Proceed To Checkout
                </Button>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;