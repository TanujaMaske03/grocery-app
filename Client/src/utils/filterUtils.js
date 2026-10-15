export const CATEGORIES = [
  'All',
  'Fruits & Vegetables',
  'Dairy & Eggs',
  'Meat & Poultry',
  'Bakery & Bread',
  'Organic Food',
  'Breakfast & Cereals',
  'Beverages',
  'Snacks',
  'Health'
]

export const PRICE_RANGES = [
  { label: 'All Prices', value: '' },
  { label: 'Under ₹100', value: '0-100' },
  { label: '₹100 - ₹300', value: '100-300' },
  { label: '₹300 - ₹500', value: '300-500' },
  { label: 'Above ₹500', value: '500-100000' }
]

export const RATINGS = [
  { label: 'All Ratings', value: 0 },
  { label: '5 ★ only', value: 5 },
  { label: '4 ★ & up', value: 4 },
  { label: '3 ★ & up', value: 3 },
  { label: '2 ★ & up', value: 2 }
]

export const DISCOUNT_OPTIONS = [
  { label: 'All Discounts', value: 0 },
  { label: '10% and above', value: 10 },
  { label: '20% and above', value: 20 },
  { label: '25% and above', value: 25 },
  { label: '30% and above', value: 30 }
]

export const PROMOTIONS = {
  'summer-sale': {
    id: 'summer-sale',
    label: 'Summer Sale',
    badge: '☀️ Summer Sale',
    color: 'bg-orange-500 text-white'
  },
  'organic-week': {
    id: 'organic-week',
    label: 'Organic Week',
    badge: '🌱 Organic Week',
    color: 'bg-emerald-600 text-white'
  },
  'free-delivery': {
    id: 'free-delivery',
    label: 'Free Delivery',
    badge: '🚚 Free Delivery',
    color: 'bg-blue-600 text-white'
  }
}

/**
 * Normalizes any category string or slug into a standard category name
 */
export const normalizeCategory = (categoryInput) => {
  if (!categoryInput || categoryInput === 'All' || categoryInput === 'all') {
    return 'All'
  }

  const clean = categoryInput.trim().toLowerCase()
  const slug = clean.replace(/[^a-z0-9]/g, '')

  if (slug === 'fruitsvegetables' || slug === 'fruits' || slug === 'vegetables' || clean.includes('fruit') || clean.includes('vegetable')) {
    return 'Fruits & Vegetables'
  }

  if (slug === 'dairyeggs' || slug === 'dairy' || slug === 'eggs' || clean.includes('dairy') || clean.includes('egg')) {
    return 'Dairy & Eggs'
  }

  if (slug === 'meatpoultry' || slug === 'meat' || slug === 'poultry' || clean.includes('meat') || clean.includes('poultry')) {
    return 'Meat & Poultry'
  }

  if (slug === 'bakerybread' || slug === 'bakery' || slug === 'bread' || clean.includes('bakery') || clean.includes('bread')) {
    return 'Bakery & Bread'
  }

  if (slug === 'organicfood' || slug === 'organicfoods' || slug === 'organic' || clean.includes('organic')) {
    return 'Organic Food'
  }

  if (slug === 'breakfastcereals' || slug === 'breakfast' || slug === 'cereals' || clean.includes('breakfast') || clean.includes('cereal')) {
    return 'Breakfast & Cereals'
  }

  // Exact matching case-insensitive
  const found = CATEGORIES.find(c => c.toLowerCase() === clean)
  return found || categoryInput.trim()
}

/**
 * Checks if a product matches a given category
 */
