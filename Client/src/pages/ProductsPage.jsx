import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import ProductSort from '../components/product/ProductSort'
import ProductPagination from '../components/product/ProductPagination'
import ProductSkeleton from '../components/ui/ProductSkeleton'
import SEO from '../components/common/SEO'
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline'

const ProductsPage = () => {
  const { products, loading } = useProduct()
    console.log('ProductsPage received products:', products)  // ✅ ADD THIS LINE

  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [filters, setFilters] = useState({
    category: 'All',
    price: '',
    rating: 0,
    discount: 0
  })
  const [sort, setSort] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const itemsPerPage = 8

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category)
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number)
      result = result.filter(p => p.price >= min && p.price <= max)
    }
    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating)
    }
    if (filters.discount > 0) {
      result = result.filter(p => {
        if (!p.originalPrice) return false
        const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
        return discount >= filters.discount
      })
    }
    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'newest': result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1)); break
      default: break
    }
    return result
  }, [products, searchTerm, filters, sort])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredProducts.slice(start, end)
  }, [filteredProducts, currentPage, itemsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filters, sort])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ category: 'All', price: '', rating: 0, discount: 0 })
    setSearchTerm('')
    setSort('featured')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <SEO
        title="All Products – Shop Fresh Groceries Online | GroceryStore"
        description="Browse our wide selection of fresh fruits, vegetables, dairy, organic food, and more. Shop quality groceries at best prices with fast delivery."
        keywords="grocery products, fresh fruits, vegetables, dairy, organic food, online grocery shopping"
        url="/products"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400 mb-6">
            <ul className="flex space-x-2">
              <li><a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</a></li>
              <li>/</li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">Products</li>
            </ul>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">All Products</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {filteredProducts.length} products found
              </p>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden btn-primary flex items-center space-x-2 px-4 py-2"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Filters</span>
              </button>

              <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>

              <ProductSort sort={sort} onSortChange={setSort} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} lg:w-72 flex-shrink-0`}>
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No products found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search terms</p>
                  <button onClick={clearFilters} className="btn-primary mt-4">Clear All Filters</button>
                </div>
              ) : (
                <>
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {paginatedProducts.map(product => (
                      <div key={product.id} className={viewMode === 'list' ? 'flex' : ''}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                  <ProductPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsFilterOpen(false)} />
        )}
        <div className={`fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 overflow-y-auto h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">✕</button>
            </div>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={() => { clearFilters(); setIsFilterOpen(false) }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage