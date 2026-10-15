import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import ProductSort from '../components/product/ProductSort'
import ProductPagination from '../components/product/ProductPagination'
import ProductSkeleton from '../components/ui/ProductSkeleton'
import SEO from '../components/common/SEO'
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { 
  matchesCategory, 
  matchesPromotion, 
  matchesSearch, 
  matchesPrice, 
  matchesRating, 
  matchesDiscount,
  normalizeCategory,
  PROMOTIONS,
  PRICE_RANGES
} from '../utils/filterUtils'

const ProductsPage = () => {
  const { products, loading } = useProduct()
  const [searchParams, setSearchParams] = useSearchParams()

  // Read initial states from URL search params
  const paramSearch = searchParams.get('search') || searchParams.get('q') || ''
  const paramCategory = normalizeCategory(searchParams.get('category')) || 'All'
  const paramPromotion = searchParams.get('promotion') || (searchParams.get('deal') === 'true' ? 'summer-sale' : '')
  const paramPrice = searchParams.get('price') || ''
  const paramRating = Number(searchParams.get('rating')) || 0
  const paramDiscount = Number(searchParams.get('discount')) || 0
  const paramSort = searchParams.get('sort') || 'featured'

  const [searchTerm, setSearchTerm] = useState(paramSearch)
  const [filters, setFilters] = useState({
    category: paramCategory,
    promotion: paramPromotion,
    price: paramPrice,
    rating: paramRating,
    discount: paramDiscount
  })
  const [sort, setSort] = useState(paramSort)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const itemsPerPage = 8

  // Synchronize state when URL search params change (e.g., Navbar search, Home category click, Back/Forward)
  useEffect(() => {
    const newSearch = searchParams.get('search') || searchParams.get('q') || ''
    const newCategory = normalizeCategory(searchParams.get('category')) || 'All'
    const newPromotion = searchParams.get('promotion') || (searchParams.get('deal') === 'true' ? 'summer-sale' : '')
    const newPrice = searchParams.get('price') || ''
    const newRating = Number(searchParams.get('rating')) || 0
    const newDiscount = Number(searchParams.get('discount')) || 0
    const newSort = searchParams.get('sort') || 'featured'

    setSearchTerm(newSearch)
    setFilters({
      category: newCategory,
      promotion: newPromotion,
      price: newPrice,
      rating: newRating,
      discount: newDiscount
    })
    setSort(newSort)
  }, [searchParams])

  // Helper to push updated filters to URL
  const updateUrlParams = useCallback((newSearch, newFilters, newSort) => {
    const params = new URLSearchParams()
    if (newSearch && newSearch.trim()) params.set('search', newSearch.trim())
    if (newFilters.category && newFilters.category !== 'All') params.set('category', newFilters.category)
    if (newFilters.promotion) params.set('promotion', newFilters.promotion)
    if (newFilters.price) params.set('price', newFilters.price)
    if (newFilters.rating && newFilters.rating > 0) params.set('rating', String(newFilters.rating))
    if (newFilters.discount && newFilters.discount > 0) params.set('discount', String(newFilters.discount))
    if (newSort && newSort !== 'featured') params.set('sort', newSort)

    setSearchParams(params, { replace: true })
  }, [setSearchParams])

  // Combined filtering logic
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return []

    let result = products.filter(product => {
      // 1. Search filter
      if (!matchesSearch(product, searchTerm)) return false

      // 2. Promotion filter
      if (!matchesPromotion(product, filters.promotion)) return false

      // 3. Category filter
      if (!matchesCategory(product, filters.category)) return false

      // 4. Price filter
      if (!matchesPrice(product, filters.price)) return false

      // 5. Rating filter
      if (!matchesRating(product, filters.rating)) return false

      // 6. Discount filter
      if (!matchesDiscount(product, filters.discount)) return false

      return true
    })

    // Sorting
    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      default:
        // Featured first
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1))
        break
    }

    return result
  }, [products, searchTerm, filters, sort])

  // Reset page when any filter criteria changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filters, sort])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredProducts.slice(start, end)
  }, [filteredProducts, currentPage, itemsPerPage])

  // Handler for filter updates from sidebar
  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value }
    setFilters(updatedFilters)
    updateUrlParams(searchTerm, updatedFilters, sort)
  }

  // Handler for in-page search input
  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchTerm(val)
    updateUrlParams(val, filters, sort)
  }

  // Clear a single specific filter
  const clearSingleFilter = (key) => {
    if (key === 'search') {
      setSearchTerm('')
      updateUrlParams('', filters, sort)
    } else if (key === 'category') {
      handleFilterChange('category', 'All')
    } else if (key === 'promotion') {
      handleFilterChange('promotion', '')
    } else if (key === 'price') {
      handleFilterChange('price', '')
    } else if (key === 'rating') {
      handleFilterChange('rating', 0)
    } else if (key === 'discount') {
      handleFilterChange('discount', 0)
    }
  }

  // Clear all filters
  const clearFilters = () => {
    const reset = {
      category: 'All',
      promotion: '',
      price: '',
      rating: 0,
      discount: 0
    }
    setFilters(reset)
    setSearchTerm('')
    setSort('featured')
    setSearchParams({})
  }

  const handleSortChange = (newSort) => {
    setSort(newSort)
    updateUrlParams(searchTerm, filters, newSort)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Active filter checks
  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
    (filters.category && filters.category !== 'All') ||
    filters.promotion ||
    filters.price ||
    filters.rating > 0 ||
    filters.discount > 0
  )

  // Compute dynamic page title
  const getPageTitle = () => {
    if (filters.promotion) {
      return PROMOTIONS[filters.promotion]?.label || 'Promotional Offers'
    }
    if (filters.category && filters.category !== 'All') {
      return filters.category
    }
    if (searchTerm) {
      return `Results for "${searchTerm}"`
    }
    return 'All Products'
  }

  const getPriceLabel = (val) => {
    const found = PRICE_RANGES.find(p => p.value === val)
    return found ? found.label : `Price: ${val}`
  }

  return (
    <>
      <SEO
        title={`${getPageTitle()} – GroceryStore`}
        description="Browse fresh groceries, organic food, dairy, fruits, vegetables, and daily essentials with fast delivery."
        keywords="grocery products, fresh fruits, vegetables, dairy, organic food, online grocery shopping"
        url="/products"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors">
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400 mb-6">
            <ul className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link 
                  to="/products" 
                  onClick={clearFilters}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              {filters.category && filters.category !== 'All' && (
                <>
                  <li>/</li>
                  <li className="text-primary-600 dark:text-primary-400 font-medium">
                    {filters.category}
                  </li>
                </>
              )}
              {filters.promotion && (
                <>
                  <li>/</li>
                  <li className="text-orange-600 dark:text-orange-400 font-medium">
                    {PROMOTIONS[filters.promotion]?.label || 'Offer'}
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                {getPageTitle()}
                {filters.promotion && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 font-semibold uppercase tracking-wider">
                    Special Offer
                  </span>
                )}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* In-page quick search */}
              <div className="relative flex-1 sm:w-60">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Filter products..."
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchTerm && (
                  <button
                    onClick={() => clearSingleFilter('search')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden btn-primary flex items-center space-x-2 px-3.5 py-2 text-sm"
              >
                <FunnelIcon className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>

              {/* Grid / List View Toggle */}
              <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  aria-label="Grid view"
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  aria-label="List view"
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <ProductSort sort={sort} onSortChange={handleSortChange} />
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm animate-fade-in">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">
                Active Filters:
              </span>

              {searchTerm.trim() && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  Search: "{searchTerm}"
                  <button onClick={() => clearSingleFilter('search')} className="ml-1.5 hover:text-red-500">
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filters.promotion && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200">
                  Offer: {PROMOTIONS[filters.promotion]?.label || filters.promotion}
                  <button onClick={() => clearSingleFilter('promotion')} className="ml-1.5 hover:text-red-500">
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filters.category && filters.category !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200">
                  Category: {filters.category}
                  <button onClick={() => clearSingleFilter('category')} className="ml-1.5 hover:text-red-500">
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filters.price && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                  {getPriceLabel(filters.price)}
                  <button onClick={() => clearSingleFilter('price')} className="ml-1.5 hover:text-red-500">
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filters.rating > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                  Rating: {filters.rating}★ {filters.rating === 5 ? 'only' : '& up'}
                  <button onClick={() => clearSingleFilter('rating')} className="ml-1.5 hover:text-red-500">
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filters.discount > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                  Discount: {filters.discount}%+ off
                  <button onClick={() => clearSingleFilter('discount')} className="ml-1.5 hover:text-red-500">
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              <button
                onClick={clearFilters}
                className="text-xs text-red-600 dark:text-red-400 hover:underline font-semibold ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:w-72 flex-shrink-0">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Product Listing Area */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-12 text-center border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                    🔍
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    No products found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto text-sm">
                    {filters.promotion
                      ? `No products match the selected criteria under the ${PROMOTIONS[filters.promotion]?.label || 'promotional'} section.`
                      : filters.category !== 'All'
                      ? `No products found matching your selected criteria in "${filters.category}".`
                      : 'We could not find any products matching your selected search or filters.'}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button 
                      onClick={clearFilters} 
                      className="btn-primary px-6 py-2.5 text-sm"
                    >
                      Clear All Filters
                    </button>
                    <Link
                      to="/products"
                      onClick={clearFilters}
                      className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium transition-colors"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {paginatedProducts.map(product => (
                      <div key={product.id || product._id} className={viewMode === 'list' ? 'flex' : ''}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-10">
                      <ProductPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer Overlay */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in" 
            onClick={() => setIsFilterOpen(false)} 
          />
        )}
        <div className={`fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 overflow-y-auto h-full">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Filters</h3>
              <button 
                onClick={() => setIsFilterOpen(false)} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 transition-colors"
                aria-label="Close filters"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <ProductFilters
              filters={filters}
              onFilterChange={(key, val) => {
                handleFilterChange(key, val)
              }}
              onClearFilters={() => { 
                clearFilters()
                setIsFilterOpen(false) 
              }}
            />
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full btn-primary mt-6 py-2.5 text-sm"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage