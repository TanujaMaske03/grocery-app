import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { useProduct } from '../../hooks/useProduct'

const TrendingProducts = () => {
  const { products, trendingProducts } = useProduct()

  const fallbackTrending = [
    {
      id: 13,
      name: 'Avocado Toast Breakfast Kit',
      price: 219.00,
      originalPrice: 289.00,
      category: 'Breakfast & Cereals',
      image: '/images/products/avocado-toast.jpg',
      rating: 4.6,
      stock: 20,
      isNew: true
    },
    {
      id: 14,
      name: 'Cold-Pressed Fresh Orange Juice',
      price: 119.00,
      originalPrice: 149.00,
      category: 'Beverages',
      image: '/images/products/juice.jpg',
      rating: 4.2,
      stock: 30,
      isNew: false
    },
    {
      id: 15,
      name: 'Almond Honey Crunch Granola',
      price: 289.00,
      originalPrice: 389.00,
      category: 'Breakfast & Cereals',
      image: '/images/products/granola.jpg',
      rating: 4.7,
      stock: 30,
      isNew: true
    },
    {
      id: 16,
      name: 'Organic White Quinoa',
      price: 299.00,
      originalPrice: 399.00,
      category: 'Organic Food',
      image: '/images/products/quinoa.jpg',
      rating: 4.7,
      stock: 30,
      isNew: true
    }
  ]

  const liveTrending = (trendingProducts && trendingProducts.length > 0)
    ? trendingProducts
    : products.filter(p => p.isTrending).slice(0, 4)

  const displayProducts = liveTrending && liveTrending.length > 0 
    ? liveTrending.slice(0, 4) 
    : fallbackTrending

  return (
    <section className="py-12 bg-white dark:bg-gray-800 transition-colors">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title text-gray-800 dark:text-white">🔥 Trending Now</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">What's hot and popular this week</p>
          </div>
          <Link to="/products" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold flex items-center transition-colors">
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingProducts