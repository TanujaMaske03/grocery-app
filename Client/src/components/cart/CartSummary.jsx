import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import toast from 'react-hot-toast'

const CartSummary = () => {
  const navigate = useNavigate()
  const { getTotalItems, getTotalPrice, cartItems } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax - discount

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.10)
      toast.success('Coupon applied! 10% off')
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      setShipping(0)
      toast.success('Free shipping applied!')
    } else {
      toast.error('Invalid coupon code')
    }
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
        <p className="text-gray-500">Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          className="btn-primary mt-4"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary-600">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Coupon */}
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleApplyCoupon}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          Apply
        </button>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full btn-primary mt-4 py-3 text-lg"
      >
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartSummary