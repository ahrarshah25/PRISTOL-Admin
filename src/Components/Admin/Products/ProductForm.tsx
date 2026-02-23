import React, { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { X, Upload, Package, Tag, DollarSign, Hash, Star } from 'lucide-react';
import type { Product } from '../../../types';
import { uploadImage } from '../../../helpers/upload';
import showLoading from '../../../Alerts/loading';
import fireAlert from '../../../Alerts/alert';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  onClose: () => void;
}

const ProductForm: FC<ProductFormProps> = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    imageUrl: product?.imageUrl || '',
    category: product?.category || '',
    stock: product?.stock || 0,
    rating: product?.rating || 0,
    discount: product?.discount || 0,
    isNew: product?.isNew || false
  });

  const [uploading, setUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>(product?.imageUrl || '');

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      fireAlert('error', 'Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      fireAlert('error', 'Image size should be less than 2MB');
      return;
    }

    try {
      setUploading(true);
      showLoading('Uploading image...');

      const result = await uploadImage(file);
      
      setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
      setPreviewUrl(result.secure_url);
      
      fireAlert('success', 'Image uploaded successfully');
    } catch (error) {
      fireAlert('error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      fireAlert('error', 'Please upload a product image');
      return;
    }

    await onSubmit(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-sm text-gray-500">Fill in the product details below</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-dashed border-gray-200 hover:border-green-500 transition-all duration-300">
            <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4 text-green-500" />
              Product Image <span className="text-red-500">*</span>
            </label>
            
            <div className="flex flex-col items-center">
              {previewUrl ? (
                <div className="relative mb-6">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-2xl shadow-2xl border-4 border-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl('');
                      setFormData(prev => ({ ...prev, imageUrl: '' }));
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              )}

              <label className={`
                relative overflow-hidden cursor-pointer
                inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                transition-all duration-300
                ${uploading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl hover:scale-105'
                }
              `}>
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-3">Supported: JPG, PNG, WEBP (Max 2MB)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-500" />
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                required
                placeholder="e.g., PRISTOL Antiseptic 100ml"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Package className="w-4 h-4 text-green-500" />
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                required
              >
                <option value="">Select Category</option>
                <option value="Antiseptic">Antiseptic</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Household">Household</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
              required
              placeholder="Enter product description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Price (PKR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                required
                min="0"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Original Price (PKR)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                min="0"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4 text-green-500" />
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                required
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount %
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                min="0"
                max="100"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-green-500" />
                Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                min="0"
                max="5"
                placeholder="0"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`
                    w-6 h-6 rounded-lg border-2 transition-all duration-300
                    ${formData.isNew 
                      ? 'bg-green-500 border-green-500 scale-110' 
                      : 'bg-white border-gray-300 hover:border-green-500'
                    }
                  `}>
                    {formData.isNew && (
                      <svg className="w-4 h-4 text-white mx-auto mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700">Mark as New</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;