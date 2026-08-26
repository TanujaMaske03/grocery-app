import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { contactService } from '../services/contactService'
import SEO from '../components/common/SEO'  // ✅ Import SEO

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await contactService.sendMessage(formData)
      toast.success('Message sent successfully! 📧')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ✅ SEO Tags */}
      <SEO
        title="Contact GroceryStore – Get in Touch | Customer Support"
        description="Have questions or feedback? Contact GroceryStore customer support. We're here to help with your grocery orders, delivery, and more."
        keywords="contact grocery store, customer support, grocery delivery help, feedback, grocery store India"
        url="/contact"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400 mb-6">
            <ul className="flex space-x-2">
              <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link></li>
              <li>/</li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">Contact</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Get in Touch</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Have questions, feedback, or need help? We'd love to hear from you!
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-soft">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
                    <EnvelopeIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-800 dark:text-white">support@grocerystore.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-soft">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
                    <PhoneIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-800 dark:text-white">+1 234 567 890</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-soft">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <MapPinIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                    <p className="font-medium text-gray-800 dark:text-white">123 Grocery Lane, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage