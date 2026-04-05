'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  FileText,
  Edit,
  Trash2,
} from 'lucide-react';

const patients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    age: 35,
    gender: 'Male',
    lastVisit: 'Feb 28, 2026',
    totalVisits: 5,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+91 98765 43211',
    age: 28,
    gender: 'Female',
    lastVisit: 'Mar 5, 2026',
    totalVisits: 3,
    status: 'active',
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    email: 'rahul.k@email.com',
    phone: '+91 98765 43212',
    age: 42,
    gender: 'Male',
    lastVisit: 'Jan 15, 2026',
    totalVisits: 8,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    email: 'priya.s@email.com',
    phone: '+91 98765 43213',
    age: 31,
    gender: 'Female',
    lastVisit: 'Mar 10, 2026',
    totalVisits: 2,
    status: 'active',
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPatients = patients.filter((patient) => {
    if (filterStatus !== 'all' && patient.status !== filterStatus) return false;
    if (searchTerm && !patient.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Patients</h1>
          <p className="text-gray-500 mt-1">Manage patient records and appointments</p>
        </div>
        <Link href="/patients/new" className="admin-btn-primary">
          <Plus className="w-4 h-4" />
          Add New Patient
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-card flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="admin-btn-outline">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Contact</th>
                <th>Age/Gender</th>
                <th>Last Visit</th>
                <th>Visits</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2D5A3D]/10 flex items-center justify-center">
                        <span className="font-medium text-[#2D5A3D]">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-gray-500">ID: #{patient.id.padStart(5, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <p className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {patient.phone}
                      </p>
                      <p className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {patient.email}
                      </p>
                    </div>
                  </td>
                  <td>{patient.age} / {patient.gender}</td>
                  <td>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {patient.lastVisit}
                    </span>
                  </td>
                  <td>{patient.totalVisits}</td>
                  <td>
                    <span className={`badge ${patient.status === 'active' ? 'badge-green' : 'badge-yellow'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link href={`/patients/${patient.id}`} className="p-2 hover:bg-[#F8F6F0] rounded-lg transition-colors">
                        <FileText className="w-4 h-4 text-gray-500" />
                      </Link>
                      <Link href={`/patients/${patient.id}/edit`} className="p-2 hover:bg-[#F8F6F0] rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Link>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
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
            Showing {filteredPatients.length} of {patients.length} patients
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-[#E8E2D5] rounded-lg text-sm hover:bg-[#F8F6F0]">
              Previous
            </button>
            <button className="px-3 py-1.5 border border-[#E8E2D5] rounded-lg text-sm hover:bg-[#F8F6F0]">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
