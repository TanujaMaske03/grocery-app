import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { useProduct } from '../../hooks/useProduct'

const FlashSale = () => {
  const { products } = useProduct()
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  const fallbackFlash = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      price: 399.00,
      originalPrice: 559.00,
      category: 'Fruits & Vegetables',
      image: '/images/products/apple.jpg',
      rating: 4.5,
      stock: 50,
      isNew: true
    },
    {
      id: 2,
      name: 'Premium Bananas',
      price: 159.00,
      originalPrice: 199.00,
      category: 'Fruits & Vegetables',
      image: '/images/products/banana.jpg',
      rating: 4.8,
      stock: 40,
      isNew: false
    },
    {
      id: 3,
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
      id: 4,
      name: 'Artisan Sourdough Loaf',
      price: 129.00,
      originalPrice: 169.00,
      category: 'Bakery & Bread',
      image: '/images/products/sourdough.jpg',
      rating: 4.8,
      stock: 20,
      isNew: true
    }
  ]

  const liveSale = products.filter(p => p.isSummerSale || p.promotions?.includes('summer-sale'))
  const displayProducts = liveSale.length > 0 ? liveSale.slice(0, 4) : fallbackFlash

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              hours = 23
              minutes = 59
              seconds = 59
            }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="section-title text-red-500">🔥 Flash Sale</h2>
            <p className="text-gray-500 mt-2">Limited time offers - Grab them before they're gone!</p>
          </div>
          
          {/* Timer */}
          <div className="flex items-center space-x-3 bg-red-50 dark:bg-red-950/40 px-6 py-3 rounded-2xl mt-4 md:mt-0">
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">Ends in:</span>
            <div className="flex space-x-2">
              <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-lg min-w-[40px] text-center">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-red-500 font-bold text-lg">:</span>
              <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-lg min-w-[40px] text-center">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-red-500 font-bold text-lg">:</span>
              <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-lg min-w-[40px] text-center">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link 
            to="/products?promotion=summer-sale" 
            className="btn-primary px-8"
          >
            View All Deals
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FlashSale