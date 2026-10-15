import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { useProduct } from '../../hooks/useProduct'

const NewArrivals = () => {
  const { products } = useProduct()

  const fallbackNewArrivals = [
    {
      id: 17,
      name: 'Organic Ceremonial Matcha',
      price: 499.00,
      originalPrice: 699.00,
      category: 'Organic Food',
      image: '/images/products/matcha.jpg',
      rating: 4.8,
      stock: 15,
      isNew: true
    },
    {
      id: 18,
      name: 'Natural Pure Coconut Water',
      price: 89.00,
      originalPrice: 119.00,
      category: 'Beverages',
      image: '/images/products/coconut-water.jpg',
      rating: 4.6,
      stock: 35,
      isNew: true
    },
    {
      id: 19,
      name: 'Raw Creamy Almond Butter',
      price: 399.00,
      originalPrice: 499.00,
      category: 'Snacks',
      image: '/images/products/almond-butter.jpg',
      rating: 4.7,
      stock: 20,
      isNew: true
    },
    {
      id: 20,
      name: 'Artisan Dark Roast Coffee Beans',
      price: 449.00,
      originalPrice: 599.00,
      category: 'Beverages',
      image: '/images/products/coffee.jpg',
      rating: 4.9,
      stock: 25,
      isNew: true,
      freeDelivery: true
    }
  ]

  const liveNew = products.filter(p => p.isNew)
  const displayProducts = liveNew.length > 0 ? liveNew.slice(0, 4) : fallbackNewArrivals

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title text-gray-800 dark:text-white">✨ New Arrivals</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Check out our latest additions to the store</p>
          </div>
          <Link to="/products?sort=newest" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold flex items-center transition-colors">
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

export default NewArrivals