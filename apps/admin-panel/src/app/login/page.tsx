'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Eye, EyeOff, Mail, Lock, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(formData.email, formData.password);
      
      if (response?.access_token) {
        // Store token in localStorage
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError('Invalid login response');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2D5A3D] to-[#1F4030] p-4">
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-white/80 text-sm">
              Secure access for clinic management
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
                             focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                    placeholder="admin@ayurmantra.com"
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
                             focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none"
                    placeholder="Enter password"
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

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 
                         bg-[#2D5A3D] text-white font-medium rounded-xl
                         hover:bg-[#1F4030] transition-all shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In to Admin Panel
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            
            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-[#F8F6F0] rounded-lg text-sm">
              <p className="font-medium text-gray-700 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-gray-600">
                <p><strong>Admin:</strong> admin@ayurmeda.com / admin123</p>
                <p><strong>Doctor:</strong> doctor@ayurmeda.com / admin123</p>
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 pt-6 border-t border-[#E8E2D5] space-y-3">
              <Link href="/forgot-password" className="block text-center text-sm text-[#D4853C] hover:underline">
                Forgot your password?
              </Link>
              <Link href="http://localhost:2900" className="block text-center text-sm text-gray-500 hover:text-[#2D5A3D]">
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-sm text-white/60 mt-6">
          This is a secure area. Unauthorized access is prohibited and may be subject to legal action.
        </p>
      </motion.div>
    </div>
  );
}
