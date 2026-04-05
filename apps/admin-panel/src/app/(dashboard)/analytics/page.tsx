'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '₹12.4L', change: '+18%', up: true },
  { label: 'New Patients', value: '156', change: '+24%', up: true },
  { label: 'Appointments', value: '892', change: '+12%', up: true },
  { label: 'Avg. Rating', value: '4.8', change: '+0.2', up: true },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Analytics & Reports</h1>
        <p className="text-gray-500 mt-1">Track clinic performance and key metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className={`text-sm flex items-center gap-1 mt-1 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
              {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {stat.change} this month
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="admin-card"
        >
          <h3 className="font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64 bg-[#F8F6F0] rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-2" />
              <p>Revenue chart will be displayed here</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="admin-card"
        >
          <h3 className="font-semibold mb-4">Patient Growth</h3>
          <div className="h-64 bg-[#F8F6F0] rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-2" />
              <p>Patient growth chart will be displayed here</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="admin-card"
        >
          <h3 className="font-semibold mb-4">Appointment Trends</h3>
          <div className="h-64 bg-[#F8F6F0] rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-2" />
              <p>Appointment trends chart will be displayed here</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="admin-card"
        >
          <h3 className="font-semibold mb-4">Treatment Popularity</h3>
          <div className="h-64 bg-[#F8F6F0] rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <DollarSign className="w-12 h-12 mx-auto mb-2" />
              <p>Treatment popularity chart will be displayed here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
