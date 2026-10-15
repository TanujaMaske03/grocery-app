import { useState } from 'react'
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  XMarkIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { 
  CATEGORIES, 
  PRICE_RANGES, 
  RATINGS, 
  DISCOUNT_OPTIONS, 
  PROMOTIONS, 
  normalizeCategory 
} from '../../utils/filterUtils'

const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [openSections, setOpenSections] = useState({
    promotion: true,
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

  const handleCategoryClick = (cat) => {
    if (normalizeCategory(filters.category) === normalizeCategory(cat)) {
      onFilterChange('category', 'All')
    } else {
      onFilterChange('category', cat)
    }
  }

  const handlePromotionClick = (promoId) => {
    if (filters.promotion === promoId) {
      onFilterChange('promotion', '')
    } else {
      onFilterChange('promotion', promoId)
    }
  }

  const handlePriceClick = (val) => {
    if (filters.price === val) {
      onFilterChange('price', '')
    } else {
      onFilterChange('price', val)
    }
  }

  const handleRatingClick = (val) => {
    if (Number(filters.rating) === val) {
      onFilterChange('rating', 0)
    } else {
      onFilterChange('rating', val)
    }
  }

  const handleDiscountClick = (val) => {
    if (Number(filters.discount) === val) {
      onFilterChange('discount', 0)
    } else {
      onFilterChange('discount', val)
    }
  }

  const isCategorySelected = (cat) => {
    return normalizeCategory(filters.category) === normalizeCategory(cat)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 sticky top-24 transition-colors">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center transition-colors"
        >
          <XMarkIcon className="w-4 h-4 mr-1" />
          Clear All
        </button>
      </div>

      {/* Promotions / Special Deals Section */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('promotion')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-gray-200"
        >
          <span className="flex items-center">
            <TagIcon className="w-4 h-4 mr-1.5 text-orange-500" />
            Special Offers
          </span>
          {openSections.promotion ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {openSections.promotion && (
          <div className="mt-3 space-y-2">
            <label className="flex items-center cursor-pointer select-none">
              <input
                type="radio"
                name="promotion"
                checked={!filters.promotion}
                onChange={() => onFilterChange('promotion', '')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2.5 text-sm text-gray-600 dark:text-gray-300">All Offers</span>
            </label>
            {Object.values(PROMOTIONS).map((promo) => (
              <label key={promo.id} className="flex items-center cursor-pointer select-none">
                <input
                  type="radio"
                  name="promotion"
                  value={promo.id}
                  checked={filters.promotion === promo.id}
                  onClick={() => handlePromotionClick(promo.id)}
                  onChange={() => {}}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center">
                  {promo.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-gray-200"
        >
          Category
          {openSections.category ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {openSections.category && (
          <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer select-none">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={isCategorySelected(cat)}
                  onClick={() => handleCategoryClick(cat)}
                  onChange={() => {}}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className={`ml-2.5 text-sm ${isCategorySelected(cat) ? 'font-semibold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-gray-200"
        >
          Price Range
          {openSections.price ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {openSections.price && (
          <div className="mt-3 space-y-2">
            {PRICE_RANGES.map((range) => (
              <label key={range.label} className="flex items-center cursor-pointer select-none">
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={filters.price === range.value}
                  onClick={() => handlePriceClick(range.value)}
                  onChange={() => {}}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className={`ml-2.5 text-sm ${filters.price === range.value ? 'font-semibold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-gray-200"
        >
          Rating
          {openSections.rating ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {openSections.rating && (
          <div className="mt-3 space-y-2">
            {RATINGS.map((rateOption) => (
              <label key={rateOption.label} className="flex items-center cursor-pointer select-none">
                <input
                  type="radio"
                  name="rating"
                  value={rateOption.value}
                  checked={Number(filters.rating) === rateOption.value}
                  onClick={() => handleRatingClick(rateOption.value)}
                  onChange={() => {}}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2.5 text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  {rateOption.value === 0 ? (
                    <span className={Number(filters.rating) === 0 ? 'font-semibold text-primary-600 dark:text-primary-400' : ''}>
                      All Ratings
                    </span>
                  ) : (
                    <>
                      <span className="text-amber-400 mr-1">{'★'.repeat(rateOption.value)}</span>
                      <span className={Number(filters.rating) === rateOption.value ? 'font-semibold text-primary-600 dark:text-primary-400' : ''}>
                        {rateOption.value === 5 ? 'only' : '& up'}
                      </span>
                    </>
                  )}
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
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-gray-200"
        >
          Discount
          {openSections.discount ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {openSections.discount && (
          <div className="mt-3 space-y-2">
            {DISCOUNT_OPTIONS.map((option) => (
              <label key={option.label} className="flex items-center cursor-pointer select-none">
                <input
                  type="radio"
                  name="discount"
                  value={option.value}
                  checked={Number(filters.discount) === option.value}
                  onClick={() => handleDiscountClick(option.value)}
                  onChange={() => {}}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className={`ml-2.5 text-sm ${Number(filters.discount) === option.value ? 'font-semibold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductFilters