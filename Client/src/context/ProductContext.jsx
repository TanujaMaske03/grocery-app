import { createContext, useState, useEffect } from 'react'
import { productService } from '../services/productService'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await productService.getProducts()
      // Extract products array
      const productsData = response?.products || response?.data?.products || []
      if (Array.isArray(productsData) && productsData.length > 0) {
        // Normalize to ensure consistent fields
        const normalized = productsData.map(p => ({
          ...p,
          id: p._id || p.id,
          stock: p.stock ?? p.quantity ?? 0,
          rating: p.rating ?? 4.0,
          image: p.image || '/images/placeholder.jpg',
          category: p.category || 'General',
          isNew: p.isNew ?? false,
          isFeatured: p.isFeatured ?? false,
          isTrending: p.isTrending ?? false,
        }))
        setProducts(normalized)
        setFeaturedProducts(normalized.filter(p => p.isFeatured))
        setTrendingProducts(normalized.slice(0, 4))
      } else {
        setProducts([])
        setFeaturedProducts([])
        setTrendingProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const searchProducts = async (term) => {
    try {
      const response = await productService.search(term)
      return response?.products || response?.data?.products || []
    } catch (error) {
      console.error('Search fallback to local:', error)
      const lowerTerm = term.toLowerCase()
      return products.filter(p =>
        p.name?.toLowerCase().includes(lowerTerm) ||
        p.category?.toLowerCase().includes(lowerTerm)
      )
    }
  }

  const getProductById = async (id) => {
    try {
      const response = await productService.getProductById(id)
      return response?.product || response?.data?.product || response
    } catch (error) {
      return products.find(p => p.id === id || p._id === id) || null
    }
  }

  const getProductsByCategory = async (category) => {
    try {
      const response = await productService.getByCategory(category)
      return response?.products || response?.data?.products || []
    } catch (error) {
      return products.filter(p => p.category?.toLowerCase() === category.toLowerCase())
    }
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      featuredProducts,
      trendingProducts,
      searchProducts,
      getProductById,
      getProductsByCategory,
      fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  )
}