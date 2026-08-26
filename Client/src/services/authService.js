import api from './api'

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      return { user, token }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      throw error
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      return { user, token }
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message)
      throw error
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      console.error('Get current user error:', error.response?.data || error.message)
      throw error
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/update', userData)
      const { user } = response.data
      localStorage.setItem('user', JSON.stringify(user))
      return user
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error.message)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
} 