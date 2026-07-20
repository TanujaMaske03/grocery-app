import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // Login
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      login(res.data.user, res.data.token);

      alert("Login Successful");

      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">

      <div className="card bg-base-100 shadow-xl w-full max-w-md">

        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Welcome Back 🛒
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Login to your Grocery Account
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >

            {/* Email */}

            <div className="form-control mb-4">

              <label className="label">

                <span className="label-text font-semibold">
                  Email Address
                </span>

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* Password */}

            <div className="form-control mb-4">

              <label className="label">

                <span className="label-text font-semibold">
                  Password
                </span>

              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3 text-success"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  className="checkbox checkbox-success checkbox-sm"
                />

                <span className="text-sm">
                  Remember Me
                </span>

              </label>

              <span className="text-success text-sm cursor-pointer">
                Forgot Password?
              </span>

            </div>

            <div className="divider">OR</div>

            {/* Demo */}

            <div className="text-center mb-4">

              <button
                type="button"
                className="btn btn-outline btn-success btn-sm"
                onClick={() =>
                  setFormData({
                    email: "demo@gmail.com",
                    password: "123456",
                  })
                }
              >
                Use Demo Account
              </button>

            </div>

            {/* Login */}

            <button
              type="submit"
              className="btn btn-success w-full"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-success font-bold ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;