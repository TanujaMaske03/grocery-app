import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const ProductQuantity = ({ quantity, onQuantityChange, maxStock = 999 }) => {
  const decrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const increase = () => {
    if (quantity < maxStock) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={decrease}
        disabled={quantity <= 1}
        className="p-2 border border-gray-200 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
      <button
        onClick={increase}
        disabled={quantity >= maxStock}
        className="p-2 border border-gray-200 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
      <span className="text-sm text-gray-500 ml-2">
        {maxStock > 0 ? `${maxStock} available` : 'In stock'}
      </span>
    </div>
  )
}

export default ProductQuantity