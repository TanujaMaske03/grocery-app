import { Link } from "react-router-dom";

import Button from "../components/Button";

const About = () => {
      return (

    <div className="py-10">

      {/* Heading */}

      <div className="text-center mb-12">

        <h1 className="text-5xl font-bold">

          About GroceryMart

        </h1>

        <p className="mt-5 max-w-3xl mx-auto text-gray-500">

          GroceryMart is a modern online grocery shopping platform
          designed to deliver fresh vegetables, fruits, dairy,
          beverages and daily essentials directly to your doorstep.

          We focus on quality products, affordable prices and
          lightning-fast delivery with an excellent customer experience.

        </p>

      </div>

      {/* Mission */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="card bg-base-100 shadow-lg">

          <div className="card-body">

            <h2 className="text-2xl font-bold">

              Our Mission

            </h2>

            <p className="mt-3">

              Our mission is to make grocery shopping simple,
              affordable and convenient for every family by
              providing fresh products with reliable delivery.

            </p>

          </div>

        </div>

        <div className="card bg-base-100 shadow-lg">

          <div className="card-body">

            <h2 className="text-2xl font-bold">

              Our Vision

            </h2>

            <p className="mt-3">

              We aim to become India's most trusted grocery
              delivery platform by offering quality products,
              excellent customer support and innovative technology.

            </p>

          </div>

        </div>

      </div>
            {/* Features */}

      <div className="grid md:grid-cols-3 gap-6 mt-12">

        <div className="card bg-success text-success-content shadow-lg">

          <div className="card-body text-center">

            <h3 className="text-2xl font-bold">

              100% Fresh

            </h3>

            <p>

              Fresh vegetables, fruits and dairy products every day.

            </p>

          </div>

        </div>

        <div className="card bg-primary text-primary-content shadow-lg">

          <div className="card-body text-center">

            <h3 className="text-2xl font-bold">

              Fast Delivery

            </h3>

            <p>

              Quick and reliable doorstep delivery service.

            </p>

          </div>

        </div>

        <div className="card bg-warning text-warning-content shadow-lg">

          <div className="card-body text-center">

            <h3 className="text-2xl font-bold">

              Secure Payments

            </h3>

            <p>

              Safe payment methods with complete security.

            </p>

          </div>

        </div>

      </div>

      {/* CTA */}

      <div className="text-center mt-14">

        <Link to="/products">

          <Button>

            Start Shopping

          </Button>

        </Link>

      </div>

    </div>

  );
};

export default About;