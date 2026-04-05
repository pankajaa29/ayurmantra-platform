'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Phone, Mail, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment by navigating to "Book Appointment" in the sidebar menu. Select your treatment, choose a doctor, pick a date and time, and confirm your booking.',
  },
  {
    question: 'How can I view my medical records?',
    answer: 'All your medical records, prescriptions, and test results are available under the "Medical Records" section. You can download any document as a PDF.',
  },
  {
    question: 'Can I reschedule my appointment?',
    answer: 'Yes, you can reschedule appointments up to 24 hours before the scheduled time. Go to "My Appointments" and click on the reschedule button for the appointment you want to change.',
  },
  {
    question: 'How do I contact my doctor?',
    answer: 'You can message your doctor directly through the "Messages" section. You can also request video consultations if needed.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption and security protocols. Your health information is protected under HIPAA guidelines and our privacy policy.',
  },
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
        <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Help & Support</h1>
        <p className="text-gray-500 mt-1">Find answers to common questions or contact us</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D5] p-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-xl border border-[#E8E2D5] 
                     focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none text-lg"
          />
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Phone, title: 'Call Us', info: '+91 800-123-4567', sub: 'Mon-Sat, 9AM-6PM' },
          { icon: Mail, title: 'Email Us', info: 'support@ayurmantra.com', sub: '24/7 Support' },
          { icon: MessageCircle, title: 'Live Chat', info: 'Chat with us', sub: 'Usually responds in 5 min' },
        ].map((contact, index) => (
          <motion.div
            key={contact.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E2D5] text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#2D5A3D]/10 
                          flex items-center justify-center">
              <contact.icon className="w-7 h-7 text-[#2D5A3D]" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{contact.title}</h3>
            <p className="text-[#D4853C] font-medium">{contact.info}</p>
            <p className="text-sm text-gray-500">{contact.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D5] overflow-hidden">
        <div className="p-6 border-b border-[#E8E2D5]">
          <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-[#E8E2D5]">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="p-6">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
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
                  className="text-gray-600 mt-3 pr-8"
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
