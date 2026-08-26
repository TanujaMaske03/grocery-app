import { createContext, useState, useEffect } from 'react'
import { cartService } from '../services/cartService'
import { useAuth } from '../hooks/useAuth'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])  // ✅ Always an array
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCartItems([])  // ✅ Reset to empty array when logged out
    }
  }, [user])

 const fetchCart = async () => {
  setLoading(true)

  try {
    const data = await cartService.getCart()

    console.log("🛒 Cart Response:", data)

    // Backend returns: { success: true, cart: { items: [...] } }
    const items = data?.cart?.items || []

    setCartItems(items)
  } catch (error) {
    console.error("Error fetching cart:", error)
    setCartItems([])
  } finally {
    setLoading(false)
  }
}

  const addToCart = async (product, quantity = 1) => {
    try {
      await cartService.addToCart(product.id, quantity)
      await fetchCart()
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  }

  const removeFromCart = async (productId) => {
    try {
      await cartService.removeFromCart(productId)
      await fetchCart()
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw error
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      await cartService.updateQuantity(productId, quantity)
      await fetchCart()
    } catch (error) {
      console.error('Error updating quantity:', error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      await cartService.clearCart()
      setCartItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  }

 const getTotalItems = () => {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0)
}

  const getTotalPrice = () => {
  return cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)
}

  return (
    <CartContext.Provider value={{
      cartItems,        // ✅ Now always an array
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  )
}