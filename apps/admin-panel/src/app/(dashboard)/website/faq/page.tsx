'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Folder,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { faqApi } from '@/lib/api';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'PUBLISHED' | 'DRAFT';
}

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const [faqResponse, categoriesResponse] = await Promise.all([
        faqApi.getAll(),
        faqApi.getCategories(),
      ]);
      
      if (faqResponse.data) {
        setFaqs(faqResponse.data);
      }
      
      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await faqApi.delete(id);
      setFaqs(faqs.filter(f => f.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ');
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchTerm && !faq.question.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Count FAQs per category
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: faqs.filter(f => f.category === cat).length,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">FAQ Management</h1>
          <p className="text-gray-500 mt-1">Organize frequently asked questions</p>
        </div>
        <div className="flex gap-3">
          <Link href="/website/faq/new" className="admin-btn-primary">
            <Plus className="w-4 h-4" />
            Add Question
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-[#2D5A3D] text-white'
              : 'bg-white border border-[#E8E2D5] text-gray-600 hover:bg-[#F8F6F0]'
          }`}
        >
          All ({faqs.length})
        </button>
        {categoryCounts.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.name
                ? 'bg-[#2D5A3D] text-white'
                : 'bg-white border border-[#E8E2D5] text-gray-600 hover:bg-[#F8F6F0]'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
      </div>

      {/* FAQ List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D5A3D]" />
          <span className="ml-3 text-gray-600">Loading FAQs...</span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="admin-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400">{index + 1}</span>
                  </div>

                  <div className="flex-1">
                    <button
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                      className="w-full flex items-start justify-between text-left"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-[#2D5A3D]/10 text-[#2D5A3D] rounded text-xs font-medium">
                            {faq.category}
                          </span>
                          {faq.status === 'DRAFT' && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                              Draft
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-800">{faq.question}</h3>
                      </div>
                      {expandedId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-[#2D5A3D]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {expandedId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-3 pr-8"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        <div className="flex items-center gap-2 mt-4">
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#2D5A3D]/10 text-[#2D5A3D] rounded-lg text-sm font-medium hover:bg-[#2D5A3D]/20">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(faq.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="admin-card p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8F6F0] flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">No questions found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or category filter</p>
              <Link href="/website/faq/new" className="admin-btn-primary">
                <Plus className="w-4 h-4" />
                Add New Question
              </Link>
            </div>
          )}
        </motion.div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-serif text-xl font-bold mb-2">Delete FAQ?</h3>
            <p className="text-gray-600 mb-6">
              This will permanently remove this question from the website.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 border border-[#E8E2D5] rounded-xl font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
