import { useState } from 'react';
import { useAdmin } from '../Context API/AdminContext';
import type { Product } from '../types';

export const useProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map((p: Product) => p.category))];

  const getProductById = (id: string): Product | undefined => {
    return products.find((p: Product) => p.id === id);
  };

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
  };
};