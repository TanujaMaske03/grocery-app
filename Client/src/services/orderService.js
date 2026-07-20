import api from "./api";

// ============================
// Create New Order
// ============================
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// ============================
// Get All Orders
// ============================
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// ============================
// Get Order By ID
// ============================
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// ============================
// Update Order Status
// ============================
export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}`, {
    status,
  });

  return response.data;
};

// ============================
// Cancel Order
// ============================
export const cancelOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};