import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===========================
  // Fetch All Products
  // ===========================
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products || []);
    } catch (error) {
      console.error("Fetch Products Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ===========================
  // Add Product
  // ===========================
  const createProduct = async (productData) => {
    try {
      const data = await addProduct(productData);

      setProducts((prev) => [...prev, data.product]);

      return data;
    } catch (error) {
      console.error("Add Product Error:", error);
      throw error;
    }
  };

  // ===========================
  // Update Product
  // ===========================
  const editProduct = async (id, productData) => {
    try {
      const data = await updateProduct(id, productData);

      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? data.product : product
        )
      );

      return data;
    } catch (error) {
      console.error("Update Product Error:", error);
      throw error;
    }
  };

  // ===========================
  // Delete Product
  // ===========================
  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Delete Product Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    loadProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        createProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};