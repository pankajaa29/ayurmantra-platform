'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Star,
  Calendar,
  Clock,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const doctors = [
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    specialization: 'Panchakarma Specialist',
    experience: '15 years',
    rating: 4.9,
    patients: 245,
    status: 'active',
    schedule: 'Mon-Sat',
    image: 'RS',
  },
  {
    id: '2',
    name: 'Dr. Priya Patel',
    specialization: 'Ayurvedic Physician',
    experience: '12 years',
    rating: 4.8,
    patients: 189,
    status: 'active',
    schedule: 'Mon-Fri',
    image: 'PP',
  },
  {
    id: '3',
    name: 'Dr. Ananya Iyer',
    specialization: 'Wellness Consultant',
    experience: '10 years',
    rating: 4.9,
    patients: 156,
    status: 'on-leave',
    schedule: 'Tue-Sat',
    image: 'AI',
  },
  {
    id: '4',
    name: 'Dr. Vikram Mehta',
    specialization: 'Herbal Medicine Expert',
    experience: '8 years',
    rating: 4.7,
    patients: 98,
    status: 'active',
    schedule: 'Mon-Sat',
    image: 'VM',
  },
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Doctors & Staff</h1>
          <p className="text-gray-500 mt-1">Manage doctors, their schedules, and availability</p>
        </div>
        <Link href="/doctors/new" className="admin-btn-primary">
          <Plus className="w-4 h-4" />
          Add Doctor
        </Link>
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                              flex items-center justify-center text-white font-semibold">
                  {doctor.image}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                  <p className="text-sm text-[#D4853C]">{doctor.specialization}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-[#F8F6F0] rounded-lg">
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#F8F6F0] rounded-lg p-3">
                <p className="text-xs text-gray-500">Experience</p>
                <p className="font-semibold text-sm">{doctor.experience}</p>
              </div>
              <div className="bg-[#F8F6F0] rounded-lg p-3">
                <p className="text-xs text-gray-500">Patients</p>
                <p className="font-semibold text-sm">{doctor.patients}</p>
              </div>
            </div>

            {/* Rating & Schedule */}
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-gray-400">rating</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-4 h-4" />
                {doctor.schedule}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
              <span className={`badge ${
                doctor.status === 'active' ? 'badge-green' :
                doctor.status === 'on-leave' ? 'badge-yellow' : 'badge-red'
              }`}>
                {doctor.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                {doctor.status === 'on-leave' && <Clock className="w-3 h-3 mr-1" />}
                {doctor.status === 'inactive' && <XCircle className="w-3 h-3 mr-1" />}
                {doctor.status.replace('-', ' ')}
              </span>
              <Link href={`/doctors/${doctor.id}`} className="text-sm text-[#D4853C] hover:underline">
                View Schedule
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
