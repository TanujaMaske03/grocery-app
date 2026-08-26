const ProductSort = ({ sort, onSortChange }) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ]

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductSort