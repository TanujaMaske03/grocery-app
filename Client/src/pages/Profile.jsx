import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

const Profile = () => {

  const { user, logout } = useAuth();

  const [formData, setFormData] = useState({

    name: user?.name || "",

    email: user?.email || "",

    mobile: user?.mobile || "",

    address: user?.address || "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };
    const handleSubmit = (e) => {

    e.preventDefault();

    alert("Profile Updated Successfully!");

  };

  return (

    <div className="min-h-[80vh] flex items-center justify-center py-10">

      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center mb-6">

            My Profile

          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="input input-bordered w-full"
              value={formData.mobile}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              className="textarea textarea-bordered w-full"
              rows="4"
              value={formData.address}
              onChange={handleChange}
            />
                        <Button type="submit">

              Update Profile

            </Button>

          </form>

          <div className="divider"></div>

          <div className="flex flex-col md:flex-row gap-4 justify-between">

            <Link to="/orders">

              <Button>

                My Orders

              </Button>

            </Link>

            <button
              onClick={logout}
              className="btn btn-error"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Profile;