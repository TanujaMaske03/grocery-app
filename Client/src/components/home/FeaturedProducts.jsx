import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 5,
      name: 'Fresh Organic Spinach',
      price: 2.99,
      originalPrice: 4.99,
      category: 'Vegetables',
      image: '/images/products/spinach.jpg',
      rating: 4.7,
      stock: 25,
      isNew: true,
      discount: 40
    },
    {
      id: 6,
      name: 'Premium Free-Range Eggs',
      price: 5.99,
      originalPrice: 7.99,
      category: 'Dairy',
      image: '/images/products/eggs.jpg',
      rating: 4.9,
      stock: 30,
      isNew: false,
      discount: 25
    },
    {
      id: 7,
      name: 'Artisan Sourdough Bread',
      price: 4.49,
      originalPrice: 6.49,
      category: 'Bakery',
      image: '/images/products/sourdough.jpg',
      rating: 4.8,
      stock: 18,
      isNew: true,
      discount: 30
    },
    {
      id: 8,
      name: 'Organic Avocado Pack',
      price: 3.99,
      originalPrice: 5.99,
      category: 'Fruits',
      image: '/images/products/avocado.jpg',
      rating: 4.6,
      stock: 22,
      isNew: false,
      discount: 33
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title text-primary-600">⭐ Featured Products</h2>
            <p className="text-gray-500 mt-2">Our hand-picked selection of premium groceries</p>
          </div>
          <Link 
            to="/products" 
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center transition-colors"
          >
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts