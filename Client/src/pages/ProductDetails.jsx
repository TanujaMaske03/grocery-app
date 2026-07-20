import { useContext, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { ProductContext } from "../context/ProductContext";

import Button from "../components/Button";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

import useCart from "../hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { products, loading } = useContext(ProductContext);

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => {
    return products.find((item) => item._id === id);
  }, [products, id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (item) =>
          item.category === product.category &&
          item._id !== product._id
      )
      .slice(0, 4);
  }, [products, product]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    alert("Product Added To Cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Product Not Found
        </h2>

        <p className="mt-3 text-gray-500">
          The product you are looking for does not exist.
        </p>

        <div className="mt-6">
          <Link to="/products">
            <Button>
              Back To Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">

      {/* Breadcrumb */}

      <div className="text-sm breadcrumbs mb-8">

        <ul>

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/products">
              Products
            </Link>
          </li>

          <li>{product.name}</li>

        </ul>

      </div>

      {/* Product */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg object-cover"
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-success text-lg mt-2">
            {product.category}
          </p>

          <div className="flex items-center gap-2 mt-4">

            <span className="text-yellow-500 text-xl">
              ⭐⭐⭐⭐⭐
            </span>

            <span className="text-gray-500">
              ({product.rating || 4.5} Rating)
            </span>

          </div>

          <h2 className="text-3xl font-bold text-success mt-6">
            ₹ {product.price}
          </h2>

          <p className="mt-4">
            <span
              className={`badge ${
                product.quantity > 0
                  ? "badge-success"
                  : "badge-error"
              }`}
            >
              {product.quantity > 0
                ? "In Stock"
                : "Out Of Stock"}
            </span>
          </p>

          <p className="mt-6 leading-8 text-gray-600">
            {product.description ||
              "Fresh grocery product with premium quality and affordable price."}
          </p>

          {/* Quantity */}

          <div className="flex items-center gap-4 mt-8">

            <button
              className="btn btn-outline"
              onClick={() =>
                setQuantity((prev) =>
                  prev > 1 ? prev - 1 : 1
                )
              }
            >
              -
            </button>

            <span className="text-xl font-bold">
              {quantity}
            </span>

            <button
              className="btn btn-outline"
              onClick={() =>
                setQuantity((prev) => prev + 1)
              }
            >
              +
            </button>

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-8">

            <Button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
            >
              Add To Cart
            </Button>

            <Button
              variant="success"
              onClick={handleBuyNow}
              disabled={product.quantity === 0}
            >
              Buy Now
            </Button>

          </div>

        </div>

      </div>

      {/* Related */}

      <section className="mt-20">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Related Products
          </h2>

          <Link to="/products">
            <Button>
              View All
            </Button>
          </Link>

        </div>

        {relatedProducts.length === 0 ? (

          <div className="text-center py-10">

            <p>No Related Products Found.</p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {relatedProducts.map((item) => (

              <ProductCard
                key={item._id}
                product={item}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
};

export default ProductDetails;