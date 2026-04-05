'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Layout,
  FileText,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
  Menu,
  Settings,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const cmsModules = [
  {
    id: 'pages',
    title: 'Pages',
    description: 'Manage static pages like Home, About, Contact',
    icon: FileText,
    count: '8 pages',
    color: 'bg-blue-100 text-blue-600',
    href: '/website/pages',
  },
  {
    id: 'sections',
    title: 'Homepage Sections',
    description: 'Edit hero, features, testimonials, CTA sections',
    icon: Layout,
    count: '12 sections',
    color: 'bg-green-100 text-green-600',
    href: '/website/sections',
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: 'Manage patient reviews and success stories',
    icon: MessageSquare,
    count: '24 testimonials',
    color: 'bg-purple-100 text-purple-600',
    href: '/website/testimonials',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Organize frequently asked questions',
    icon: HelpCircle,
    count: '18 questions',
    color: 'bg-orange-100 text-orange-600',
    href: '/website/faq',
  },
  {
    id: 'media',
    title: 'Media Library',
    description: 'Upload and manage images and videos',
    icon: ImageIcon,
    count: '156 files',
    color: 'bg-pink-100 text-pink-600',
    href: '/website/media',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Customize header and footer menus',
    icon: Menu,
    count: '2 menus',
    color: 'bg-cyan-100 text-cyan-600',
    href: '/website/navigation',
  },
  {
    id: 'seo',
    title: 'SEO Settings',
    description: 'Manage meta tags and search optimization',
    icon: Settings,
    count: 'Global + Page SEO',
    color: 'bg-indigo-100 text-indigo-600',
    href: '/website/seo',
  },
];

export default function WebsiteCMSPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Website CMS</h1>
          <p className="text-gray-500 mt-1">Manage your website content without coding</p>
        </div>
        <div className="flex gap-3">
          <a
            href="http://localhost:2900"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-outline"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </a>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pages', value: '8', change: '' },
          { label: 'Published', value: '7', change: '' },
          { label: 'Last Updated', value: 'Today', change: '' },
          { label: 'Media Files', value: '156', change: '' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-[#2D5A3D]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* CMS Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cmsModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={module.href}
              className="group block admin-card hover:shadow-lg transition-all hover:border-[#2D5A3D]/30"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${module.color} flex items-center justify-center shrink-0`}>
                  <module.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#2D5A3D] transition-colors">
                      {module.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#2D5A3D] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{module.description}</p>
                  <span className="inline-block px-3 py-1 bg-[#F8F6F0] rounded-full text-xs font-medium text-gray-600">
                    {module.count}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h3 className="font-semibold text-[#2D5A3D] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/website/pages/home" className="px-4 py-2 bg-[#2D5A3D]/10 text-[#2D5A3D] rounded-lg text-sm font-medium hover:bg-[#2D5A3D]/20 transition-colors">
            Edit Homepage
          </Link>
          <Link href="/website/testimonials/new" className="px-4 py-2 bg-[#2D5A3D]/10 text-[#2D5A3D] rounded-lg text-sm font-medium hover:bg-[#2D5A3D]/20 transition-colors">
            Add Testimonial
          </Link>
          <Link href="/website/faq/new" className="px-4 py-2 bg-[#2D5A3D]/10 text-[#2D5A3D] rounded-lg text-sm font-medium hover:bg-[#2D5A3D]/20 transition-colors">
            Add FAQ
          </Link>
          <Link href="/website/media" className="px-4 py-2 bg-[#2D5A3D]/10 text-[#2D5A3D] rounded-lg text-sm font-medium hover:bg-[#2D5A3D]/20 transition-colors">
            Upload Media
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-card">
        <h3 className="font-semibold text-[#2D5A3D] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Updated', item: 'Homepage Hero Section', time: '2 hours ago', user: 'Admin' },
            { action: 'Published', item: 'New Blog Post: Benefits of Panchakarma', time: '5 hours ago', user: 'Dr. Rajesh' },
            { action: 'Added', item: 'Patient Testimonial - Priya Sharma', time: 'Yesterday', user: 'Admin' },
            { action: 'Modified', item: 'FAQ - How to book appointment', time: 'Yesterday', user: 'Admin' },
            { action: 'Uploaded', item: '5 new images to Media Library', time: '2 days ago', user: 'Admin' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-[#E8E2D5] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>{' '}
                    <span className="text-gray-600">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-400">by {activity.user}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
