'use client';

import { motion } from 'framer-motion';
import { Pill, Download, Calendar, Clock, FileText, Search } from 'lucide-react';
import { useState } from 'react';

const prescriptions = [
  {
    id: '1',
    medication: 'Triphala Churna',
    dosage: '1 tsp before bed',
    duration: '30 days',
    prescribedBy: 'Dr. Rajesh Sharma',
    date: 'Feb 28, 2026',
    status: 'active',
    instructions: 'Take with warm water',
  },
  {
    id: '2',
    medication: 'Ashwagandha Capsules',
    dosage: '2 capsules twice daily',
    duration: '60 days',
    prescribedBy: 'Dr. Priya Patel',
    date: 'Jan 15, 2026',
    status: 'active',
    instructions: 'After meals with milk',
  },
  {
    id: '3',
    medication: 'Digestive Tonic',
    dosage: '15ml twice daily',
    duration: '15 days',
    prescribedBy: 'Dr. Rajesh Sharma',
    date: 'Dec 10, 2025',
    status: 'completed',
    instructions: 'Before meals',
  },
];

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrescriptions = prescriptions.filter(p =>
    p.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">My Prescriptions</h1>
        <p className="text-gray-500 mt-1">View and download your Ayurvedic medications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Active', value: '2', color: 'bg-green-100 text-green-700' },
          { label: 'Completed', value: '1', color: 'bg-blue-100 text-blue-700' },
          { label: 'Total', value: '3', color: 'bg-[#D4AF37]/20 text-[#D4853C]' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E2D5]"
          >
            <p className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${stat.color}`}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E2D5]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E8E2D5] 
                     focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((rx, index) => (
          <motion.div
            key={rx.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E2D5] 
                     hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center
                             ${rx.status === 'active' ? 'bg-green-100' : 'bg-blue-100'}`}>
                <Pill className={`w-7 h-7 ${rx.status === 'active' ? 'text-green-600' : 'text-blue-600'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{rx.medication}</h3>
                    <p className="text-sm text-gray-500">Prescribed by {rx.prescribedBy}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                   ${rx.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {rx.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                  <div className="bg-[#F8F6F0] rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Dosage</p>
                    <p className="font-medium text-sm">{rx.dosage}</p>
                  </div>
                  <div className="bg-[#F8F6F0] rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="font-medium text-sm">{rx.duration}</p>
                  </div>
                  <div className="bg-[#F8F6F0] rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Prescribed</p>
                    <p className="font-medium text-sm">{rx.date}</p>
                  </div>
                  <div className="bg-[#F8F6F0] rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Instructions</p>
                    <p className="font-medium text-sm">{rx.instructions}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#2D5A3D] text-white 
                                   rounded-lg text-sm font-medium hover:bg-[#1F4030] transition-colors">
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E2D5] 
                                   text-gray-700 rounded-lg text-sm font-medium 
                                   hover:bg-[#F8F6F0] transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
