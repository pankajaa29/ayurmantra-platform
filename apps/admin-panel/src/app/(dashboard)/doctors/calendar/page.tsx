'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  User,
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  appointment?: {
    patientName: string;
    treatment: string;
    status: 'confirmed' | 'pending' | 'completed';
  };
}

interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

const doctors: Doctor[] = [
  { id: '1', name: 'Dr. Rajesh Sharma', specialization: 'Panchakarma', avatar: 'RS' },
  { id: '2', name: 'Dr. Priya Patel', specialization: 'Ayurvedic Physician', avatar: 'PP' },
  { id: '3', name: 'Dr. Ananya Iyer', specialization: 'Wellness Consultant', avatar: 'AI' },
];

const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', 
                      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  
  startTimes.forEach((time, index) => {
    const hasAppointment = Math.random() > 0.7;
    slots.push({
      id: `${date}-${time}`,
      time,
      available: !hasAppointment,
      appointment: hasAppointment ? {
        patientName: ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.floor(Math.random() * 3)],
        treatment: ['Panchakarma', 'Abhyanga', 'Shirodhara'][Math.floor(Math.random() * 3)],
        status: ['confirmed', 'pending', 'completed'][Math.floor(Math.random() * 3)] as any,
      } : undefined,
    });
  });
  
  return slots;
};

export default function DoctorCalendarPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(doctors[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedule, setSchedule] = useState<DaySchedule | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [showSlotModal, setShowSlotModal] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, [selectedDoctor, currentDate]);

  const fetchSchedule = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dateStr = currentDate.toISOString().split('T')[0];
    setSchedule({
      date: dateStr,
      slots: generateTimeSlots(dateStr),
    });
    setLoading(false);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/doctors" className="p-2 hover:bg-[#F8F6F0] rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Doctor Calendar</h1>
            <p className="text-gray-500 mt-1">Manage doctor schedules and availability</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDoctor.id}
            onChange={(e) => setSelectedDoctor(doctors.find(d => d.id === e.target.value) || doctors[0])}
            className="admin-input"
          >
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>

          <div className="flex rounded-lg border border-[#E8E2D5] overflow-hidden">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'day' ? 'bg-[#2D5A3D] text-white' : 'bg-white hover:bg-[#F8F6F0]'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'week' ? 'bg-[#2D5A3D] text-white' : 'bg-white hover:bg-[#F8F6F0]'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Doctor Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card flex items-center gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                      flex items-center justify-center text-white text-xl font-bold">
          {selectedDoctor.avatar}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
          <p className="text-[#D4853C]">{selectedDoctor.specialization}</p>
        </div>
        <div className="ml-auto flex gap-4 text-sm">
          <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
            <p className="font-bold text-green-600">
              {schedule?.slots.filter(s => s.available).length || 0}
            </p>
            <p className="text-gray-500 text-xs">Available</p>
          </div>
          <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-600">
              {schedule?.slots.filter(s => s.appointment).length || 0}
            </p>
            <p className="text-gray-500 text-xs">Booked</p>
          </div>
        </div>
      </motion.div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateDate('prev')}
            className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0] font-medium"
          >
            Today
          </button>
          <button
            onClick={() => navigateDate('next')}
            className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <h2 className="font-semibold text-lg">{formatDate(currentDate)}</h2>
      </div>

      {/* Time Slots Grid */}
      {loading ? (
        <div className="admin-card p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#2D5A3D] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading schedule...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="admin-card"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {schedule?.slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setShowSlotModal(slot)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  slot.available
                    ? 'border-green-200 bg-green-50 hover:bg-green-100'
                    : slot.appointment
                    ? getStatusColor(slot.appointment.status)
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{slot.time}</span>
                </div>
                
                {slot.appointment ? (
                  <div>
                    <p className="font-medium text-sm">{slot.appointment.patientName}</p>
                    <p className="text-xs opacity-70">{slot.appointment.treatment}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs ${
                      slot.appointment.status === 'confirmed' ? 'bg-green-500 text-white' :
                      slot.appointment.status === 'pending' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {slot.appointment.status}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-green-600 font-medium">Available</p>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Slot Modal */}
      {showSlotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-[#2D5A3D]">
                {showSlotModal.time} Slot
              </h3>
              <button
                onClick={() => setShowSlotModal(null)}
                className="p-2 hover:bg-[#F8F6F0] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showSlotModal.appointment ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#F8F6F0] rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-[#2D5A3D] flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{showSlotModal.appointment.patientName}</p>
                    <p className="text-sm text-gray-500">{showSlotModal.appointment.treatment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    getStatusColor(showSlotModal.appointment.status)
                  }`}>
                    {showSlotModal.appointment.status.charAt(0).toUpperCase() + showSlotModal.appointment.status.slice(1)}
                  </span>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-2 border border-[#E8E2D5] rounded-lg font-medium hover:bg-[#F8F6F0]">
                    Reschedule
                  </button>
                  <button className="flex-1 py-2 bg-[#2D5A3D] text-white rounded-lg font-medium hover:bg-[#1F4030]">
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">This slot is available</span>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setShowSlotModal(null)}
                    className="flex-1 py-2 border border-[#E8E2D5] rounded-lg font-medium hover:bg-[#F8F6F0]"
                  >
                    Close
                  </button>
                  <Link
                    href="http://localhost:2700/book-appointment"
                    className="flex-1 py-2 bg-[#2D5A3D] text-white rounded-lg font-medium text-center hover:bg-[#1F4030]"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
