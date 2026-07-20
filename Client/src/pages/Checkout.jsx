import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import useCart from "../hooks/useCart";

const Checkout = () => {

  const { cart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  });

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 500 ? 0 : 50;

  const gst = Math.round(subtotal * 0.05);

  const total =
    subtotal + deliveryCharge + gst;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };
    const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order Placed Successfully!");
  };

  return (
    <div className="py-10">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Checkout
        </h1>

        <p className="text-gray-500 mt-2">
          Complete your shipping details to place your order.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Shipping Form */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 card bg-base-100 shadow-lg"
        >

          <div className="card-body">

            <h2 className="text-2xl font-bold mb-6">
              Shipping Address
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="input input-bordered"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                className="input input-bordered"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                className="input input-bordered"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                className="input input-bordered"
                value={formData.state}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="input input-bordered"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

            </div>

            <textarea
              name="address"
              placeholder="Complete Address"
              className="textarea textarea-bordered mt-4"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="mt-6">

              <h3 className="font-bold mb-3">
                Payment Method
              </h3>

              <select
                name="payment"
                className="select select-bordered w-full"
                value={formData.payment}
                onChange={handleChange}
              >

                <option value="COD">
                  Cash On Delivery
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="CARD">
                  Debit / Credit Card
                </option>

              </select>

            </div>
                      </div>
        </form>

        {/* Order Summary */}

        <div>

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3">

                {cart.map((item) => (

                  <div
                    key={item._id}
                    className="flex justify-between"
                  >

                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹ {item.price * item.quantity}
                    </span>

                  </div>

                ))}

                <div className="divider"></div>

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

                <div className="divider"></div>

                <div className="flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>₹ {total}</span>

                </div>

              </div>

              <button
                type="submit"
                form=""
                onClick={handleSubmit}
                className="btn btn-success w-full mt-8"
              >
                Place Order
              </button>

              <Link
                to="/cart"
                className="mt-4"
              >
                <Button>
                  Back To Cart
                </Button>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;