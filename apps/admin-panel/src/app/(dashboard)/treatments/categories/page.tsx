'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  CheckCircle,
  X,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  sortOrder: number;
  treatmentCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Detox', description: 'Body cleansing therapies', sortOrder: 1, treatmentCount: 5 },
    { id: '2', name: 'Massage', description: 'Therapeutic massage treatments', sortOrder: 2, treatmentCount: 8 },
    { id: '3', name: 'Therapy', description: 'Specialized Ayurvedic therapies', sortOrder: 3, treatmentCount: 6 },
    { id: '4', name: 'Beauty', description: 'Natural beauty treatments', sortOrder: 4, treatmentCount: 4 },
    { id: '5', name: 'Wellness', description: 'Holistic wellness packages', sortOrder: 5, treatmentCount: 3 },
    { id: '6', name: 'Panchakarma', description: 'Five-fold detoxification', sortOrder: 6, treatmentCount: 2 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', sortOrder: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        treatmentCount: 0,
      };
      setCategories([...categories, newCategory]);
    }
    
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', sortOrder: 0 });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      sortOrder: category.sortOrder,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/treatments" className="p-2 hover:bg-[#F8F6F0] rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Treatment Categories</h1>
          <p className="text-gray-500 mt-1">Manage treatment categories and organization</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', description: '', sortOrder: categories.length + 1 });
            setShowModal(true);
          }}
          className="admin-btn-primary"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                              flex items-center justify-center text-white font-bold text-xl">
                  {category.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">Order: {category.sortOrder}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 hover:bg-[#F8F6F0] rounded-lg"
                >
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{category.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
              <span className="text-sm text-gray-500">
                {category.treatmentCount} treatments
              </span>
              <div className="flex items-center gap-1 text-gray-400 cursor-move">
                <GripVertical className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-[#2D5A3D]">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#F8F6F0] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Massage"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the category..."
                  className="admin-input resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                <input
                  type="number"
                  min="1"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                  className="admin-input"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-[#E8E2D5] rounded-xl font-medium hover:bg-[#F8F6F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2D5A3D] text-white rounded-xl font-medium hover:bg-[#1F4030]"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
