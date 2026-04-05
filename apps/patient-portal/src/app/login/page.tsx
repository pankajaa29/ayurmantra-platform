'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2D5A3D]/5 to-[#D4AF37]/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2D5A3D] to-[#4A7C59] p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-2">
              Patient Portal
            </h1>
            <p className="text-white/80 text-sm">
              Sign in to access your health records and appointments
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E8E2D5] 
                             focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 
                             outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-[#E8E2D5] 
                             focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 
                             outline-none transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2D5A3D]" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-[#D4853C] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 
                         bg-[#2D5A3D] text-white font-medium rounded-xl
                         hover:bg-[#1F4030] transition-all shadow-lg hover:shadow-xl"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#D4853C] font-medium hover:underline">
                Create Account
              </Link>
            </p>

            {/* Back to Website */}
            <div className="mt-6 pt-6 border-t border-[#E8E2D5]">
              <Link
                href="http://localhost:2900"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#2D5A3D]"
              >
                ← Back to AyurMantra Website
              </Link>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? Contact us at{' '}
          <a href="mailto:support@ayurmantra.com" className="text-[#D4853C] hover:underline">
            support@ayurmantra.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}
