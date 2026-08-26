import api from './api'

export const productService = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params })
    return response.data
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Get featured products
  getFeatured: async () => {
    const response = await api.get('/products/featured')
    return response.data
  },

  // Get products by category
  getByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  },

  // Search products
  search: async (query) => {
    const response = await api.get('/products/search', { params: { q: query } })
    return response.data
  },

  // Admin: Create product (if needed)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData)
    return response.data
  },

  // Admin: Update product
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  }
}