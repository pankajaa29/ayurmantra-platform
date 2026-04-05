'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  CreditCard,
  Bell,
  Shield,
  Save,
  CheckCircle,
  Upload,
} from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: Building2 },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'business', label: 'Business Hours', icon: Clock },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    clinicName: 'AyurMantra Wellness Center',
    tagline: 'Ancient Wisdom, Modern Wellness',
    logo: null as File | null,
    favicon: null as File | null,
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    language: 'en',
    currency: 'INR',
  });

  const [contactSettings, setContactSettings] = useState({
    email: 'info@ayurmantra.com',
    phone: '+91 800-123-4567',
    alternatePhone: '+91 800-123-4568',
    address: '123 Wellness Lane, Ayurveda Nagar',
    city: 'Kerala',
    state: 'Kerala',
    country: 'India',
    pincode: '682001',
    googleMapsUrl: 'https://maps.google.com/?q=ayurmantra',
  });

  const [businessSettings, setBusinessSettings] = useState({
    monday: { open: '09:00', close: '20:00', isOpen: true },
    tuesday: { open: '09:00', close: '20:00', isOpen: true },
    wednesday: { open: '09:00', close: '20:00', isOpen: true },
    thursday: { open: '09:00', close: '20:00', isOpen: true },
    friday: { open: '09:00', close: '20:00', isOpen: true },
    saturday: { open: '10:00', close: '18:00', isOpen: true },
    sunday: { open: '10:00', close: '14:00', isOpen: false },
  });

  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'INR',
    currencySymbol: '₹',
    taxRate: 18,
    taxName: 'GST',
    enableOnlinePayment: true,
    enableCash: true,
    enableCard: true,
    enableUPI: true,
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: 'ayurmantra@upi',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: false,
    newAppointmentAlert: true,
    cancellationAlert: true,
    dailySummary: true,
    marketingEmails: false,
    reminderBeforeHours: 24,
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Settings</h1>
          <p className="text-gray-500 mt-1">Configure clinic settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary"
        >
          {saving ? (
            <><span className="animate-spin">⏳</span> Saving...</>
          ) : saved ? (
            <><CheckCircle className="w-4 h-4" /> Saved!</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#2D5A3D] text-white shadow-lg'
                    : 'bg-white border border-[#E8E2D5] text-gray-600 hover:bg-[#F8F6F0]'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="admin-card"
          >
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                    <input
                      type="text"
                      value={generalSettings.clinicName}
                      onChange={(e) => setGeneralSettings({...generalSettings, clinicName: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                    <input
                      type="text"
                      value={generalSettings.tagline}
                      onChange={(e) => setGeneralSettings({...generalSettings, tagline: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                      className="admin-input"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="Asia/Dubai">Asia/Dubai</option>
                      <option value="Asia/Singapore">Asia/Singapore</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                      className="admin-input"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                      <option value="AED">UAE Dirham (د.إ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      value={generalSettings.dateFormat}
                      onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                      className="admin-input"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                    <select
                      value={generalSettings.timeFormat}
                      onChange={(e) => setGeneralSettings({...generalSettings, timeFormat: e.target.value})}
                      className="admin-input"
                    >
                      <option value="12h">12-hour (AM/PM)</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>
                </div>

                {/* Logo Upload */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Logo</label>
                  <div className="border-2 border-dashed border-[#E8E2D5] rounded-xl p-6 text-center hover:border-[#2D5A3D] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload logo (PNG, JPG, SVG)</p>
                    <p className="text-xs text-gray-400">Recommended: 200x60px</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={contactSettings.email}
                        onChange={(e) => setContactSettings({...contactSettings, email: e.target.value})}
                        className="admin-input pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={contactSettings.phone}
                        onChange={(e) => setContactSettings({...contactSettings, phone: e.target.value})}
                        className="admin-input pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                    <input
                      type="tel"
                      value={contactSettings.alternatePhone}
                      onChange={(e) => setContactSettings({...contactSettings, alternatePhone: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={contactSettings.address}
                        onChange={(e) => setContactSettings({...contactSettings, address: e.target.value})}
                        className="admin-input pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={contactSettings.city}
                      onChange={(e) => setContactSettings({...contactSettings, city: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={contactSettings.state}
                      onChange={(e) => setContactSettings({...contactSettings, state: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                    <input
                      type="text"
                      value={contactSettings.pincode}
                      onChange={(e) => setContactSettings({...contactSettings, pincode: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      value={contactSettings.country}
                      onChange={(e) => setContactSettings({...contactSettings, country: e.target.value})}
                      className="admin-input"
                    >
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={contactSettings.googleMapsUrl}
                        onChange={(e) => setContactSettings({...contactSettings, googleMapsUrl: e.target.value})}
                        className="admin-input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Hours */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Business Hours</h2>
                
                <div className="space-y-4">
                  {Object.entries(businessSettings).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-4 p-4 bg-[#F8F6F0] rounded-xl">
                      <div className="w-32">
                        <span className="font-medium capitalize">{day}</span>
                      </div>
                      
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            [day]: {...hours, isOpen: e.target.checked}
                          })}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">Open</span>
                      </label>

                      {hours.isOpen && (
                        <div className="flex items-center gap-3 ml-4">
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => setBusinessSettings({
                              ...businessSettings,
                              [day]: {...hours, open: e.target.value}
                            })}
                            className="admin-input w-32"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => setBusinessSettings({
                              ...businessSettings,
                              [day]: {...hours, close: e.target.value}
                            })}
                            className="admin-input w-32"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Payment Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Name</label>
                    <input
                      type="text"
                      value={paymentSettings.taxName}
                      onChange={(e) => setPaymentSettings({...paymentSettings, taxName: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
                      className="admin-input"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Payment Methods</label>
                    <div className="space-y-3">
                      {[
                        { key: 'enableCash', label: 'Cash Payment' },
                        { key: 'enableCard', label: 'Credit/Debit Card' },
                        { key: 'enableUPI', label: 'UPI Payment' },
                        { key: 'enableOnlinePayment', label: 'Online Payment (Razorpay/Stripe)' },
                      ].map((method) => (
                        <label key={method.key} className="flex items-center gap-3 p-3 bg-[#F8F6F0] rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={paymentSettings[method.key as keyof typeof paymentSettings] as boolean}
                            onChange={(e) => setPaymentSettings({...paymentSettings, [method.key]: e.target.checked})}
                            className="rounded border-gray-300 w-5 h-5"
                          />
                          <span>{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                    <input
                      type="text"
                      value={paymentSettings.upiId}
                      onChange={(e) => setPaymentSettings({...paymentSettings, upiId: e.target.value})}
                      placeholder="yourname@upi"
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                    { key: 'whatsappNotifications', label: 'WhatsApp Notifications', desc: 'Receive notifications via WhatsApp' },
                    { key: 'newAppointmentAlert', label: 'New Appointment Alert', desc: 'Notify when new appointment is booked' },
                    { key: 'cancellationAlert', label: 'Cancellation Alert', desc: 'Notify when appointment is cancelled' },
                    { key: 'dailySummary', label: 'Daily Summary', desc: 'Receive daily appointment summary' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Send promotional emails to patients' },
                  ].map((setting) => (
                    <label key={setting.key} className="flex items-start gap-4 p-4 bg-[#F8F6F0] rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                        onChange={(e) => setNotificationSettings({...notificationSettings, [setting.key]: e.target.checked})}
                        className="rounded border-gray-300 w-5 h-5 mt-0.5"
                      />
                      <div>
                        <p className="font-medium">{setting.label}</p>
                        <p className="text-sm text-gray-500">{setting.desc}</p>
                      </div>
                    </label>
                  ))}

                  <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Send Reminder Before (hours)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="72"
                      value={notificationSettings.reminderBeforeHours}
                      onChange={(e) => setNotificationSettings({...notificationSettings, reminderBeforeHours: parseInt(e.target.value)})}
                      className="admin-input w-32"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[#F8F6F0] rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 bg-[#2D5A3D] text-white rounded-lg text-sm font-medium">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8F6F0] rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Password Policy</p>
                        <p className="text-sm text-gray-500">Minimum 8 characters, 1 uppercase, 1 number</p>
                      </div>
                      <span className="text-green-600 text-sm font-medium">Active</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8F6F0] rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-gray-500">Automatically logout after 30 minutes</p>
                      </div>
                      <select className="admin-input w-40">
                        <option>15 minutes</option>
                        <option selected>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8F6F0] rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Login Attempts</p>
                        <p className="text-sm text-gray-500">Lock account after 5 failed attempts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D5A3D]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
