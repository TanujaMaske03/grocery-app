import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useWishlist } from '../../hooks/useWishlist'
import { useCart } from '../../hooks/useCart'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  // ✅ Extract product data with safe fallbacks
  const id = product._id || product.id || Date.now()
  const name = product.name || 'Product'
  const price = product.price || 0
  const originalPrice = product.originalPrice || null
  const category = product.category || 'General'
  const image = product.image || '/images/placeholder.jpg'
  const quantity = product.quantity ?? 0          // Backend uses "quantity"
  const stock = product.stock ?? quantity ?? 0   // Fallback to quantity if no stock
  const rating = product.rating ?? 4.0
  const isNew = product.isNew ?? false
  const description = product.description || 'High quality product from our trusted suppliers.'

  // Compute discount percentage
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const isWishlisted = isInWishlist(id)

  // Create a normalized product object for cart/wishlist operations
  const normalizedProduct = { ...product, id, name, price, image, stock }

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (stock === 0) {
      toast.error('Product is out of stock!')
      return
    }
    addToCart(normalizedProduct)
    toast.success(`${name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '12px',
        background: '#10b981',
        color: '#fff',
      },
    })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(normalizedProduct)
    toast.success(
      isWishlisted
        ? `${name} removed from wishlist`
        : `${name} added to wishlist`,
      {
        icon: isWishlisted ? '💔' : '❤️',
        style: {
          borderRadius: '12px',
          background: isWishlisted ? '#ef4444' : '#ec4899',
          color: '#fff',
        },
      }
    )
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    setIsQuickViewOpen(true)
  }

  return (
    <>
      <div
        className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-soft hover:shadow-hard transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <Link to={`/product/${id}`} className="block relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg'
            }}
          />

          {/* Badges */}
          {discountPercentage > 0 && (
            <span className="badge-discount">-{discountPercentage}%</span>
          )}
          {isNew && (
            <span className="badge-new">New</span>
          )}
          {stock > 0 && stock < 10 && (
            <span className="badge-stock">Only {stock} left</span>
          )}

          {/* Hover Actions */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleQuickView}
              className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleWishlist}
              className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              {isWishlisted ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{category}</p>

          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-gray-800 dark:text-white hover:text-primary-600 transition-colors line-clamp-2 mb-2">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-amber-400">
              {'★'.repeat(Math.floor(rating))}
              {rating % 1 !== 0 && '★'}
              {'☆'.repeat(5 - Math.ceil(rating))}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="product-price">₹{price.toFixed(2)}</span>
              {originalPrice && (
                <span className="product-original-price">₹{originalPrice.toFixed(2)}</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className="p-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h2>
                <button
                  onClick={() => setIsQuickViewOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400"
                >
                  ✕
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-xl object-cover"
                  onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                />
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
                  <div className="mb-4">
                    <span className="product-price">₹{price.toFixed(2)}</span>
                    {originalPrice && (
                      <span className="product-original-price">₹{originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={stock === 0}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleWishlist}
                      className={`px-4 rounded-full transition-colors ${
                        isWishlisted
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isWishlisted ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard