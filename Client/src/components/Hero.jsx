import { Link } from "react-router-dom";
import heroImage from "../assets/banners/grocery-hero.png";

const Hero = () => {
  return (
    <section className="hero min-h-[85vh] bg-base-200">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse max-w-7xl gap-12">

        {/* Hero Image */}
        <img
          src={heroImage}
          alt="Fresh Groceries"
          className="w-full max-w-lg rounded-xl drop-shadow-2xl"
        />

        {/* Hero Content */}
        <div>

          <span className="badge badge-success badge-lg mb-4">
            Fresh & Healthy
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Fresh Groceries
            <br />
            Delivered To
            <span className="text-success"> Your Doorstep</span>
          </h1>

          <p className="py-6 text-lg text-gray-600">
            Shop fresh vegetables, fruits, dairy products,
            snacks and daily essentials with fast delivery,
            secure payment and best prices.
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/products"
              className="btn btn-success btn-lg"
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="btn btn-outline btn-success btn-lg"
            >
              Learn More
            </Link>

          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

            <div className="stat bg-base-100 rounded-lg shadow">

              <div className="stat-value text-success text-2xl">
                1000+
              </div>

              <div className="stat-title">
                Products
              </div>

            </div>

            <div className="stat bg-base-100 rounded-lg shadow">

              <div className="stat-value text-success text-2xl">
                500+
              </div>

              <div className="stat-title">
                Customers
              </div>

            </div>

            <div className="stat bg-base-100 rounded-lg shadow">

              <div className="stat-value text-success text-2xl">
                24/7
              </div>

              <div className="stat-title">
                Support
              </div>

            </div>

            <div className="stat bg-base-100 rounded-lg shadow">

              <div className="stat-value text-success text-2xl">
                Fast
              </div>

              <div className="stat-title">
                Delivery
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;