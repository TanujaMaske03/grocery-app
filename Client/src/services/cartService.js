import api from './api'

export const cartService = {
  // Get User Cart
  getCart: async () => {
    const response = await api.get('/cart')
    return response.data
  },

  // Add Product To Cart
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart', {
      productId,
      quantity,
    })
    return response.data
  },

  // ✅ Update Quantity
  updateQuantity: async (cartItemId, quantity) => {
    const response = await api.put(`/cart/${cartItemId}`, {
      quantity,
    })
    return response.data
  },

  // Remove Product From Cart
  removeFromCart: async (cartItemId) => {
    const response = await api.delete(`/cart/${cartItemId}`)
    return response.data
  },

  // Clear Cart
  clearCart: async () => {
    const response = await api.delete('/cart')
    return response.data
  },
}