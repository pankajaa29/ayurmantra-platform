'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Mail, Moon, Globe, Shield, Smartphone, ChevronRight } from 'lucide-react';

const settingsSections = [
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { label: 'Appointment Reminders', enabled: true },
      { label: 'Prescription Alerts', enabled: true },
      { label: 'New Messages', enabled: true },
      { label: 'Health Tips', enabled: false },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    settings: [
      { label: 'Two-Factor Authentication', enabled: false },
      { label: 'Biometric Login', enabled: true },
      { label: 'Login Notifications', enabled: true },
    ],
  },
  {
    title: 'Preferences',
    icon: Globe,
    settings: [
      { label: 'Email Notifications', enabled: true },
      { label: 'SMS Notifications', enabled: true },
      { label: 'Push Notifications', enabled: true },
    ],
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Notifications');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.title}
              onClick={() => setActiveSection(section.title)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                activeSection === section.title
                  ? 'bg-[#2D5A3D] text-white shadow-lg'
                  : 'bg-white hover:bg-[#F8F6F0] text-gray-700'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="font-medium">{section.title}</span>
              <ChevronRight className={`w-4 h-4 ml-auto ${activeSection === section.title ? 'rotate-90' : ''}`} />
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E8E2D5] p-6"
        >
          <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-6">{activeSection}</h2>
          
          {settingsSections.find(s => s.title === activeSection)?.settings.map((setting) => (
            <div key={setting.label} className="flex items-center justify-between py-4 border-b border-[#E8E2D5] last:border-0">
              <span className="text-gray-700">{setting.label}</span>
              <button
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  setting.enabled ? 'bg-[#2D5A3D]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    setting.enabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
