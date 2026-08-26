import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  SunIcon,        // ✅ NEW - Import SunIcon
  MoonIcon        // ✅ NEW - Import MoonIcon
} from '@heroicons/react/24/outline'
import { ShoppingCartIcon as ShoppingCartSolid } from '@heroicons/react/24/solid'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import { useAuth } from '../../hooks/useAuth'
import SearchBar from './SearchBar'
import MobileMenu from './MobileMenu'
import { useContext } from 'react'              // ✅ NEW - Import useContext
import { ThemeContext } from '../../context/ThemeContext'  // ✅ NEW - Import ThemeContext

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate()
  
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { user, logout } = useAuth()

  // ✅ NEW - Get theme context
  const { theme, toggleTheme } = useContext(ThemeContext)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
  const wishlistCount = wishlistItems?.length || 0

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/')
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2 dark:bg-gray-900/95'  // ✅ UPDATED
            : 'bg-white shadow-sm py-4 dark:bg-gray-900'  // ✅ UPDATED
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110">
                <span className="text-white text-2xl font-bold">🛒</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">  {/* ✅ UPDATED */}
                  <span className="text-primary-600">Grocery</span>
                  <span className="text-gray-600 dark:text-gray-300">Store</span>  {/* ✅ UPDATED */}
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Fresh & Quality</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-6">
              <SearchBar />
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* ✅ NEW - Dark Mode Toggle Button - Place this here */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <MoonIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <SunIcon className="w-6 h-6 text-yellow-400" />
                )}
              </button>

              {/* Mobile Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"  // ✅ UPDATED
              >
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />  {/* ✅ UPDATED */}
              </button>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"  // ✅ UPDATED
              >
                <HeartIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors" />  {/* ✅ UPDATED */}
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"  // ✅ UPDATED
              >
                <ShoppingCartIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 transition-colors" />  {/* ✅ UPDATED */}
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-in">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Profile */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-600"  // ✅ UPDATED
                >
                  {user ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />  // ✅ UPDATED
                  )}
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-hard border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-down">  {/* ✅ UPDATED */}
                    {user ? (
                      <>
                        <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">  {/* ✅ UPDATED */}
                          <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>  {/* ✅ UPDATED */}
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>  {/* ✅ UPDATED */}
                        </div>
                        <div className="py-2">
                          <Link 
                            to="/profile" 
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"  // ✅ UPDATED
                          >
                            <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />  {/* ✅ UPDATED */}
                            <span className="dark:text-gray-300">My Profile</span>  {/* ✅ UPDATED */}
                          </Link>
                          <Link 
                            to="/orders" 
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"  // ✅ UPDATED
                          >
                            <ShoppingCartSolid className="w-5 h-5 text-gray-500 dark:text-gray-400" />  {/* ✅ UPDATED */}
                            <span className="dark:text-gray-300">My Orders</span>  {/* ✅ UPDATED */}
                          </Link>
                          <hr className="my-1 dark:border-gray-700" />  {/* ✅ UPDATED */}
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"  // ✅ UPDATED
                          >
                            <span>🚪</span>
                            <span>Logout</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-3">
                        <Link 
                          to="/login" 
                          onClick={() => setIsProfileOpen(false)}
                          className="block mx-3 mb-2 btn-primary text-center"
                        >
                          Login
                        </Link>
                        <Link 
                          to="/register" 
                          onClick={() => setIsProfileOpen(false)}
                          className="block mx-3 text-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"  // ✅ UPDATED
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"  // ✅ UPDATED
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />  // ✅ UPDATED
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />  // ✅ UPDATED
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm animate-fade-in md:hidden">
          <div className="bg-white dark:bg-gray-900 p-4 animate-slide-down">  {/* ✅ UPDATED */}
            <div className="flex items-center space-x-3">
              <SearchBar isMobile onClose={() => setIsSearchOpen(false)} />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"  // ✅ UPDATED
              >
                <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />  {/* ✅ UPDATED */}
              </button>
            </div>
          </div>
          <div className="p-4" onClick={() => setIsSearchOpen(false)}></div>
        </div>
      )}
    </>
  )
}

export default Navbar