import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Skeleton from '../components/ui/Skeleton'
import SEO from '../components/common/SEO'  // ✅ Import SEO
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

const CartPage = () => {
  const { cartItems, loading } = useCart()

  return (
    <>
      {/* ✅ SEO Tags */}
      <SEO
        title="Your Shopping Cart – GroceryStore"
        description="Review your grocery cart, update quantities, and proceed to checkout. Fresh groceries delivered to your doorstep."
        keywords="shopping cart, grocery cart, checkout, grocery delivery, online grocery"
        url="/cart"
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
              <li className="text-gray-700 dark:text-gray-300 font-medium">Cart</li>
            </ul>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="text-lg text-gray-500 dark:text-gray-400 font-normal ml-2">
                ({cartItems.length} items)
              </span>
            )}
          </h1>

          {loading ? (
            // Show skeleton loaders while loading
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-soft">
                  <Skeleton className="w-24 h-24 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="w-3/4 h-5" />
                    <Skeleton className="w-1/2 h-4 mt-2" />
                    <div className="flex items-center gap-4 mt-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-8 h-5" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="w-20 h-6" />
                </div>
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            // Empty state
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Your cart is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Looks like you haven't added any items yet.
              </p>
              <Link to="/products" className="btn-primary mt-6 inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            // Cart items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartPage