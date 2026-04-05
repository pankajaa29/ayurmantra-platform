'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Clock4,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const appointments = [
  {
    id: '1',
    patient: 'John Doe',
    doctor: 'Dr. Rajesh Sharma',
    treatment: 'Panchakarma Detox',
    date: 'Mar 15, 2026',
    time: '10:00 AM',
    duration: '2 hours',
    status: 'confirmed',
    type: 'in-person',
  },
  {
    id: '2',
    patient: 'Jane Smith',
    doctor: 'Dr. Priya Patel',
    treatment: 'Consultation',
    date: 'Mar 15, 2026',
    time: '11:30 AM',
    duration: '30 min',
    status: 'in-progress',
    type: 'video',
  },
  {
    id: '3',
    patient: 'Rahul Kumar',
    doctor: 'Dr. Ananya Iyer',
    treatment: 'Abhyanga Massage',
    date: 'Mar 15, 2026',
    time: '2:00 PM',
    duration: '1 hour',
    status: 'pending',
    type: 'in-person',
  },
  {
    id: '4',
    patient: 'Priya Sharma',
    doctor: 'Dr. Rajesh Sharma',
    treatment: 'Follow-up',
    date: 'Mar 16, 2026',
    time: '9:30 AM',
    duration: '30 min',
    status: 'confirmed',
    type: 'in-person',
  },
  {
    id: '5',
    patient: 'Amit Patel',
    doctor: 'Dr. Vikram Mehta',
    treatment: 'Herbal Consultation',
    date: 'Mar 16, 2026',
    time: '3:00 PM',
    duration: '45 min',
    status: 'cancelled',
    type: 'video',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed': return <CheckCircle className="w-4 h-4" />;
    case 'pending': return <Clock4 className="w-4 h-4" />;
    case 'in-progress': return <Clock4 className="w-4 h-4" />;
    case 'cancelled': return <XCircle className="w-4 h-4" />;
    default: return null;
  }
};

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus !== 'all' && apt.status !== filterStatus) return false;
    if (searchTerm && !apt.patient.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage and schedule patient appointments</p>
        </div>
        <Link href="/appointments/new" className="admin-btn-primary">
          <Plus className="w-4 h-4" />
          New Appointment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Today', value: '12', color: 'bg-blue-100 text-blue-700' },
          { label: 'Confirmed', value: '8', color: 'bg-green-100 text-green-700' },
          { label: 'Pending', value: '3', color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Cancelled', value: '1', color: 'bg-red-100 text-red-700' },
        ].map((stat) => (
          <div key={stat.label} className="admin-card">
            <p className={`inline-block px-2 py-1 rounded text-xs font-medium ${stat.color}`}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-card flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <input type="date" className="admin-input" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="admin-btn-outline">
            <Filter className="w-4 h-4" />
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
                <th>Doctor</th>
                <th>Treatment</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="font-medium">{apt.patient}</td>
                  <td>{apt.doctor}</td>
                  <td>{apt.treatment}</td>
                  <td>
                    <div className="space-y-1">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {apt.date}
                      </p>
                      <p className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        {apt.time}
                      </p>
                    </div>
                  </td>
                  <td>{apt.duration}</td>
                  <td>
                    <span className="capitalize px-2 py-1 bg-gray-100 rounded text-xs">
                      {apt.type}
                    </span>
                  </td>
                  <td>
                    <span className={`badge flex items-center gap-1 ${
                      apt.status === 'confirmed' ? 'badge-green' :
                      apt.status === 'pending' ? 'badge-yellow' :
                      apt.status === 'in-progress' ? 'badge-blue' : 'badge-red'
                    }`}>
                      {getStatusIcon(apt.status)}
                      {apt.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      {apt.status === 'pending' && (
                        <button className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
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
            Showing {filteredAppointments.length} appointments
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 bg-[#2D5A3D] text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-2 border border-[#E8E2D5] rounded-lg text-sm hover:bg-[#F8F6F0]">2</button>
            <button className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
