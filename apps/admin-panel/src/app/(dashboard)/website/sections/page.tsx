'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Layout,
  Eye,
  EyeOff,
  GripVertical,
  Edit,
  ChevronUp,
  ChevronDown,
  Save,
  ExternalLink,
  Image as ImageIcon,
  Type,
  MousePointer,
  CheckCircle,
} from 'lucide-react';

interface HomepageSection {
  id: string;
  name: string;
  type: string;
  isVisible: boolean;
  sortOrder: number;
  settings: Record<string, any>;
}

export default function HomepageSectionsPage() {
  const [sections, setSections] = useState<HomepageSection[]>([
    {
      id: 'hero',
      name: 'Hero Banner',
      type: 'hero',
      isVisible: true,
      sortOrder: 1,
      settings: {
        title: 'Discover Your Ayurvedic Path to Wellness',
        subtitle: 'Experience authentic Ayurvedic treatments for holistic health',
        ctaPrimary: 'Book Consultation',
        ctaSecondary: 'Explore Treatments',
        backgroundImage: '/images/hero-bg.jpg',
      },
    },
    {
      id: 'trust-badges',
      name: 'Trust Badges',
      type: 'stats',
      isVisible: true,
      sortOrder: 2,
      settings: {
        stats: [
          { label: 'Happy Patients', value: '10,000+' },
          { label: 'Years Experience', value: '15+' },
          { label: 'Expert Doctors', value: '25+' },
          { label: 'Patient Rating', value: '4.9' },
        ],
      },
    },
    {
      id: 'services',
      name: 'Our Services',
      type: 'services',
      isVisible: true,
      sortOrder: 3,
      settings: {
        title: 'Our Signature Treatments',
        subtitle: 'Ancient wisdom meets modern wellness',
        showAll: false,
      },
    },
    {
      id: 'dosha',
      name: 'Dosha Section',
      type: 'dosha',
      isVisible: true,
      sortOrder: 4,
      settings: {
        title: 'Understanding Your Dosha',
        subtitle: 'Discover your unique body constitution',
      },
    },
    {
      id: 'doctors',
      name: 'Meet Our Doctors',
      type: 'team',
      isVisible: true,
      sortOrder: 5,
      settings: {
        title: 'Meet Our Expert Doctors',
        subtitle: 'Award-winning team of Ayurvedic physicians',
      },
    },
    {
      id: 'why-choose',
      name: 'Why Choose Us',
      type: 'features',
      isVisible: true,
      sortOrder: 6,
      settings: {
        title: 'The AyurMantra Difference',
        features: [
          '100% Natural Treatments',
          'Certified Practitioners',
          'Personalized Care',
          '24/7 Support',
        ],
      },
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      type: 'testimonials',
      isVisible: true,
      sortOrder: 7,
      settings: {
        title: 'What Our Patients Say',
        count: 6,
        autoRotate: true,
      },
    },
    {
      id: 'gallery',
      name: 'Photo Gallery',
      type: 'gallery',
      isVisible: true,
      sortOrder: 8,
      settings: {
        title: 'Experience Our Sanctuary',
        categories: ['facility', 'treatment', 'herbs'],
      },
    },
    {
      id: 'faq',
      name: 'FAQ Section',
      type: 'faq',
      isVisible: true,
      sortOrder: 9,
      settings: {
        title: 'Frequently Asked Questions',
        categories: ['General', 'Treatments', 'Appointments'],
      },
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      type: 'newsletter',
      isVisible: true,
      sortOrder: 10,
      settings: {
        title: 'Subscribe to Our Wellness Newsletter',
        subtitle: 'Get health tips and exclusive offers',
      },
    },
    {
      id: 'cta',
      name: 'Call to Action',
      type: 'cta',
      isVisible: true,
      sortOrder: 11,
      settings: {
        title: 'Begin Your Wellness Journey Today',
        subtitle: 'Book your consultation and take the first step',
        buttonText: 'Book Appointment',
      },
    },
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    
    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    
    // Update sort orders
    newSections.forEach((s, i) => s.sortOrder = i + 1);
    setSections(newSections);
  };

  const toggleVisibility = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero': return <ImageIcon className="w-5 h-5" />;
      case 'stats': return <CheckCircle className="w-5 h-5" />;
      case 'services': return <Layout className="w-5 h-5" />;
      case 'team': return <Type className="w-5 h-5" />;
      case 'features': return <CheckCircle className="w-5 h-5" />;
      case 'testimonials': return <Type className="w-5 h-5" />;
      case 'gallery': return <ImageIcon className="w-5 h-5" />;
      case 'faq': return <Type className="w-5 h-5" />;
      case 'newsletter': return <MousePointer className="w-5 h-5" />;
      case 'cta': return <MousePointer className="w-5 h-5" />;
      default: return <Layout className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Homepage Sections</h1>
          <p className="text-gray-500 mt-1">Customize and reorder homepage content</p>
        </div>
        <div className="flex gap-3">
          <a
            href="http://localhost:2900"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-outline"
          >
            <ExternalLink className="w-4 h-4" />
            Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-btn-primary"
          >
            {saving ? (
              <><span className="animate-spin">⏳</span> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sections', value: sections.length },
          { label: 'Visible', value: sections.filter(s => s.isVisible).length },
          { label: 'Hidden', value: sections.filter(s => !s.isVisible).length },
          { label: 'Last Updated', value: 'Today' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`admin-card ${!section.isVisible ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center gap-4">
              {/* Drag Handle */}
              <div className="flex items-center gap-2 text-gray-400">
                <GripVertical className="w-5 h-5 cursor-move" />
                <span className="text-sm font-medium w-6">{section.sortOrder}</span>
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-[#2D5A3D]/10 flex items-center justify-center text-[#2D5A3D]">
                {getSectionIcon(section.type)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{section.name}</h3>
                  {!section.isVisible && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{section.settings.title || 'No title set'}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Reorder */}
                <div className="flex flex-col">
                  <button
                    onClick={() => moveSection(section.id, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-[#F8F6F0] rounded disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSection(section.id, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-1 hover:bg-[#F8F6F0] rounded disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Visibility Toggle */}
                <button
                  onClick={() => toggleVisibility(section.id)}
                  className={`p-2 rounded-lg ${section.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  title={section.isVisible ? 'Hide section' : 'Show section'}
                >
                  {section.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>

                {/* Edit */}
                <button
                  onClick={() => setEditingSection(section.id)}
                  className="p-2 hover:bg-[#F8F6F0] rounded-lg text-blue-600"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Edit Panel */}
            {editingSection === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-4 pt-4 border-t border-[#E8E2D5]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={section.settings.title || ''}
                      onChange={(e) => {
                        const newSections = sections.map(s =>
                          s.id === section.id
                            ? { ...s, settings: { ...s.settings, title: e.target.value } }
                            : s
                        );
                        setSections(newSections);
                      }}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={section.settings.subtitle || ''}
                      onChange={(e) => {
                        const newSections = sections.map(s =>
                          s.id === section.id
                            ? { ...s, settings: { ...s.settings, subtitle: e.target.value } }
                            : s
                        );
                        setSections(newSections);
                      }}
                      className="admin-input"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-[#F8F6F0] rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <div className="admin-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Tips for Homepage Optimization</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Keep the Hero section compelling with clear call-to-action</li>
          <li>• Show 4-6 featured treatments maximum for better engagement</li>
          <li>• Include at least 3-4 testimonials with photos for social proof</li>
          <li>• Use the FAQ section to reduce support inquiries</li>
          <li>• Keep newsletter signup visible but not intrusive</li>
        </ul>
      </div>
    </div>
  );
}
