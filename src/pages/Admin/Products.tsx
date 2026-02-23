import React, { useState } from 'react';
import { Plus, Search, Package } from 'lucide-react';
import { useProducts } from '../../Hooks/useProducts';
import ProductCard from '../../Components/Admin/Products/ProductCard';
import ProductForm from '../../Components/Admin/Products/ProductForm';
import type { Product } from '../../types';
import fireAlert from '../../Alerts/alert';

const Products: React.FC = () => {
  const {
    products,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleAddProduct = async (data: Omit<Product, 'id' | 'createdAt'>): Promise<void> => {
    await addProduct(data);
    setShowForm(false);
    fireAlert('success', 'Product added successfully');
  };

  const handleEditProduct = async (data: Omit<Product, 'id' | 'createdAt'>): Promise<void> => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
      setEditingProduct(undefined);
      fireAlert('success', 'Product updated successfully');
    }
  };

  const handleDeleteProduct = async (id: string): Promise<void> => {
    await deleteProduct(id);
    fireAlert('success', 'Product deleted successfully');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or description..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-48 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {categories.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No products found</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-6 py-2 text-green-600 hover:text-green-700 font-medium"
          >
            + Add your first product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setEditingProduct}
              onDelete={handleDeleteProduct}
              onView={(p) => console.log('View product:', p)}
            />
          ))}
        </div>
      )}

      {(showForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(undefined);
          }}
        />
      )}
    </div>
  );
};

export default Products;