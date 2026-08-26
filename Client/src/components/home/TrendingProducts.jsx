import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'

const TrendingProducts = () => {
  const trending = [
    {
      id: 13,
      name: 'Avocado Toast Kit',
      price: 9.99,
      originalPrice: 13.99,
      category: 'Breakfast',
      image: '/images/products/avocado-toast.jpg',
      rating: 4.8,
      stock: 25,
      isNew: true,
      discount: 28
    },
    {
      id: 14,
      name: 'Protein Granola Bar',
      price: 2.49,
      originalPrice: 3.49,
      category: 'Snacks',
      image: '/images/products/granola.jpg',
      rating: 4.5,
      stock: 50,
      isNew: false,
      discount: 28
    },
    {
      id: 15,
      name: 'Cold Pressed Juice',
      price: 6.99,
      originalPrice: 8.99,
      category: 'Beverages',
      image: '/images/products/juice.jpg',
      rating: 4.6,
      stock: 35,
      isNew: true,
      discount: 22
    },
    {
      id: 16,
      name: 'Organic Quinoa',
      price: 7.49,
      originalPrice: 9.99,
      category: 'Pantry',
      image: '/images/products/quinoa.jpg',
      rating: 4.7,
      stock: 40,
      isNew: false,
      discount: 25
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">🔥 Trending Now</h2>
            <p className="text-gray-500 mt-2">What's hot and popular this week</p>
          </div>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingProducts