'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  User,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';

const appointments = [
  {
    id: '1',
    treatment: 'Panchakarma Detox Program',
    doctor: 'Dr. Rajesh Sharma',
    date: 'Mar 15, 2026',
    time: '10:00 AM - 12:00 PM',
    status: 'upcoming',
    type: 'In-Person',
    location: 'Main Clinic',
  },
  {
    id: '2',
    treatment: 'Follow-up Consultation',
    doctor: 'Dr. Priya Patel',
    date: 'Mar 22, 2026',
    time: '2:30 PM - 3:00 PM',
    status: 'upcoming',
    type: 'Video Call',
    location: 'Online',
  },
  {
    id: '3',
    treatment: 'Initial Consultation',
    doctor: 'Dr. Rajesh Sharma',
    date: 'Feb 28, 2026',
    time: '11:00 AM - 12:00 PM',
    status: 'completed',
    type: 'In-Person',
    location: 'Main Clinic',
  },
  {
    id: '4',
    treatment: 'Abhyanga Massage Therapy',
    doctor: 'Dr. Ananya Iyer',
    date: 'Feb 15, 2026',
    time: '3:00 PM - 4:00 PM',
    status: 'completed',
    type: 'In-Person',
    location: 'Wellness Center',
  },
  {
    id: '5',
    treatment: 'Ayurvedic Facial',
    doctor: 'Dr. Priya Patel',
    date: 'Jan 20, 2026',
    time: '10:30 AM - 11:30 AM',
    status: 'cancelled',
    type: 'In-Person',
    location: 'Main Clinic',
  },
];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    if (filter !== 'all' && apt.status !== filter) return false;
    if (searchTerm && !apt.treatment.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">My Appointments</h1>
          <p className="text-gray-500 mt-1">View and manage your consultation history</p>
        </div>
        <Link
          href="/book-appointment"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4853C] text-white 
                   font-medium rounded-xl hover:bg-[#B86E2E] transition-colors shadow-lg"
        >
          <CalendarDays className="w-5 h-5" />
          Book New Appointment
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E2D5] 
                      flex flex-col md:flex-row gap-4">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          {['all', 'upcoming', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-[#2D5A3D] text-white'
                  : 'bg-[#F8F6F0] text-gray-600 hover:bg-[#E8E2D5]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-lg border border-[#E8E2D5] 
                     focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E8E2D5]">
            <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold text-gray-700 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500 mb-4">You don't have any {filter !== 'all' ? filter : ''} appointments.</p>
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D5A3D] text-white 
                       font-medium rounded-xl hover:bg-[#1F4030] transition-colors"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          filteredAppointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E2D5] 
                       hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Date Box */}
                <div className="flex-shrink-0 w-20 h-20 bg-[#2D5A3D]/5 rounded-xl 
                              flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-gray-500 uppercase">
                    {new Date(apt.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-bold text-[#2D5A3D]">
                    {new Date(apt.date).getDate()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(apt.date).getFullYear()}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{apt.treatment}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <User className="w-4 h-4" />
                        <span>{apt.doctor}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${getStatusColor(apt.status)}`}>
                      {getStatusIcon(apt.status)}
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#D4853C]" />
                      {apt.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#D4853C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {apt.location}
                    </span>
                    <span className="px-2 py-0.5 bg-[#F8F6F0] rounded text-xs">
                      {apt.type}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-2">
                  {apt.status === 'upcoming' && (
                    <>
                      <button className="px-4 py-2 bg-[#2D5A3D] text-white rounded-lg 
                                       text-sm font-medium hover:bg-[#1F4030] transition-colors">
                        Join
                      </button>
                      <button className="px-4 py-2 border border-red-300 text-red-600 
                                       rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                        Cancel
                      </button>
                    </>
                  )}
                  {apt.status === 'completed' && (
                    <button className="px-4 py-2 bg-[#F8F6F0] text-gray-700 rounded-lg 
                                     text-sm font-medium hover:bg-[#E8E2D5] transition-colors">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg border border-[#E8E2D5] hover:bg-[#F8F6F0] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg border border-[#E8E2D5] hover:bg-[#F8F6F0] transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
