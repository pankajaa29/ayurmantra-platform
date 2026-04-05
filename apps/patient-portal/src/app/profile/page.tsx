'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit2, CheckCircle, Camera } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    bloodGroup: 'O+',
    address: '123 Wellness Lane',
    city: 'Kerala',
    state: 'Kerala',
    pincode: '682001',
    emergencyContact: '+91 98765 43211',
    allergies: 'None',
    medicalHistory: 'No significant medical history',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and health details</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
            isEditing
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-[#D4853C] text-white hover:bg-[#B86E2E]'
          }`}
        >
          {isEditing ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8E2D5] p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                            flex items-center justify-center text-white text-4xl">
                <User className="w-16 h-16" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#D4853C] rounded-full 
                              flex items-center justify-center text-white shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <h2 className="font-serif text-xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-500 text-sm mb-4">Patient ID: #P12345</p>
            
            <div className="flex justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {formData.bloodGroup}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full capitalize">
                {formData.gender}
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E8E2D5] space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-[#D4853C]" />
                <span className="text-sm">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-[#D4853C]" />
                <span className="text-sm">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-[#D4853C]" />
                <span className="text-sm">{formData.city}, {formData.state}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-[#2D5A3D] to-[#4A7C59] rounded-2xl p-6 text-white mt-6">
            <h3 className="font-medium mb-4">Health Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Last Visit</span>
                <span>Feb 28, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Total Visits</span>
                <span>12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Active Treatments</span>
                <span>1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Member Since</span>
                <span>Jan 2025</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8E2D5] p-6">
            <h3 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>

              {/* Personal Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Address */}
            <h3 className="font-serif text-xl font-semibold text-[#2D5A3D] mt-8 mb-6">
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none
                           disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Medical Info */}
            <h3 className="font-serif text-xl font-semibold text-[#2D5A3D] mt-8 mb-6">
              Medical Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  disabled={!isEditing}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none resize-none
                           disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                           focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none resize-none
                           disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
