'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  CalendarDays,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  ChevronRight,
  Plus,
} from 'lucide-react';

const stats = [
  { label: 'Total Patients', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-100 text-blue-600' },
  { label: 'Today\'s Appointments', value: '24', change: '+5%', icon: CalendarDays, color: 'bg-green-100 text-green-600' },
  { label: 'Revenue (Month)', value: '₹2.4L', change: '+18%', icon: DollarSign, color: 'bg-amber-100 text-amber-600' },
  { label: 'Active Treatments', value: '89', change: '+8%', icon: Activity, color: 'bg-purple-100 text-purple-600' },
];

const todayAppointments = [
  { id: '1', patient: 'John Doe', treatment: 'Panchakarma', time: '10:00 AM', doctor: 'Dr. Rajesh Sharma', status: 'confirmed' },
  { id: '2', patient: 'Jane Smith', treatment: 'Consultation', time: '11:30 AM', doctor: 'Dr. Priya Patel', status: 'in-progress' },
  { id: '3', patient: 'Mike Johnson', treatment: 'Abhyanga', time: '2:00 PM', doctor: 'Dr. Ananya Iyer', status: 'pending' },
  { id: '4', patient: 'Sarah Williams', treatment: 'Follow-up', time: '3:30 PM', doctor: 'Dr. Rajesh Sharma', status: 'confirmed' },
];

const recentPatients = [
  { id: '1', name: 'Rahul Kumar', phone: '+91 98765 43210', joined: 'Today', visits: 1 },
  { id: '2', name: 'Priya Sharma', phone: '+91 98765 43211', joined: 'Yesterday', visits: 3 },
  { id: '3', name: 'Amit Patel', phone: '+91 98765 43212', joined: '2 days ago', visits: 5 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/appointments/new" className="admin-btn-secondary">
            <Plus className="w-4 h-4" />
            New Appointment
          </Link>
          <Link href="/patients/new" className="admin-btn-primary">
            <Plus className="w-4 h-4" />
            Add Patient
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change} this month
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 admin-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">
              Today&apos;s Appointments
            </h2>
            <Link href="/appointments" className="text-sm text-[#D4853C] hover:underline flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Treatment</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td className="font-medium">{apt.patient}</td>
                    <td>{apt.treatment}</td>
                    <td className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {apt.time}
                    </td>
                    <td>{apt.doctor}</td>
                    <td>
                      <span className={`badge ${
                        apt.status === 'confirmed' ? 'badge-green' :
                        apt.status === 'in-progress' ? 'badge-blue' : 'badge-yellow'
                      }`}>
                        {apt.status.replace('-', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="admin-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">
              Recent Patients
            </h2>
            <Link href="/patients" className="text-sm text-[#D4853C] hover:underline flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8F6F0] transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#2D5A3D]/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-[#2D5A3D]">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{patient.joined}</p>
                  <p className="text-xs text-[#D4853C]">{patient.visits} visits</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="admin-card bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] text-white"
        >
          <h3 className="font-medium mb-2">Weekly Revenue</h3>
          <p className="text-3xl font-bold">₹68,450</p>
          <p className="text-sm text-white/70 mt-1">+15% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="admin-card bg-gradient-to-br from-[#D4853C] to-[#B86E2E] text-white"
        >
          <h3 className="font-medium mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-white/70 mt-1">Appointments to confirm</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="admin-card bg-gradient-to-br from-purple-600 to-purple-800 text-white"
        >
          <h3 className="font-medium mb-2">New Messages</h3>
          <p className="text-3xl font-bold">8</p>
          <p className="text-sm text-white/70 mt-1">Patient inquiries</p>
        </motion.div>
      </div>
    </div>
  );
}
