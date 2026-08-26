import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../hooks/useCart'

const CartItem = ({ item }) => {
 const { updateQuantity, removeFromCart } = useCart()
  const product = item.product || {}

  const handleQuantityChange = (newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(item._id)
  } else {
    updateQuantity(item._id, newQuantity)
  }
}

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-100 last:border-0">

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500">
          {product.category}
        </p>

        <p className="text-primary-600 font-bold mt-2">
          ₹{product.price}
        </p>
      </div>

     {/* Quantity */}
<div className="flex items-center gap-2">

  <button
    onClick={() => handleQuantityChange(item.quantity - 1)}
    className="p-2 border rounded hover:bg-gray-100"
  >
    <MinusIcon className="w-4 h-4" />
  </button>

  <span className="font-semibold w-8 text-center">
    {item.quantity}
  </span>

  <button
    onClick={() => handleQuantityChange(item.quantity + 1)}
    className="p-2 border rounded hover:bg-gray-100"
  >
    <PlusIcon className="w-4 h-4" />
  </button>

</div>

      {/* Total */}
      <div className="font-bold text-lg">
        ₹{(product.price || 0) * item.quantity}
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-500 hover:text-red-700"
      >
        <TrashIcon className="w-6 h-6" />
      </button>

    </div>
  )
}

export default CartItem