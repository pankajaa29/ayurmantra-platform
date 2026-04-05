'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  FileText,
  Video,
  ExternalLink,
} from 'lucide-react';

const faqs = [
  {
    question: 'How do I add a new patient?',
    answer: 'Go to the Patients section and click "Add New Patient". Fill in the required information including name, contact details, and medical history.',
    category: 'Patients',
  },
  {
    question: 'How do I schedule an appointment?',
    answer: 'Navigate to the Appointments section, click "New Appointment", select the patient, doctor, treatment, and preferred time slot.',
    category: 'Appointments',
  },
  {
    question: 'How do I add a new doctor?',
    answer: 'Go to Doctors & Staff section, click "Add Doctor", fill in their details, specialization, and schedule.',
    category: 'Staff',
  },
  {
    question: 'How do I manage inventory?',
    answer: 'Visit the Products section to view stock levels, add new products, and update quantities. Low stock alerts will appear automatically.',
    category: 'Inventory',
  },
  {
    question: 'How do I generate reports?',
    answer: 'Go to the Analytics section where you can view various charts and download reports in PDF or Excel format.',
    category: 'Reports',
  },
  {
    question: 'How do I backup my data?',
    answer: 'Data is automatically backed up daily. You can also create manual backups from Settings > Security > Data Backup.',
    category: 'Settings',
  },
];

const guides = [
  { title: 'Getting Started Guide', icon: FileText, description: 'Complete walkthrough for new admins' },
  { title: 'Video Tutorials', icon: Video, description: 'Step-by-step video guides' },
  { title: 'API Documentation', icon: ExternalLink, description: 'For developers and integrations' },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Help Center</h1>
        <p className="text-gray-500 mt-1">Find answers or contact support</p>
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-xl border border-[#E8E2D5] text-lg"
          />
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Phone, title: 'Call Support', info: '+91 800-123-4567', sub: 'Mon-Sat, 9AM-6PM' },
          { icon: Mail, title: 'Email Us', info: 'admin-support@ayurmantra.com', sub: '24/7 Response' },
          { icon: MessageCircle, title: 'Live Chat', info: 'Chat with support', sub: 'Usually responds in 2 min' },
        ].map((contact, index) => (
          <motion.div
            key={contact.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#2D5A3D]/10 flex items-center justify-center">
              <contact.icon className="w-7 h-7 text-[#2D5A3D]" />
            </div>
            <h3 className="font-semibold mb-1">{contact.title}</h3>
            <p className="text-[#D4853C] font-medium">{contact.info}</p>
            <p className="text-sm text-gray-500">{contact.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guides.map((guide, index) => (
          <motion.button
            key={guide.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="admin-card text-left hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-[#D4853C]/10 flex items-center justify-center mb-3">
              <guide.icon className="w-6 h-6 text-[#D4853C]" />
            </div>
            <h3 className="font-semibold mb-1">{guide.title}</h3>
            <p className="text-sm text-gray-500">{guide.description}</p>
          </motion.button>
        ))}
      </div>

      {/* FAQs */}
      <div className="admin-card overflow-hidden">
        <div className="p-6 border-b border-[#E8E2D5]">
          <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-[#E8E2D5]">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="p-6">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-start justify-between text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                    {faq.category}
                  </span>
                  <span className="font-medium text-gray-800">{faq.question}</span>
                </div>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-[#2D5A3D] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-gray-600 mt-3 pl-[72px]"
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
