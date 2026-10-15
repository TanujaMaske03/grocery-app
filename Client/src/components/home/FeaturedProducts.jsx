import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { useProduct } from '../../hooks/useProduct'

const FeaturedProducts = () => {
  const { featuredProducts: liveFeatured } = useProduct()

  const fallbackFeatured = [
    {
      id: 5,
      name: 'Fresh Farm Spinach',
      price: 49.00,
      originalPrice: 69.00,
      category: 'Fruits & Vegetables',
      image: '/images/products/spinach.jpg',
      rating: 4.6,
      stock: 40,
      isNew: false
    },
    {
      id: 6,
      name: 'Farm Fresh Free-Range Eggs',
      price: 149.00,
      originalPrice: 199.00,
      category: 'Dairy & Eggs',
      image: '/images/products/eggs.jpg',
      rating: 4.9,
      stock: 45,
      isNew: true
    },
    {
      id: 7,
      name: 'Artisan Sourdough Loaf',
      price: 129.00,
      originalPrice: 169.00,
      category: 'Bakery & Bread',
      image: '/images/products/sourdough.jpg',
      rating: 4.8,
      stock: 20,
      isNew: true
    },
    {
      id: 8,
      name: 'Fresh Organic Chicken Breast',
      price: 349.00,
      originalPrice: 449.00,
      category: 'Meat & Poultry',
      image: '/images/products/chicken.jpg',
      rating: 4.8,
      stock: 30,
      isNew: true,
      freeDelivery: true
    }
  ]

  const displayProducts = liveFeatured && liveFeatured.length > 0 
    ? liveFeatured.slice(0, 4) 
    : fallbackFeatured

  return (
    <section className="py-12 bg-white dark:bg-gray-800 transition-colors">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title text-primary-600 dark:text-primary-400">⭐ Featured Products</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Our hand-picked selection of premium groceries</p>
          </div>
          <Link 
            to="/products" 
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold flex items-center transition-colors"
          >
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts