'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { treatmentsApi } from '@/lib/api';

// Types
interface Treatment {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  discountedPrice?: number;
  status: 'active' | 'inactive' | 'draft';
  rating: number;
  reviews: number;
  bookings: number;
}

interface Category {
  id: string;
  name: string;
}

export default function TreatmentsManagementPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Fetch treatments
  useEffect(() => {
    fetchTreatments();
    fetchCategories();
  }, [currentPage, filterCategory, filterStatus, searchTerm]);

  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      if (searchTerm) params.search = searchTerm;
      if (filterCategory !== 'all') params.category = filterCategory;
      if (filterStatus !== 'all') params.status = filterStatus;

      const data = await treatmentsApi.getAll(params);
      
      if (data.data) {
        setTreatments(data.data);
        setTotalPages(data.meta?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await treatmentsApi.getCategories();
      if (data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/treatments/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTreatments(treatments.filter(t => t.id !== id));
        setShowDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting treatment:', error);
    }
  };

  const handleBulkDelete = async () => {
    // Implement bulk delete
    console.log('Deleting:', selectedTreatments);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/treatments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setTreatments(treatments.map(t => 
          t.id === id ? { ...t, status: newStatus as any } : t
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedTreatments(prev => 
      prev.includes(id) 
        ? prev.filter(tid => tid !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedTreatments.length === treatments.length) {
      setSelectedTreatments([]);
    } else {
      setSelectedTreatments(treatments.map(t => t.id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-green flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>;
      case 'inactive':
        return <span className="badge badge-red flex items-center gap-1"><XCircle className="w-3 h-3" /> Inactive</span>;
      case 'draft':
        return <span className="badge badge-yellow">Draft</span>;
      default:
        return <span className="badge badge-blue">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Treatments</h1>
          <p className="text-gray-500 mt-1">Manage treatment packages and services</p>
        </div>
        <div className="flex gap-3">
          <Link href="/treatments/categories" className="admin-btn-outline">
            Categories
          </Link>
          <Link href="/treatments/new" className="admin-btn-primary">
            <Plus className="w-4 h-4" />
            Add Treatment
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active', value: treatments.filter(t => t.status === 'active').length, color: 'badge-green' },
          { label: 'Inactive', value: treatments.filter(t => t.status === 'inactive').length, color: 'badge-red' },
          { label: 'Draft', value: treatments.filter(t => t.status === 'draft').length, color: 'badge-yellow' },
          { label: 'Total', value: treatments.length, color: 'badge-blue' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card"
          >
            <span className={`badge ${stat.color}`}>{stat.label}</span>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="admin-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="admin-input"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-input"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
            <button className="admin-btn-outline p-2">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTreatments.length > 0 && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#E8E2D5]">
            <span className="text-sm text-gray-600">{selectedTreatments.length} selected</span>
            <button 
              onClick={handleBulkDelete}
              className="text-red-600 text-sm font-medium hover:underline"
            >
              Delete Selected
            </button>
            <button 
              onClick={() => setSelectedTreatments([])}
              className="text-gray-500 text-sm hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card overflow-hidden"
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#2D5A3D] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500">Loading treatments...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedTreatments.length === treatments.length && treatments.length > 0}
                        onChange={selectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th>Treatment</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.map((treatment) => (
                    <tr key={treatment.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedTreatments.includes(treatment.id)}
                          onChange={() => toggleSelection(treatment.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                                        flex items-center justify-center text-white font-bold">
                            {treatment.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{treatment.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{treatment.description}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-blue">{treatment.category}</span>
                      </td>
                      <td>
                        <span className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {treatment.duration} min
                        </span>
                      </td>
                      <td>
                        <div>
                          <span className="font-medium">₹{treatment.price}</span>
                          {treatment.discountedPrice && (
                            <span className="text-sm text-green-600 ml-2">
                              ₹{treatment.discountedPrice}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{treatment.rating}</span>
                          <span className="text-xs text-gray-400">({treatment.reviews})</span>
                        </div>
                      </td>
                      <td>{getStatusBadge(treatment.status)}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Link 
                            href={`/treatments/${treatment.id}`}
                            className="p-1.5 hover:bg-[#F8F6F0] rounded-lg"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </Link>
                          <Link 
                            href={`/treatments/${treatment.id}/edit`}
                            className="p-1.5 hover:bg-[#F8F6F0] rounded-lg"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-500" />
                          </Link>
                          <button 
                            onClick={() => setShowDeleteConfirm(treatment.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#E8E2D5]">
              <p className="text-sm text-gray-500">
                Showing {treatments.length} treatments
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0] disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 bg-[#2D5A3D] text-white rounded-lg text-sm">
                  {currentPage}
                </span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0] disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-serif text-xl font-bold mb-2">Delete Treatment?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this treatment? This action cannot be undone.
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
