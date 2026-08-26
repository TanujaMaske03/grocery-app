import { useState } from 'react'
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    rating: true,
    discount: true
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const categories = [
    'All',
    'Fruits',
    'Vegetables',
    'Dairy',
    'Bakery',
    'Pantry',
    'Beverages',
    'Snacks',
    'Breakfast',
    'Health'
  ]

  const priceRanges = [
    { label: 'Under ₹400', value: '0-400' },
    { label: '₹400 - ₹800', value: '400-800' },
    { label: '₹800 - ₹1600', value: '800-1600' },
    { label: 'Above ₹1600', value: '1600-100000' }
  ]

  const ratings = [5, 4, 3, 2, 1]

  const discountOptions = [
    { label: '10% and above', value: 10 },
    { label: '20% and above', value: 20 },
    { label: '30% and above', value: 30 },
    { label: '50% and above', value: 50 }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
        >
          <XMarkIcon className="w-4 h-4 mr-1" />
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700"
        >
          Category
          {openSections.category ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
        {openSections.category && (
          <div className="mt-3 space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={(e) => onFilterChange('category', cat)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700"
        >
          Price Range
          {openSections.price ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
        {openSections.price && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={filters.price === range.value}
                  onChange={(e) => onFilterChange('price', e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6 border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700"
        >
          Rating
          {openSections.rating ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
        {openSections.rating && (
          <div className="mt-3 space-y-2">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => onFilterChange('rating', Number(e.target.value))}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600 flex items-center">
                  {'★'.repeat(rating)}
                  <span className="text-gray-400 ml-1">& up</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discount Filter */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection('discount')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700"
        >
          Discount
          {openSections.discount ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
        {openSections.discount && (
          <div className="mt-3 space-y-2">
            {discountOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="discount"
                  value={option.value}
                  checked={filters.discount === option.value}
                  onChange={(e) => onFilterChange('discount', Number(e.target.value))}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductFilters