'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { staffApi } from '@/lib/api';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
  specialization?: string;
}

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  DOCTOR: 'Doctor',
  STAFF: 'Staff',
  RECEPTIONIST: 'Receptionist',
};

const roleColors: Record<string, string> = {
  SUPER_ADMIN: 'badge-purple',
  ADMIN: 'badge-blue',
  DOCTOR: 'badge-green',
  STAFF: 'badge-yellow',
  RECEPTIONIST: 'badge-gray',
};

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchStaff();
  }, [currentPage, filterRole, filterStatus, searchTerm]);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      if (searchTerm) params.search = searchTerm;
      if (filterRole !== 'all') params.role = filterRole;
      if (filterStatus !== 'all') params.status = filterStatus;

      const data = await staffApi.getAll(params);
      
      if (data.data) {
        setStaff(data.data);
        setTotalPages(data.meta?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await staffApi.delete(id);
      setStaff(staff.filter(s => s.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('Failed to delete staff member');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-green flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>;
      case 'inactive':
        return <span className="badge badge-red flex items-center gap-1"><XCircle className="w-3 h-3" /> Inactive</span>;
      case 'on_leave':
        return <span className="badge badge-yellow">On Leave</span>;
      default:
        return <span className="badge badge-blue">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Staff & Doctors</h1>
          <p className="text-gray-500 mt-1">Manage team members and doctors</p>
        </div>
        <Link href="/staff/new" className="admin-btn-primary">
          <Plus className="w-4 h-4" />
          Add Staff
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Doctors', value: staff.filter(s => s.role === 'DOCTOR').length, color: 'badge-green' },
          { label: 'Admin Staff', value: staff.filter(s => s.role === 'ADMIN' || s.role === 'SUPER_ADMIN').length, color: 'badge-blue' },
          { label: 'Active', value: staff.filter(s => s.status === 'active').length, color: 'badge-green' },
          { label: 'Total', value: staff.length, color: 'badge-purple' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card"
          >
            <span className={`badge ${stat.color}`}>{stat.label}</span>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="admin-input md:w-48"
          >
            <option value="all">All Roles</option>
            <option value="DOCTOR">Doctor</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="STAFF">Staff</option>
            <option value="RECEPTIONIST">Receptionist</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-input md:w-48"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Staff Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#2D5A3D]" />
            <span className="ml-3 text-gray-600">Loading staff...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.length > 0 ? (
                  staff.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2D5A3D]/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-[#2D5A3D]" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            {member.specialization && (
                              <p className="text-xs text-gray-500">{member.specialization}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${roleColors[member.role] || 'badge-gray'}`}>
                          {roleLabels[member.role] || member.role}
                        </span>
                      </td>
                      <td>{member.department || '-'}</td>
                      <td>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {member.email}
                          </p>
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {member.phone}
                          </p>
                        </div>
                      </td>
                      <td>{getStatusBadge(member.status)}</td>
                      <td>{new Date(member.joinDate).toLocaleDateString()}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link 
                            href={`/staff/edit/${member.id}`}
                            className="p-1.5 hover:bg-[#F8F6F0] rounded-lg"
                          >
                            <Edit className="w-4 h-4 text-blue-500" />
                          </Link>
                          <button 
                            onClick={() => setShowDeleteConfirm(member.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No staff members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && staff.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8E2D5]">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-[#F8F6F0] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-[#F8F6F0] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-serif text-xl font-bold text-[#2D5A3D] mb-2">Delete Staff Member?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 border border-[#E8E2D5] rounded-xl font-medium hover:bg-[#F8F6F0]"
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
