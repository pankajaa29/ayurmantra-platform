'use client';

import Link from 'next/link';
import { Leaf, Bell, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export function PatientHeader() {
  const [notifications] = useState(3);
  
  return (
    <header className="bg-[#2D5A3D] text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold">AyurMantra</span>
              <span className="hidden sm:inline text-xs text-white/70 ml-2">Patient Portal</span>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4853C] text-white text-xs 
                               rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-white/70">Patient ID: #12345</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
