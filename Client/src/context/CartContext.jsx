import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");

    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  // Add Product
  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    saveCart(updatedCart);
  };

  // Remove Product
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    saveCart(updatedCart);
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCart(updatedCart);
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Total Items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};