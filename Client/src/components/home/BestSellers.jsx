import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'

const BestSellers = () => {
  const bestSellers = [
    {
      id: 9,
      name: 'Premium Coffee Beans',
      price: 12.99,
      originalPrice: 16.99,
      category: 'Beverages',
      image: '/images/products/coffee.jpg',
      rating: 4.9,
      stock: 45,
      isNew: false,
      discount: 23
    },
    {
      id: 10,
      name: 'Organic Honey Jar',
      price: 8.99,
      originalPrice: 11.99,
      category: 'Pantry',
      image: '/images/products/honey.jpg',
      rating: 4.8,
      stock: 30,
      isNew: false,
      discount: 25
    },
    {
      id: 11,
      name: 'Fresh Strawberries',
      price: 5.99,
      originalPrice: 7.99,
      category: 'Fruits',
      image: '/images/products/strawberry.jpg',
      rating: 4.7,
      stock: 20,
      isNew: true,
      discount: 25
    },
    {
      id: 12,
      name: 'Whole Wheat Pasta',
      price: 3.49,
      originalPrice: 4.49,
      category: 'Pantry',
      image: '/images/products/pasta.jpg',
      rating: 4.6,
      stock: 60,
      isNew: false,
      discount: 22
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">🏆 Best Sellers</h2>
            <p className="text-gray-500 mt-2">Our most popular products loved by customers</p>
          </div>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers