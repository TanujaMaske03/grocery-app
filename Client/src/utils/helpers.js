// Capitalize First Letter
export const capitalize = (text = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Generate Random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// Truncate Long Text
export const truncateText = (text = "", maxLength = 50) => {
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
};

// Get Discount Percentage
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice) return 0;

  return Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100
  );
};

// Check Stock Availability
export const isInStock = (stock) => {
  return stock > 0;
};