'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CalendarDays,
  FileText,
  Pill,
  UserCircle,
  Heart,
  ChevronRight,
  Clock,
  CheckCircle,
} from 'lucide-react';

const stats = [
  { label: 'Upcoming Appointments', value: '2', icon: CalendarDays, color: 'bg-blue-100 text-blue-600' },
  { label: 'Active Treatments', value: '1', icon: Heart, color: 'bg-green-100 text-green-600' },
  { label: 'Prescriptions', value: '3', icon: Pill, color: 'bg-orange-100 text-orange-600' },
  { label: 'Medical Records', value: '5', icon: FileText, color: 'bg-purple-100 text-purple-600' },
];

const upcomingAppointments = [
  {
    id: '1',
    treatment: 'Panchakarma Detox',
    doctor: 'Dr. Rajesh Sharma',
    date: 'Mar 15, 2026',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: '2',
    treatment: 'Follow-up Consultation',
    doctor: 'Dr. Priya Patel',
    date: 'Mar 22, 2026',
    time: '2:30 PM',
    status: 'pending',
  },
];

const recentActivities = [
  { action: 'Downloaded prescription', item: 'Ayurvedic Digestive Tonic', date: '2 days ago' },
  { action: 'Completed appointment', item: 'Initial Consultation', date: '1 week ago' },
  { action: 'Updated profile', item: 'Emergency contact', date: '2 weeks ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2D5A3D] to-[#4A7C59] rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold mb-1">Welcome back, John!</h1>
            <p className="text-white/80">Here's your wellness overview for today</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
            <Clock className="w-5 h-5" />
            <span className="text-sm">Last visit: Feb 28, 2026</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E2D5]"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-[#E8E2D5] overflow-hidden"
        >
          <div className="p-6 border-b border-[#E8E2D5] flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">
              Upcoming Appointments
            </h2>
            <Link
              href="/appointments"
              className="text-sm text-[#D4853C] hover:underline flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F6F0] hover:bg-[#E8E2D5] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#2D5A3D]/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-6 h-6 text-[#2D5A3D]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{apt.treatment}</h3>
                  <p className="text-sm text-gray-500">{apt.doctor}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-[#2D5A3D]">{apt.date}</span>
                    <span className="text-gray-400">{apt.time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      apt.status === 'confirmed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#E8E2D5]">
            <Link
              href="/book-appointment"
              className="flex items-center justify-center gap-2 w-full py-3 
                       bg-[#D4853C] text-white rounded-xl font-medium 
                       hover:bg-[#B86E2E] transition-colors"
            >
              <CalendarDays className="w-5 h-5" />
              Book New Appointment
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D5] p-6">
            <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2" />
                  <div>
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.item}</p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D5] p-6">
            <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/medical-records"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F6F0] 
                         hover:bg-[#E8E2D5] transition-colors"
              >
                <FileText className="w-5 h-5 text-[#2D5A3D]" />
                <span className="text-sm font-medium">View Records</span>
              </Link>
              <Link
                href="/prescriptions"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F6F0] 
                         hover:bg-[#E8E2D5] transition-colors"
              >
                <Pill className="w-5 h-5 text-[#2D5A3D]" />
                <span className="text-sm font-medium">Prescriptions</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F6F0] 
                         hover:bg-[#E8E2D5] transition-colors"
              >
                <UserCircle className="w-5 h-5 text-[#2D5A3D]" />
                <span className="text-sm font-medium">Edit Profile</span>
              </Link>
              <Link
                href="/messages"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F6F0] 
                         hover:bg-[#E8E2D5] transition-colors"
              >
                <div className="relative">
                  <svg className="w-5 h-5 text-[#2D5A3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <span className="text-sm font-medium">Messages</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
