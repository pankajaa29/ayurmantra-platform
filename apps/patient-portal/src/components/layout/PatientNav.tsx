'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  UserCircle,
  Pill,
  MessageSquare,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/appointments', label: 'My Appointments', icon: CalendarDays },
  { href: '/book-appointment', label: 'Book Appointment', icon: CalendarDays },
  { href: '/medical-records', label: 'Medical Records', icon: FileText },
  { href: '/prescriptions', label: 'Prescriptions', icon: Pill },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/profile', label: 'My Profile', icon: UserCircle },
];

const bottomNavItems = [
  { href: '/help', label: 'Help & Support', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function PatientNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white border-r border-[#E8E2D5] flex flex-col h-[calc(100vh-64px)] sticky top-0">
      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-4">
            Main Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#2D5A3D] text-white shadow-md'
                        : 'text-gray-600 hover:bg-[#2D5A3D]/10 hover:text-[#2D5A3D]'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-4">
            Quick Actions
          </p>
          <Link
            href="/book-appointment"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 
                     bg-[#D4853C] text-white rounded-xl font-medium 
                     hover:bg-[#B86E2E] transition-colors shadow-md"
          >
            <CalendarDays className="w-5 h-5" />
            Book Now
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-[#E8E2D5]">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#2D5A3D]/10 text-[#2D5A3D]'
                      : 'text-gray-500 hover:bg-[#2D5A3D]/10 hover:text-[#2D5A3D]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
