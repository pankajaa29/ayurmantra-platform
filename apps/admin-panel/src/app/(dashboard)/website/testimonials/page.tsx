'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plus,
  Search,
  Star,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  Loader2,
} from 'lucide-react';
import { testimonialsApi } from '@/lib/api';

interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  rating: number;
  treatment: string;
  content: string;
  status: 'PUBLISHED' | 'PENDING' | 'REJECTED';
  createdAt: string;
  featured: boolean;
  hasBeforeAfter: boolean;
}

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, [filterStatus, searchTerm]);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (filterStatus !== 'all') params.status = filterStatus.toUpperCase();

      const data = await testimonialsApi.getAll(params);
      
      if (data.data) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await testimonialsApi.delete(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <span className="badge badge-green flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Published</span>;
      case 'PENDING':
        return <span className="badge badge-yellow">Pending Review</span>;
      case 'REJECTED':
        return <span className="badge badge-red">Rejected</span>;
      default:
        return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage patient reviews and success stories</p>
        </div>
        <Link href="/website/testimonials/new" className="admin-btn-primary">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: testimonials.length },
          { label: 'Published', value: testimonials.filter(t => t.status === 'PUBLISHED').length },
          { label: 'Pending', value: testimonials.filter(t => t.status === 'PENDING').length },
          { label: 'Featured', value: testimonials.filter(t => t.featured).length },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D5A3D]" />
          <span className="ml-3 text-gray-600">Loading testimonials...</span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="admin-card hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Avatar & Info */}
                  <div className="flex items-start gap-4 md:w-1/3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.patientName?.charAt(0) || '👤'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.patientName}</h3>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{testimonial.treatment}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-gray-600 line-clamp-2">{testimonial.content}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                      {testimonial.hasBeforeAfter && (
                        <span className="text-[#2D5A3D]">📷 Before/After</span>
                      )}
                      {testimonial.featured && (
                        <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4853C] rounded-full text-xs font-medium">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
                    {getStatusBadge(testimonial.status)}
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-[#F8F6F0] rounded-lg" title="View">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-[#F8F6F0] rounded-lg" title="Edit">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(testimonial.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials found.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-serif text-xl font-bold mb-2">Delete Testimonial?</h3>
            <p className="text-gray-600 mb-6">
              This will permanently remove this testimonial from the website.
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
