import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

const RelatedProducts = ({ products = [], category }) => {
  if (products.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Related Products in {category}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts