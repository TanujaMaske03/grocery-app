import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import ProductImageGallery from '../components/product/ProductImageGallery'
import ProductQuantity from '../components/product/ProductQuantity'
import ProductReviews from '../components/product/ProductReviews'
import RelatedProducts from '../components/product/RelatedProducts'
import SEO from '../components/common/SEO'
import {
  HeartIcon,
  ShoppingCartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, products } = useProduct()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const foundProduct = await getProductById(id)
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id, getProductById])

  const relatedProducts = product
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : []

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast.success(`${product.name} added to cart! 🛒`, {
        style: { borderRadius: '12px', background: '#10b981', color: '#fff' }
      })
    }
  }

  const handleWishlist = () => {
    if (product) {
      toggleWishlist(product)
      toast.success(
        isInWishlist(product.id) 
          ? `${product.name} removed from wishlist` 
          : `${product.name} added to wishlist ❤️`,
        {
          style: { borderRadius: '12px', background: '#ec4899', color: '#fff' }
        }
      )
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-12">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex gap-3">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Product Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary mt-6 inline-block">Back to Products</Link>
        </div>
      </div>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const mockReviews = [
    { userName: 'Sarah Johnson', rating: 5, comment: 'Amazing product! Really high quality and fast delivery.', date: '2 days ago' },
    { userName: 'Michael Chen', rating: 4, comment: 'Good product, but shipping could be faster.', date: '1 week ago' },
    { userName: 'Emma Wilson', rating: 5, comment: 'Exceeded my expectations. Will definitely buy again!', date: '2 weeks ago' }
  ]

  return (
    <>
      <SEO
        title={`${product.name} – Fresh Quality Grocery | GroceryStore`}
        description={product.description || `Buy fresh ${product.name} online at best price. Quality grocery products delivered to your doorstep.`}
        keywords={`${product.name}, ${product.category}, fresh grocery, online grocery, ${product.category} products`}
        image={product.image || '/images/og-image.jpg'}
        url={`/product/${product.id}`}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400 mb-6">
            <ul className="flex space-x-2">
              <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link></li>
              <li>/</li>
              <li><Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400">Products</Link></li>
              <li>/</li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">{product.name}</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductImageGallery images={product.images || [product.image]} productName={product.name} />

            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">{product.category}</span>
                {product.isNew && <span className="badge-new relative top-0 left-0">New</span>}
                {discountPercentage > 0 && <span className="badge-discount relative top-0 right-0">-{discountPercentage}%</span>}
              </div>

              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h1>

              <div className="flex items-center space-x-3 mb-4">
                <div className="flex text-amber-400">
                  {'★'.repeat(Math.floor(product.rating || 4))}
                  {'☆'.repeat(5 - Math.floor(product.rating || 4))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">({product.rating || 4.5})</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">|</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">24 Reviews</span>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <span className="product-price text-3xl">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="product-original-price text-lg">₹{product.originalPrice.toFixed(2)}</span>
                    <span className="text-green-600 dark:text-green-400 text-sm font-semibold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      Save ₹{(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <div className="mb-4">
                {product.stock > 0 ? (
                  <p className="text-green-600 dark:text-green-400 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600 dark:text-red-400 flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    Out of Stock
                  </p>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {product.description || 'High quality product from our trusted suppliers. Fresh and carefully selected for you.'}
              </p>

              <div className="flex items-center space-x-6 mb-6">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Quantity</label>
                  <ProductQuantity quantity={quantity} onQuantityChange={setQuantity} maxStock={product.stock || 999} />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary px-8 py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Buy Now</span>
                </button>
                <button
                  onClick={handleWishlist}
                  className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:border-red-500 transition-all duration-300 hover:scale-110"
                >
                  {isInWishlist(product.id) ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-red-500" />
                  )}
                </button>
                <button className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:border-primary-500 transition-all duration-300 hover:scale-110">
                  <ShareIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <TruckIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Delivery</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Free above ₹4000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Time</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">30 min express</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Guarantee</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">100% Organic</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowPathIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Returns</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">7 days easy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 font-semibold transition-all duration-300 ${
                  activeTab === 'description'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 font-semibold transition-all duration-300 ${
                  activeTab === 'reviews'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Reviews ({mockReviews.length})
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'description' ? (
                <div className="prose max-w-none dark:prose-invert">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat.`}
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>✅ Premium quality product</li>
                    <li>✅ Fresh and organic</li>
                    <li>✅ Sourced from trusted suppliers</li>
                    <li>✅ Packaged with care</li>
                  </ul>
                </div>
              ) : (
                <ProductReviews reviews={mockReviews} />
              )}
            </div>
          </div>

          <RelatedProducts products={relatedProducts} category={product.category} />
        </div>
      </div>
    </>
  )
}

export default ProductDetailsPage