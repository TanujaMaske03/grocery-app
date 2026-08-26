import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  const flashProducts = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      price: 3.99,
      originalPrice: 6.99,
      category: 'Fruits',
      image: '/images/products/apple.jpg',
      rating: 4.5,
      stock: 15,
      isNew: false,
      discount: 43
    },
    {
      id: 2,
      name: 'Premium Bananas',
      price: 2.99,
      originalPrice: 4.99,
      category: 'Fruits',
      image: '/images/products/banana.jpg',
      rating: 4.8,
      stock: 20,
      isNew: true,
      discount: 40
    },
    {
      id: 3,
      name: 'Fresh Whole Milk',
      price: 4.99,
      originalPrice: 7.99,
      category: 'Dairy',
      image: '/images/products/milk.jpg',
      rating: 4.3,
      stock: 8,
      isNew: false,
      discount: 37
    },
    {
      id: 4,
      name: 'Organic Bread',
      price: 2.49,
      originalPrice: 4.49,
      category: 'Bakery',
      image: '/images/products/bread.jpg',
      rating: 4.6,
      stock: 12,
      isNew: false,
      discount: 45
    }
  ]

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
          <div className="flex items-center space-x-3 bg-red-50 px-6 py-3 rounded-2xl mt-4 md:mt-0">
            <span className="text-sm font-semibold text-red-600">Ends in:</span>
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
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link 
            to="/products?deal=true" 
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