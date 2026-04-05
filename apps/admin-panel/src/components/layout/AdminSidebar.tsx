'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  CalendarDays,
  Sparkles,
  FileText,
  ShoppingBag,
  BarChart3,
  Settings,
  MessageSquare,
  HelpCircle,
  Image,
  LayoutTemplate,
  Globe,
  Star,
  Palette,
} from 'lucide-react';

const mainMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/doctors', label: 'Doctors & Staff', icon: UserCircle },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/treatments', label: 'Treatments', icon: Sparkles },
  { href: '/products', label: 'Products', icon: ShoppingBag },
  { href: '/blog', label: 'Blog Posts', icon: FileText },
];

const websiteMenuItems = [
  { href: '/website/theme', label: 'Theme & Branding', icon: Palette },
  { href: '/website/homepage', label: 'Homepage Editor', icon: LayoutTemplate },
  { href: '/website/about', label: 'About Page', icon: FileText },
  { href: '/website/contact', label: 'Contact Page', icon: MessageSquare },
  { href: '/media', label: 'Media Library', icon: Image },
  { href: '/website/testimonials', label: 'Testimonials', icon: Star },
  { href: '/website/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/website/social', label: 'Social & Reviews', icon: Globe },
];

const bottomItems = [
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const renderMenuItem = (item: { href: string; label: string; icon: any }, isSubmenu = false) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
          isActive
            ? 'bg-[#2D5A3D] text-white shadow-md'
            : 'text-gray-600 hover:bg-[#2D5A3D]/10 hover:text-[#2D5A3D]'
        } ${isSubmenu ? 'ml-2 text-sm' : ''}`}
      >
        <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
        <span className="font-medium text-sm">{item.label}</span>
      </Link>
    );
  };

  const renderBottomItem = (item: { href: string; label: string; icon: any }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
          isActive
            ? 'bg-[#2D5A3D]/10 text-[#2D5A3D]'
            : 'text-gray-500 hover:bg-[#2D5A3D]/10 hover:text-[#2D5A3D]'
        }`}
      >
        <item.icon className="w-5 h-5" />
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white border-r border-[#E8E2D5] 
                      flex flex-col overflow-y-auto z-40">
      {/* Main Menu */}
      <div className="flex-1 p-4 space-y-6">
        {/* Main Menu Section */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </p>
          <nav className="space-y-1">
            {mainMenuItems.map((item) => renderMenuItem(item))}
          </nav>
        </div>

        {/* Website Management Section */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Website Management
          </p>
          <nav className="space-y-1">
            {websiteMenuItems.map((item) => renderMenuItem(item, true))}
          </nav>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-[#E8E2D5]">
        <nav className="space-y-1">
          {bottomItems.map((item) => renderBottomItem(item))}
        </nav>
      </div>
    </aside>
  );
}
