import api from "./api";

// ============================
// Get User Cart
// ============================
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// ============================
// Add Item To Cart
// ============================
export const addToCart = async (productData) => {
  const response = await api.post("/cart", productData);
  return response.data;
};

// ============================
// Update Cart Item Quantity
// ============================
export const updateCartItem = async (id, quantity) => {
  const response = await api.put(`/cart/${id}`, {
    quantity,
  });

  return response.data;
};

// ============================
// Remove Item From Cart
// ============================
export const removeFromCart = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

// ============================
// Clear Cart
// ============================
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};