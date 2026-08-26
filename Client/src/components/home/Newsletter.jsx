import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast.success('Subscribed successfully! 🎉')
      setEmail('')
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-700">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <EnvelopeIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-6">
            Get the latest updates on new products, exclusive offers, and delivery deals.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-xs text-white/70 mt-4">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter