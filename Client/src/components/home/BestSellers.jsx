import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { useProduct } from '../../hooks/useProduct'

const BestSellers = () => {
  const { products } = useProduct()

  const fallbackBestSellers = [
    {
      id: 9,
      name: 'Artisan Dark Roast Coffee Beans',
      price: 449.00,
      originalPrice: 599.00,
      category: 'Beverages',
      image: '/images/products/coffee.jpg',
      rating: 4.9,
      stock: 25,
      isNew: false,
      freeDelivery: true
    },
    {
      id: 10,
      name: 'Raw Organic Forest Honey',
      price: 349.00,
      originalPrice: 449.00,
      category: 'Organic Food',
      image: '/images/products/honey.jpg',
      rating: 4.8,
      stock: 35,
      isNew: false
    },
    {
      id: 11,
      name: 'Fresh Sweet Strawberries',
      price: 249.00,
      originalPrice: 349.00,
      category: 'Fruits & Vegetables',
      image: '/images/products/strawberry.jpg',
      rating: 4.7,
      stock: 25,
      isNew: true
    },
    {
      id: 12,
      name: 'Premium Lean Lamb Chops',
      price: 699.00,
      originalPrice: 899.00,
      category: 'Meat & Poultry',
      image: '/images/products/meat.jpg',
      rating: 4.9,
      stock: 15,
      isNew: true,
      freeDelivery: true
    }
  ]

  const liveTop = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  const displayProducts = liveTop.length > 0 ? liveTop.slice(0, 4) : fallbackBestSellers

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title text-gray-800 dark:text-white">🏆 Best Sellers</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Our most popular products loved by customers</p>
          </div>
          <Link to="/products?sort=rating" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold flex items-center transition-colors">
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

export default BestSellers