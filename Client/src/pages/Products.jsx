import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Button from "../components/Button";

import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Products = () => {
  const { products, loading } = useContext(ProductContext);

  const { addToCart } = useContext(CartContext);

  const { addToWishlist } = useContext(WishlistContext);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const categories = useMemo(() => {
    const list = products.map((product) => product.category);
    return ["All", ...new Set(list)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    // Search Filter
    if (search.trim() !== "") {
      data = data.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (category !== "All") {
      data = data.filter(
        (product) => product.category === category
      );
    }

    // Sorting
    switch (sort) {
      case "priceLow":
        data.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        data.sort((a, b) => b.price - a.price);
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return data;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="py-10">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            All Products
          </h1>

          <p className="text-gray-500 mt-2">
            Browse fresh grocery products at the best prices.
          </p>
        </div>

        <Link to="/">
          <Button>
            Back To Home
          </Button>
        </Link>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Product..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">
            Default
          </option>

          <option value="priceLow">
            Price : Low to High
          </option>

          <option value="priceHigh">
            Price : High To Low
          </option>

          <option value="name">
            Name : A - Z
          </option>

        </select>

      </div>

      {/* Product Grid */}

      {loading ? (

        <Loader />

      ) : currentProducts.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing search or category.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {currentProducts.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />

          ))}

        </div>

      )}

      {/* Pagination */}

      {totalPages > 1 && (

        <div className="flex justify-center mt-10 gap-2">

          {Array.from({ length: totalPages }).map((_, index) => (

            <button
              key={index}
              className={`btn ${
                currentPage === index + 1
                  ? "btn-success"
                  : "btn-outline"
              }`}
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>

          ))}

        </div>

      )}

    </div>
  );
};

export default Products;