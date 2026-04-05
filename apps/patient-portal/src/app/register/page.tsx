'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log('Register:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2D5A3D]/5 to-[#D4AF37]/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2D5A3D] to-[#4A7C59] p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-white/80 text-sm">
              Join AyurMantra to start your wellness journey
            </p>
          </div>

          {/* Progress */}
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Step {step} of 2</span>
              <span className="text-xs font-medium text-[#2D5A3D]">
                {step === 1 ? 'Personal Info' : 'Account Setup'}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2D5A3D] to-[#4A7C59] transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 ? (
                <>
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E8E2D5] 
                                   focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                          placeholder="First"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                                 focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                        placeholder="Last"
                        required
                      />
                    </div>
                  </div>

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
                                 focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E8E2D5] 
                                 focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-[#E8E2D5] 
                                 focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                        placeholder="Min 8 characters"
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

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E8E2D5] 
                                 focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#2D5A3D]" required />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-[#D4853C] hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-[#D4853C] hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                </>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-4 border-2 border-[#E8E2D5] text-gray-700 
                             font-medium rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 
                           bg-[#2D5A3D] text-white font-medium rounded-xl
                           hover:bg-[#1F4030] transition-all shadow-lg hover:shadow-xl"
                >
                  {step === 1 ? 'Continue' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#D4853C] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
