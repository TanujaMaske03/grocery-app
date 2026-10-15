import { Link } from 'react-router-dom'
import { 
  ShoppingBagIcon,
  HeartIcon,
  HomeIcon,
  UserIcon,
  CakeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { useProduct } from '../../hooks/useProduct'
import { matchesCategory } from '../../utils/filterUtils'

const CategoriesSection = () => {
  const { products } = useProduct()

  const categories = [
    {
      id: 1,
      name: 'Fruits & Vegetables',
      filterName: 'Fruits & Vegetables',
      icon: ShoppingBagIcon,
      color: 'from-green-400 to-green-600',
      link: '/products?category=Fruits%20%26%20Vegetables'
    },
    {
      id: 2,
      name: 'Dairy & Eggs',
      filterName: 'Dairy & Eggs',
      icon: CakeIcon,
      color: 'from-blue-400 to-blue-600',
      link: '/products?category=Dairy%20%26%20Eggs'
    },
    {
      id: 3,
      name: 'Meat & Poultry',
      filterName: 'Meat & Poultry',
      icon: HeartIcon,
      color: 'from-red-400 to-red-600',
      link: '/products?category=Meat%20%26%20Poultry'
    },
    {
      id: 4,
      name: 'Bakery & Bread',
      filterName: 'Bakery & Bread',
      icon: HomeIcon,
      color: 'from-yellow-400 to-yellow-600',
      link: '/products?category=Bakery%20%26%20Bread'
    },
    {
      id: 5,
      name: 'Organic Food',
      filterName: 'Organic Food',
      icon: SparklesIcon,
      color: 'from-emerald-400 to-emerald-600',
      link: '/products?category=Organic%20Food'
    },
    {
      id: 6,
      name: 'Breakfast & Cereals',
      filterName: 'Breakfast & Cereals',
      icon: UserIcon,
      color: 'from-orange-400 to-orange-600',
      link: '/products?category=Breakfast%20%26%20Cereals'
    }
  ]

  const getProductCount = (categoryName) => {
    if (!products || products.length === 0) return 0
    return products.filter(p => matchesCategory(p, categoryName)).length
  }

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
          {categories.map((category) => {
            const count = getProductCount(category.filterName)
            return (
              <Link
                key={category.id}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 block"
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
                  <p className="text-xs text-gray-400">{count} Products</p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/10 group-hover:to-black/10 transition-all duration-300 pointer-events-none" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection