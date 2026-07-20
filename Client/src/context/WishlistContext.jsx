import { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);
    // Add Product
  const addToWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) return;

    setWishlist((prev) => [...prev, product]);
  };

  // Remove Product
  const removeFromWishlist = (id) => {

    setWishlist((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // Clear Wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };
    return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};