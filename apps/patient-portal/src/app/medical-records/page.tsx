'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, User, Search, Filter } from 'lucide-react';

const records = [
  {
    id: '1',
    type: 'prescription',
    title: 'Ayurvedic Digestive Tonic',
    doctor: 'Dr. Rajesh Sharma',
    date: 'Feb 28, 2026',
    description: 'Prescription for digestive health improvement',
    files: ['prescription_feb28.pdf'],
  },
  {
    id: '2',
    type: 'report',
    title: 'Prakriti Analysis Report',
    doctor: 'Dr. Rajesh Sharma',
    date: 'Feb 28, 2026',
    description: 'Complete dosha analysis and constitution assessment',
    files: ['prakriti_report.pdf'],
  },
  {
    id: '3',
    type: 'prescription',
    title: 'Stress Relief Herbal Formula',
    doctor: 'Dr. Priya Patel',
    date: 'Jan 15, 2026',
    description: 'Herbal supplement for stress and anxiety management',
    files: ['prescription_jan15.pdf'],
  },
  {
    id: '4',
    type: 'treatment',
    title: 'Panchakarma Treatment Plan',
    doctor: 'Dr. Rajesh Sharma',
    date: 'Jan 10, 2026',
    description: '5-day detox program schedule and guidelines',
    files: ['panchakarma_plan.pdf', 'diet_chart.pdf'],
  },
  {
    id: '5',
    type: 'report',
    title: 'Blood Test Results',
    doctor: 'Lab Services',
    date: 'Dec 20, 2025',
    description: 'Complete blood count and lipid profile',
    files: ['blood_test_dec20.pdf'],
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'prescription':
      return <span className="text-2xl">💊</span>;
    case 'report':
      return <span className="text-2xl">📊</span>;
    case 'treatment':
      return <span className="text-2xl">🧘</span>;
    default:
      return <FileText className="w-6 h-6 text-[#2D5A3D]" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'prescription':
      return 'bg-blue-100 text-blue-700';
    case 'report':
      return 'bg-green-100 text-green-700';
    case 'treatment':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function MedicalRecordsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter((record) => {
    if (filter !== 'all' && record.type !== filter) return false;
    if (searchTerm && !record.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Medical Records</h1>
        <p className="text-gray-500 mt-1">Access your prescriptions, reports, and treatment plans</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Records', value: records.length.toString(), icon: FileText },
          { label: 'Prescriptions', value: records.filter(r => r.type === 'prescription').length.toString(), icon: '💊' },
          { label: 'Reports', value: records.filter(r => r.type === 'report').length.toString(), icon: '📊' },
          { label: 'Treatments', value: records.filter(r => r.type === 'treatment').length.toString(), icon: '🧘' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E2D5]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2D5A3D]/10 flex items-center justify-center">
                {typeof stat.icon === 'string' ? (
                  <span className="text-xl">{stat.icon}</span>
                ) : (
                  <stat.icon className="w-5 h-5 text-[#2D5A3D]" />
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E2D5] 
                      flex flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          {['all', 'prescription', 'report', 'treatment'].map((f) => (
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
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-lg border border-[#E8E2D5] 
                     focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
          />
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E2D5] 
                     hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center 
                             ${getTypeColor(record.type)}`}>
                {getTypeIcon(record.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{record.title}</h3>
                    <p className="text-sm text-gray-500">{record.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                   ${getTypeColor(record.type)}`}>
                    {record.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#D4853C]" />
                    {record.doctor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D4853C]" />
                    {record.date}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {record.files.map((file, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 bg-[#F8F6F0] rounded-lg 
                               text-sm text-[#2D5A3D] hover:bg-[#E8E2D5] transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="max-w-[200px] truncate">{file}</span>
                      <Download className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
