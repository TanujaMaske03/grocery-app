import { useState } from "react";

import Button from "../components/Button";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Your message has been sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  };
    return (

    <div className="py-10">

      <div className="text-center mb-12">

        <h1 className="text-5xl font-bold">

          Contact Us

        </h1>

        <p className="mt-4 text-gray-500">

          We'd love to hear from you. Send us your queries or feedback.

        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Contact Form */}

        <div className="card bg-base-100 shadow-lg">

          <div className="card-body">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="input input-bordered w-full"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Button type="submit">

                Send Message

              </Button>

            </form>

          </div>

        </div>
                {/* Contact Information */}

        <div className="space-y-6">

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body">

              <h2 className="text-2xl font-bold">

                GroceryMart

              </h2>

              <p>

                📍 Ashta, Maharashtra, India

              </p>

              <p>

                📞 +91 9876543210

              </p>

              <p>

                📧 support@grocerymart.com

              </p>

              <p>

                🕒 Mon - Sun : 8:00 AM - 10:00 PM

              </p>

            </div>

          </div>

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body">

              <h2 className="text-2xl font-bold mb-3">

                Location

              </h2>

              <div className="bg-base-200 h-64 rounded-lg flex items-center justify-center">

                <span className="text-gray-500">

                  Google Map Placeholder

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Contact;