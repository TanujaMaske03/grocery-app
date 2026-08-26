import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useProduct } from '../../hooks/useProduct'

const SearchBar = ({ isMobile = false, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const { searchProducts } = useProduct()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 1) {
        setIsLoading(true)
        try {
          const results = await searchProducts(searchTerm)
          setSuggestions(results?.slice(0, 5) || [])
          setShowSuggestions(true)
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm, searchProducts])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
      setShowSuggestions(false)
      if (isMobile && onClose) {
        onClose()
      }
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`)
    setShowSuggestions(false)
    setSearchTerm('')
    if (isMobile && onClose) {
      onClose()
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
          placeholder="Search for groceries..."
          className="w-full px-4 py-2.5 pl-11 pr-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
        />
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-200 rounded-full transition-colors"
          >
            <XMarkIcon className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-hard border border-gray-100 overflow-hidden animate-slide-down">
          <div className="py-2">
            {suggestions.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center space-x-3"
              >
                <img 
                  src={product.image || '/images/placeholder.jpg'} 
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">₹{product.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-hard border border-gray-100 p-4 animate-slide-down">
          <div className="flex items-center space-x-3">
            <div className="loading-skeleton w-10 h-10 rounded-lg"></div>
            <div className="flex-1">
              <div className="loading-skeleton h-4 w-32 mb-2"></div>
              <div className="loading-skeleton h-3 w-20"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar