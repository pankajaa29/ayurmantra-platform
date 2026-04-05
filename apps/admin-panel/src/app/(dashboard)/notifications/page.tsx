'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  MessageSquare,
  Smartphone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Filter,
  Plus,
  Search,
  History,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NotificationLog {
  id: string;
  type: 'sms' | 'whatsapp' | 'email';
  recipient: string;
  message: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  sentAt: string;
  template?: string;
}

export default function NotificationsPage() {
  const [logs] = useState<NotificationLog[]>([
    {
      id: '1',
      type: 'sms',
      recipient: '+91 98765 43210',
      message: 'Hi John, your appointment is confirmed for March 15 at 10:00 AM with Dr. Rajesh Sharma.',
      status: 'delivered',
      sentAt: '2026-03-10T10:30:00Z',
      template: 'appointment_confirmation',
    },
    {
      id: '2',
      type: 'whatsapp',
      recipient: '+91 98765 43211',
      message: 'Reminder: Jane, you have an appointment tomorrow at 2:30 PM.',
      status: 'delivered',
      sentAt: '2026-03-14T09:00:00Z',
      template: 'appointment_reminder',
    },
    {
      id: '3',
      type: 'sms',
      recipient: '+91 98765 43212',
      message: 'Payment received! Thank you for your payment of ₹5,000.',
      status: 'sent',
      sentAt: '2026-03-10T14:45:00Z',
      template: 'payment_confirmation',
    },
    {
      id: '4',
      type: 'whatsapp',
      recipient: '+91 98765 43213',
      message: 'Special offer: 20% off on Panchakarma package this month!',
      status: 'failed',
      sentAt: '2026-03-12T11:00:00Z',
    },
  ]);

  const [stats] = useState({
    sms: { sent: 145, delivered: 142, failed: 3 },
    whatsapp: { sent: 89, delivered: 87, failed: 2 },
    email: { sent: 234, delivered: 230, failed: 4 },
  });

  const [bulkMode, setBulkMode] = useState(false);
  const [messageType, setMessageType] = useState<'sms' | 'whatsapp'>('sms');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setRecipient('');
      setMessage('');
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'sent':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="badge badge-green">Delivered</span>;
      case 'sent':
        return <span className="badge badge-yellow">Sent</span>;
      case 'failed':
        return <span className="badge badge-red">Failed</span>;
      default:
        return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Notifications</h1>
          <p className="text-gray-500 mt-1">Send SMS, WhatsApp messages and view delivery status</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setBulkMode(!bulkMode)}
            className={`admin-btn-outline ${bulkMode ? 'bg-[#2D5A3D] text-white border-[#2D5A3D]' : ''}`}
          >
            <Users className="w-4 h-4" />
            {bulkMode ? 'Single Mode' : 'Bulk Send'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'SMS', icon: Smartphone, stats: stats.sms, color: 'bg-blue-100 text-blue-700' },
          { label: 'WhatsApp', icon: MessageSquare, stats: stats.whatsapp, color: 'bg-green-100 text-green-700' },
          { label: 'Email', icon: Mail, stats: stats.email, color: 'bg-purple-100 text-purple-700' },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">{item.label}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xl font-bold">{item.stats.sent}</p>
                <p className="text-xs text-gray-500">Sent</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">{item.stats.delivered}</p>
                <p className="text-xs text-gray-500">Delivered</p>
              </div>
              <div>
                <p className="text-xl font-bold text-red-500">{item.stats.failed}</p>
                <p className="text-xs text-gray-500">Failed</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Message Form */}
        <div className="admin-card">
          <h3 className="font-serif text-lg font-semibold text-[#2D5A3D] mb-4">
            {bulkMode ? 'Send Bulk Message' : 'Send Message'}
          </h3>

          {/* Message Type Toggle */}
          <div className="flex rounded-lg border border-[#E8E2D5] overflow-hidden mb-4">
            <button
              onClick={() => setMessageType('sms')}
              className={`flex-1 py-2 text-sm font-medium ${
                messageType === 'sms' ? 'bg-[#2D5A3D] text-white' : 'bg-white hover:bg-[#F8F6F0]'
              }`}
            >
              <Smartphone className="w-4 h-4 inline mr-1" />
              SMS
            </button>
            <button
              onClick={() => setMessageType('whatsapp')}
              className={`flex-1 py-2 text-sm font-medium ${
                messageType === 'whatsapp' ? 'bg-[#2D5A3D] text-white' : 'bg-white hover:bg-[#F8F6F0]'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-1" />
              WhatsApp
            </button>
          </div>

          {bulkMode ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipients (comma-separated phone numbers)
              </label>
              <textarea
                rows={3}
                placeholder="+91 98765 43210, +91 98765 43211, +91 98765 43212"
                className="admin-input resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">Maximum 100 recipients per batch</p>
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Phone</label>
              <input
                type="tel"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="+91 98765 43210"
                className="admin-input"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="admin-input resize-none"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{message.length} characters</span>
              <span>{messageType === 'sms' ? 'SMS limit: 160 chars' : 'WhatsApp limit: 1000 chars'}</span>
            </div>
          </div>

          {/* Template Shortcuts */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Appointment Conf', text: 'Hi {{name}}, your appointment is confirmed for {{date}} at {{time}} with {{doctor}}.' },
                { label: 'Reminder', text: 'Reminder: {{name}}, you have an appointment tomorrow at {{time}}.' },
                { label: 'Payment Received', text: 'Payment received! Thank you for your payment of ₹{{amount}} for {{treatment}}.' },
              ].map((template) => (
                <button
                  key={template.label}
                  onClick={() => setMessage(template.text)}
                  className="px-3 py-1.5 bg-[#F8F6F0] text-[#2D5A3D] rounded-lg text-sm font-medium hover:bg-[#2D5A3D]/10"
                >
                  {template.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={sending || (!recipient && !bulkMode) || !message}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#2D5A3D] text-white rounded-xl font-medium hover:bg-[#1F4030] disabled:opacity-50"
          >
            {sending ? (
              <><span className="animate-spin">⏳</span> Sending...</>
            ) : sent ? (
              <><CheckCircle className="w-5 h-5" /> Sent!</>
            ) : (
              <><Send className="w-5 h-5" /> Send {messageType === 'sms' ? 'SMS' : 'WhatsApp'}</>
            )}
          </button>
        </div>

        {/* Recent Activity */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-[#2D5A3D]">Recent Activity</h3>
            <Link href="/notifications/history" className="text-sm text-[#D4853C] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-[#F8F6F0] rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  log.type === 'sms' ? 'bg-blue-100 text-blue-600' : 
                  log.type === 'whatsapp' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  {log.type === 'sms' ? <Smartphone className="w-4 h-4" /> : 
                   log.type === 'whatsapp' ? <MessageSquare className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{log.recipient}</p>
                    {getStatusIcon(log.status)}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{log.message}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{new Date(log.sentAt).toLocaleString()}</span>
                    {log.template && (
                      <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4853C] rounded">
                        {log.template}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Notice */}
      <div className="admin-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-green-800">SMS & WhatsApp Integration</h4>
            <p className="text-sm text-green-600 mt-1">
              Currently using mock notification service. To go live, configure your Twilio (SMS) and WhatsApp Business API credentials.
            </p>
            <div className="flex gap-4 mt-3">
              <div className="text-sm">
                <span className="font-medium text-green-700">Twilio:</span>
                <span className="text-green-600 ml-2">Not configured</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-green-700">WhatsApp API:</span>
                <span className="text-green-600 ml-2">Not configured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