export const matchesCategory = (product, selectedCategory) => {
  if (!selectedCategory || selectedCategory === 'All') return true

  const standardCategory = normalizeCategory(selectedCategory)
  const productCategory = (product.category || '').toLowerCase()
  const productTags = Array.isArray(product.tags) ? product.tags.map(t => t.toLowerCase()) : []

  switch (standardCategory) {
    case 'Fruits & Vegetables':
      return (
        productCategory.includes('fruit') ||
        productCategory.includes('vegetable') ||
        productTags.some(t => t.includes('fruit') || t.includes('vegetable'))
      ) && !productCategory.includes('dairy') && !productCategory.includes('meat') && !productCategory.includes('bakery')

    case 'Dairy & Eggs':
      return (
        productCategory.includes('dairy') ||
        productCategory.includes('egg') ||
        productTags.some(t => t.includes('dairy') || t.includes('egg') || t.includes('milk'))
      ) && !productCategory.includes('fruit') && !productCategory.includes('vegetable') && !productCategory.includes('meat')

    case 'Meat & Poultry':
      return (
        productCategory.includes('meat') ||
        productCategory.includes('poultry') ||
        productCategory.includes('chicken') ||
        productCategory.includes('lamb') ||
        productCategory.includes('turkey') ||
        productTags.some(t => ['meat', 'poultry', 'chicken', 'lamb', 'turkey'].includes(t))
      )

    case 'Bakery & Bread':
      return (
        productCategory.includes('bakery') ||
        productCategory.includes('bread') ||
        productTags.some(t => ['bakery', 'bread', 'croissant', 'sourdough'].includes(t))
      )

    case 'Organic Food':
      return (
        productCategory.startsWith('organic food') ||
        productCategory === 'organic foods' ||
        productCategory === 'organic'
      )

    case 'Breakfast & Cereals':
      return (
        productCategory.includes('breakfast') ||
        productCategory.includes('cereal') ||
        productTags.some(t => ['breakfast', 'cereal', 'cereals', 'oats', 'granola'].includes(t))
      )

    default:
      return productCategory === standardCategory.toLowerCase()
  }
}

/**
 * Checks if a product matches a selected promotion
 */
export const matchesPromotion = (product, selectedPromotion) => {
  if (!selectedPromotion) return true

  const promo = selectedPromotion.toLowerCase().trim()
  if (promo === 'summer-sale' || promo === 'deal' || promo === 'sale') {
    return Boolean(product.isSummerSale || product.promotions?.includes('summer-sale'))
  }

  if (promo === 'organic-week') {
    return Boolean(product.isOrganicWeek || product.promotions?.includes('organic-week'))
  }

  if (promo === 'free-delivery') {
    return Boolean(product.freeDelivery || product.promotions?.includes('free-delivery'))
  }

  return Boolean(product.promotions?.includes(promo))
}

/**
 * Checks if a product matches a search query
 */
export const matchesSearch = (product, searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) return true
  const query = searchTerm.trim().toLowerCase()
  const name = (product.name || '').toLowerCase()
  const category = (product.category || '').toLowerCase()
  const description = (product.description || '').toLowerCase()
  const tags = Array.isArray(product.tags) ? product.tags.join(' ').toLowerCase() : ''

  return name.includes(query) || category.includes(query) || description.includes(query) || tags.includes(query)
}

/**
 * Checks if a product matches a price range
 */
export const matchesPrice = (product, priceRange) => {
  if (!priceRange) return true
  const [min, max] = priceRange.split('-').map(Number)
  const price = Number(product.price)
  if (isNaN(price)) return true
  if (!isNaN(min) && price < min) return false
  if (!isNaN(max) && price > max) return false
  return true
}

/**
 * Checks if a product matches a minimum rating
 */
export const matchesRating = (product, minRating) => {
  const ratingNum = Number(minRating)
  if (!ratingNum || ratingNum <= 0) return true
  return Number(product.rating || 0) >= ratingNum
}

/**
 * Checks if a product matches a minimum discount percentage
 */
export const matchesDiscount = (product, minDiscount) => {
  const discountNum = Number(minDiscount)
  if (!discountNum || discountNum <= 0) return true
  if (!product.originalPrice || product.originalPrice <= product.price) return false
  const calcDiscount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  return calcDiscount >= discountNum
}
