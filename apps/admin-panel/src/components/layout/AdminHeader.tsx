'use client';

import Link from 'next/link';
import { Leaf, Bell, Search, Menu, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

export function AdminHeader() {
  const [notifications] = useState(5);
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#2D5A3D] text-white shadow-lg z-50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left - Logo */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-bold">AyurMantra</span>
              <span className="text-xs text-white/70 ml-2">Admin</span>
            </div>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#D4853C] text-white text-xs 
                             rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/20">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">Dr. Admin</p>
              <p className="text-xs text-white/70">Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-sm font-bold">SA</span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
