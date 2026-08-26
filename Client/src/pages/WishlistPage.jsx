import { Link } from 'react-router-dom'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../hooks/useCart'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/common/SEO'  // ✅ Import SEO
import toast from 'react-hot-toast'

const WishlistPage = () => {
  const { wishlistItems } = useWishlist()
  const { addToCart } = useCart()

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart(item, 1)
    })
    toast.success('All items added to cart! 🛒')
  }

  return (
    <>
      {/* ✅ SEO Tags */}
      <SEO
        title="My Wishlist – Save Your Favorite Groceries | GroceryStore"
        description="Save your favorite grocery products to your wishlist. Shop later or share with friends."
        keywords="wishlist, favorite products, save groceries, grocery list, online grocery shopping"
        url="/wishlist"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400 mb-6">
            <ul className="flex space-x-2">
              <li>
                <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">Wishlist</li>
            </ul>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              My Wishlist
              {wishlistItems.length > 0 && (
                <span className="text-lg text-gray-500 dark:text-gray-400 font-normal ml-2">
                  ({wishlistItems.length} items)
                </span>
              )}
            </h1>
            {wishlistItems.length > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="btn-primary px-6"
              >
                Add All to Cart
              </button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">❤️</div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Start adding your favorite products!
              </p>
              <Link to="/products" className="btn-primary mt-6 inline-block">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default WishlistPage