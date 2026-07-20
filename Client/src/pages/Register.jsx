import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      alert("Registration Successful.");

      navigate("/login");

    } catch (error) {
      alert(error.message || "Registration Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">

      <div className="card w-full max-w-xl bg-base-100 shadow-xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Register your GroceryMart account
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="input input-bordered w-full"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
            >
              Register
            </Button>

          </form>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-success font-bold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;