import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { orderService } from '../services/orderService'  // ✅ Import orderService
import toast from 'react-hot-toast'

// Validation schema (keep as is)
const checkoutSchema = yup.object({
  fullName: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  address: yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('ZIP code is required').matches(/^[0-9]{5}$/, 'ZIP must be 5 digits'),
  cardNumber: yup.string().required('Card number is required').matches(/^[0-9]{16}$/, 'Card must be 16 digits'),
  expiry: yup.string().required('Expiry date is required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format MM/YY'),
  cvv: yup.string().required('CVV is required').matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
  saveInfo: yup.boolean()
})

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getTotalPrice, cartItems, clearCart } = useCart()  // ✅ clearCart used
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      address: '',
      city: '',
      state: '',
      zip: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      saveInfo: false
    }
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // ✅ REPLACE YOUR OLD onSubmit WITH THIS
  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setLoading(true)

    try {
      const orderData = {
  products: cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  })),

  totalAmount: total,

  address: `${data.address}, ${data.city}, ${data.state}, ${data.zip}`,

  paymentMethod: "COD",
}

console.log("📦 Final Order Data:", orderData)
      
      await orderService.createOrder(orderData)
      await clearCart() // clear cart on successful order
      toast.success('🎉 Order placed successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">Add items before checking out.</p>
          <Link to="/products" className="btn-primary mt-6 inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs text-gray-500 mb-6">
          <ul className="flex space-x-2">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li><Link to="/cart" className="hover:text-primary-600">Cart</Link></li>
            <li className="text-gray-700 font-medium">Checkout</li>
          </ul>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-soft p-6 space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Shipping Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    {...register('city')}
                    className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    {...register('state')}
                    className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP *</label>
                  <input
                    type="text"
                    {...register('zip')}
                    className={`w-full px-4 py-2 border ${errors.zip ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    placeholder="12345"
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 pt-4">Payment Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  {...register('cardNumber')}
                  className={`w-full px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    {...register('expiry')}
                    className={`w-full px-4 py-2 border ${errors.expiry ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiry.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                  <input
                    type="text"
                    {...register('cvv')}
                    className={`w-full px-4 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('saveInfo')}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Save this information for next time
                </label>
              </div>

              <button
                type="submit"
                disabled={!isValid || loading}
                className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Place Order • ₹${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

              <div className="space-y-2 text-sm mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">{item.product?.name} × {item.quantity}</span> 
                    <span className="font-medium">₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage