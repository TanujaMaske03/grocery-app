import { Link } from 'react-router-dom'
import { 
  ShoppingBagIcon,
  HeartIcon,
  HomeIcon,
  UserIcon,
  CakeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: 'Fruits & Vegetables',
      icon: ShoppingBagIcon,
      color: 'from-green-400 to-green-600',
      count: 150,
      link: '/products?category=fruits-vegetables'
    },
    {
      id: 2,
      name: 'Dairy & Eggs',
      icon: CakeIcon,
      color: 'from-blue-400 to-blue-600',
      count: 85,
      link: '/products?category=dairy-eggs'
    },
    {
      id: 3,
      name: 'Meat & Poultry',
      icon: HeartIcon,
      color: 'from-red-400 to-red-600',
      count: 65,
      link: '/products?category=meat-poultry'
    },
    {
      id: 4,
      name: 'Bakery & Bread',
      icon: HomeIcon,
      color: 'from-yellow-400 to-yellow-600',
      count: 45,
      link: '/products?category=bakery-bread'
    },
    {
      id: 5,
      name: 'Organic Foods',
      icon: SparklesIcon,
      color: 'from-emerald-400 to-emerald-600',
      count: 120,
      link: '/products?category=organic'
    },
    {
      id: 6,
      name: 'Breakfast & Cereals',
      icon: UserIcon,
      color: 'from-orange-400 to-orange-600',
      count: 70,
      link: '/products?category=breakfast-cereals'
    }
  ]

  return (
    <section className="py-12">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Shop by Categories</h2>
            <p className="text-gray-500 mt-2">Find what you're looking for</p>
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2"
            >
              {/* Category Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className={`w-full h-full bg-gradient-to-br ${category.color} opacity-90`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <category.icon className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Category Info */}
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-400">{category.count} Products</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/10 group-hover:to-black/10 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection