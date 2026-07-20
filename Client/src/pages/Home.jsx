import { useContext } from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import Loader from "../components/Loader";

import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import categories from "../data/categories";

const Home = () => {

  const { products, loading } = useContext(ProductContext);

  const { addToCart } = useContext(CartContext);

  const { addToWishlist } = useContext(WishlistContext);

  const featuredProducts = products.slice(0, 8);

  return (

    <div className="space-y-16">

      {/* Hero Section */}

      <Hero />

      {/* Categories Section */}

      <section className="py-8">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">
            Shop By Category
          </h2>

          <Link to="/products">

            <Button>
              View All
            </Button>

          </Link>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">

          {categories.map((category) => (

            <CategoryCard
              key={category.id}
              title={category.name}
              image={category.image}
            />

          ))}

        </div>

      </section>

      {/* Featured Products */}

      <section className="py-8">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>

          <Link to="/products">

            <Button>
              Explore More
            </Button>

          </Link>

        </div>

        {loading ? (

          <Loader />

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {featuredProducts.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
              />

            ))}

          </div>

        )}

      </section>

      {/* Offer Banner */}

      <section className="hero bg-success text-success-content rounded-xl">

        <div className="hero-content text-center py-16">

          <div>

            <h2 className="text-4xl font-bold mb-4">
              Fresh Grocery Delivered To Your Doorstep
            </h2>

            <p className="max-w-2xl mx-auto mb-6">
              Get fresh vegetables, fruits, dairy products and daily
              essentials at the best price with fast delivery.
            </p>

            <Link to="/products">

              <Button>
                Shop Now
              </Button>

            </Link>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="py-8">

        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose GroceryMart?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body text-center">

              <div className="text-5xl mb-3">🥬</div>

              <h3 className="text-xl font-bold">
                Fresh Products
              </h3>

              <p>
                Farm fresh vegetables and fruits delivered every day.
              </p>

            </div>

          </div>

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body text-center">

              <div className="text-5xl mb-3">🚚</div>

              <h3 className="text-xl font-bold">
                Fast Delivery
              </h3>

              <p>
                Super fast delivery within your city.
              </p>

            </div>

          </div>

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body text-center">

              <div className="text-5xl mb-3">💳</div>

              <h3 className="text-xl font-bold">
                Secure Payment
              </h3>

              <p>
                Safe and secure payment with multiple options.
              </p>

            </div>

          </div>

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body text-center">

              <div className="text-5xl mb-3">⭐</div>

              <h3 className="text-xl font-bold">
                Quality Guaranteed
              </h3>

              <p>
                Best quality products with customer satisfaction.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Newsletter */}

      <section className="bg-base-200 rounded-xl p-10 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Subscribe To Our Newsletter
        </h2>

        <p className="mb-6">
          Get exclusive offers and latest grocery updates.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full md:w-96"
          />

          <Button>
            Subscribe
          </Button>

        </div>

      </section>

    </div>

  );

};

export default Home;