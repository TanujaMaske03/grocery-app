import { Link } from 'react-router-dom'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  HeartIcon,
  UserIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'

const MobileMenu = ({ isOpen, onClose }) => {
  const { user } = useAuth()

  if (!isOpen) return null

  const menuItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: ShoppingBagIcon, label: 'Products', path: '/products' },
    { icon: HeartIcon, label: 'Wishlist', path: '/wishlist' },
    { icon: UserIcon, label: 'Profile', path: '/profile' },
    { icon: InformationCircleIcon, label: 'About', path: '/about' },
    { icon: EnvelopeIcon, label: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-hard animate-slide-right md:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">🛒</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">GroceryStore</h2>
                {user && (
                  <p className="text-xs text-gray-500">Welcome, {user.name}</p>
                )}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          {!user && (
            <div className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 mx-4 my-4 rounded-xl">
              <p className="text-sm text-gray-600">Welcome to GroceryStore!</p>
              <div className="flex space-x-3 mt-3">
                <Link 
                  to="/login" 
                  onClick={onClose}
                  className="flex-1 btn-primary text-center text-sm"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={onClose}
                  className="flex-1 bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 text-center text-sm font-semibold py-2 px-4 rounded-full transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors mx-2 rounded-xl"
              >
                <item.icon className="w-6 h-6 text-gray-500" />
                <span className="text-gray-700 font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              © 2024 GroceryStore. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-right {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-right {
          animation: slide-right 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

export default MobileMenu