// Category and Promotion helper functions for Server

const normalizeSlug = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const getCategoryFilter = (categoryParam) => {
  if (!categoryParam || categoryParam === 'All' || categoryParam === 'all') {
    return null;
  }

  const clean = categoryParam.trim().toLowerCase();
  const slug = normalizeSlug(clean);

  if (slug === 'fruitsvegetables' || slug === 'fruits' || slug === 'vegetables' || clean.includes('fruit') || clean.includes('vegetable')) {
    return {
      $or: [
        { category: { $regex: /fruit|vegetable/i } },
        { tags: { $in: ['fruits', 'vegetables', 'fruit', 'vegetable'] } }
      ]
    };
  }

  if (slug === 'dairyeggs' || slug === 'dairy' || slug === 'eggs' || clean.includes('dairy') || clean.includes('egg')) {
    return {
      $or: [
        { category: { $regex: /dairy|egg/i } },
        { tags: { $in: ['dairy', 'eggs', 'egg', 'milk'] } }
      ]
    };
  }

  if (slug === 'meatpoultry' || slug === 'meat' || slug === 'poultry' || clean.includes('meat') || clean.includes('poultry')) {
    return {
      $or: [
        { category: { $regex: /meat|poultry|chicken|lamb|turkey/i } },
        { tags: { $in: ['meat', 'poultry', 'chicken', 'lamb', 'turkey'] } }
      ]
    };
  }

  if (slug === 'bakerybread' || slug === 'bakery' || slug === 'bread' || clean.includes('bakery') || clean.includes('bread')) {
    return {
      $or: [
        { category: { $regex: /bakery|bread/i } },
        { tags: { $in: ['bakery', 'bread', 'croissant', 'sourdough'] } }
      ]
    };
  }

  if (slug === 'organicfood' || slug === 'organicfoods' || clean === 'organic food' || clean === 'organic foods' || clean === 'organic') {
    return {
      category: { $regex: /^organic\s*food/i }
    };
  }

  if (slug === 'breakfastcereals' || slug === 'breakfast' || slug === 'cereals' || clean.includes('breakfast') || clean.includes('cereal')) {
    return {
      $or: [
        { category: { $regex: /breakfast|cereal|oat/i } },
        { tags: { $in: ['breakfast', 'cereals', 'cereal', 'oats', 'granola'] } }
      ]
    };
  }

  // Exact or general match
  return { category: { $regex: new RegExp(`^${categoryParam.trim()}$`, 'i') } };
};

const getPromotionFilter = (promotionParam) => {
  if (!promotionParam) return null;
  const promo = promotionParam.toLowerCase().trim();

  if (promo === 'summer-sale' || promo === 'deal' || promo === 'sale') {
    return {
      $or: [
        { isSummerSale: true },
        { promotions: 'summer-sale' }
      ]
    };
  }

  if (promo === 'organic-week') {
    return {
      $or: [
        { isOrganicWeek: true },
        { promotions: 'organic-week' }
      ]
    };
  }

  if (promo === 'free-delivery') {
    return {
      $or: [
        { freeDelivery: true },
        { promotions: 'free-delivery' }
      ]
    };
  }

  return { promotions: promo };
};

module.exports = {
  getCategoryFilter,
  getPromotionFilter,
  normalizeSlug,
};
