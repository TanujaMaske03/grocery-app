import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'

const NewArrivals = () => {
  const newArrivals = [
    {
      id: 17,
      name: 'Matcha Green Tea Powder',
      price: 14.99,
      originalPrice: 19.99,
      category: 'Beverages',
      image: '/images/products/matcha.jpg',
      rating: 4.9,
      stock: 20,
      isNew: true,
      discount: 25
    },
    {
      id: 18,
      name: 'Coconut Water (Pack of 4)',
      price: 8.99,
      originalPrice: 11.99,
      category: 'Beverages',
      image: '/images/products/coconut-water.jpg',
      rating: 4.7,
      stock: 30,
      isNew: true,
      discount: 25
    },
    {
      id: 19,
      name: 'Almond Butter Jar',
      price: 10.49,
      originalPrice: 13.49,
      category: 'Pantry',
      image: '/images/products/almond-butter.jpg',
      rating: 4.8,
      stock: 25,
      isNew: true,
      discount: 22
    },
    {
      id: 20,
      name: 'Vegan Protein Shake',
      price: 11.99,
      originalPrice: 15.99,
      category: 'Health',
      image: '/images/products/protein-shake.jpg',
      rating: 4.6,
      stock: 15,
      isNew: true,
      discount: 25
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">✨ New Arrivals</h2>
            <p className="text-gray-500 mt-2">Freshly added products you'll love</p>
          </div>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals