import axios from 'axios'

// Get the API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

console.log('🌐 API_URL:', API_URL) // ✅ Debug log

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increased timeout
})

// Request interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('📤 Request:', config.method.toUpperCase(), config.url) // ✅ Debug log
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url) // ✅ Debug log
    return response
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data || error.message)
    
    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default api