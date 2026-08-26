import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import SEO from '../components/common/SEO'  // ✅ Import SEO
import { 
  UserIcon, 
  EnvelopeIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 45.99,
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: 23.50,
      status: 'Processing',
      items: 2
    }
  ]

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email
      }
      
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      if (updateUser) {
        await updateUser(updatedUser)
      }
      
      toast.success('Profile updated successfully! 🎉')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <>
        <SEO
          title="Please Login – GroceryStore"
          description="You need to be logged in to view your profile. Login to your GroceryStore account."
          keywords="login, profile, grocery account"
          url="/profile"
        />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
          <div className="container-custom py-12 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Please Login</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">You need to be logged in to view your profile.</p>
            <Link to="/login" className="btn-primary mt-6 inline-block">
              Login
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* ✅ SEO Tags */}
      <SEO
        title="My Profile – GroceryStore"
        description="Manage your GroceryStore profile, view order history, and update account settings."
        keywords="profile, account, orders, grocery account, online grocery store"
        url="/profile"
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
              <li className="text-gray-700 dark:text-gray-300 font-medium">Profile</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mt-2">{user.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-xl transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-xl transition-colors ${
                      activeTab === 'orders'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                    <span>My Orders</span>
                  </button>
                  <Link
                    to="/wishlist"
                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                  >
                    <HeartIcon className="w-5 h-5" />
                    <span>Wishlist</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">My Profile</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleEditSubmit}
                          disabled={loading}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-70"
                        >
                          <CheckIcon className="w-4 h-4" />
                          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">Full Name</label>
                        <p className="text-gray-800 dark:text-white font-medium">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">Email Address</label>
                        <p className="text-gray-800 dark:text-white font-medium">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">Member Since</label>
                        <p className="text-gray-800 dark:text-white font-medium">January 2024</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">Total Orders</label>
                        <p className="text-gray-800 dark:text-white font-medium">{orders.length}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">My Orders</h3>

                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
                      <Link to="/products" className="btn-primary mt-4 inline-block">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-soft transition-shadow"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{order.id}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary-600 dark:text-primary-400">${order.total.toFixed(2)}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage