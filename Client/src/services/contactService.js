import api from './api'

export const contactService = {
  // Send contact message
  sendMessage: async (data) => {
    const response = await api.post('/contact', data)
    return response.data
  },

  // Get all messages (admin only)
  getMessages: async () => {
    const response = await api.get('/contact')
    return response.data
  }
}