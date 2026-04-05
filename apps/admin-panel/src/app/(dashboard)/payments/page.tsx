'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  RefreshCcw,
  CreditCard as CardIcon,
  Smartphone,
  Wallet,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'captured' | 'failed' | 'refunded' | 'pending';
  method: 'card' | 'upi' | 'netbanking' | 'wallet';
  patientName: string;
  patientEmail: string;
  treatment: string;
  appointmentDate: string;
  createdAt: string;
  refund?: {
    id: string;
    amount: number;
    reason: string;
    createdAt: string;
  };
}

export default function PaymentsPage() {
  const [payments] = useState<Payment[]>([
    {
      id: 'pay_001',
      orderId: 'order_001',
      amount: 5000,
      currency: 'INR',
      status: 'captured',
      method: 'card',
      patientName: 'John Doe',
      patientEmail: 'john@example.com',
      treatment: 'Panchakarma Detox',
      appointmentDate: '2026-03-15',
      createdAt: '2026-03-10T10:30:00Z',
    },
    {
      id: 'pay_002',
      orderId: 'order_002',
      amount: 1500,
      currency: 'INR',
      status: 'captured',
      method: 'upi',
      patientName: 'Jane Smith',
      patientEmail: 'jane@example.com',
      treatment: 'Abhyanga Massage',
      appointmentDate: '2026-03-16',
      createdAt: '2026-03-11T14:20:00Z',
    },
    {
      id: 'pay_003',
      orderId: 'order_003',
      amount: 2500,
      currency: 'INR',
      status: 'refunded',
      method: 'card',
      patientName: 'Mike Johnson',
      patientEmail: 'mike@example.com',
      treatment: 'Stress Management',
      appointmentDate: '2026-03-12',
      createdAt: '2026-03-08T09:15:00Z',
      refund: {
        id: 'refund_001',
        amount: 2500,
        reason: 'Appointment cancelled by patient',
        createdAt: '2026-03-09T10:00:00Z',
      },
    },
    {
      id: 'pay_004',
      orderId: 'order_004',
      amount: 1200,
      currency: 'INR',
      status: 'captured',
      method: 'netbanking',
      patientName: 'Sarah Williams',
      patientEmail: 'sarah@example.com',
      treatment: 'Shirodhara Therapy',
      appointmentDate: '2026-03-18',
      createdAt: '2026-03-12T16:45:00Z',
    },
    {
      id: 'pay_005',
      orderId: 'order_005',
      amount: 1800,
      currency: 'INR',
      status: 'captured',
      method: 'wallet',
      patientName: 'Rahul Kumar',
      patientEmail: 'rahul@example.com',
      treatment: 'Ayurvedic Facial',
      appointmentDate: '2026-03-20',
      createdAt: '2026-03-13T11:30:00Z',
    },
  ]);

  const [stats] = useState({
    today: { total: 45000, count: 8, change: +12 },
    thisWeek: { total: 285000, count: 45, change: +8 },
    thisMonth: { total: 1250000, count: 198, change: +15 },
    refunds: { total: 15000, count: 6, change: -5 },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'captured':
        return <span className="badge badge-green flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Paid</span>;
      case 'refunded':
        return <span className="badge badge-yellow flex items-center gap-1"><RefreshCcw className="w-3 h-3" /> Refunded</span>;
      case 'failed':
        return <span className="badge badge-red flex items-center gap-1"><XCircle className="w-3 h-3" /> Failed</span>;
      default:
        return <span className="badge badge-blue">{status}</span>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CardIcon className="w-4 h-4" />;
      case 'upi': return <Smartphone className="w-4 h-4" />;
      case 'netbanking': return <Wallet className="w-4 h-4" />;
      case 'wallet': return <Wallet className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Payments</h1>
          <p className="text-gray-500 mt-1">Track transactions, refunds, and payment analytics</p>
        </div>
        <div className="flex gap-3">
          <Link href="/payments/gateway" className="admin-btn-outline">
            <CreditCard className="w-4 h-4" />
            Gateway Settings
          </Link>
          <button className="admin-btn-outline">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: "Today's Revenue", 
            value: `₹${stats.today.total.toLocaleString()}`, 
            change: `${stats.today.change > 0 ? '+' : ''}${stats.today.change}%`,
            up: stats.today.change > 0,
            icon: DollarSign 
          },
          { 
            label: 'This Week', 
            value: `₹${stats.thisWeek.total.toLocaleString()}`, 
            change: `${stats.thisWeek.change > 0 ? '+' : ''}${stats.thisWeek.change}%`,
            up: stats.thisWeek.change > 0,
            icon: DollarSign 
          },
          { 
            label: 'This Month', 
            value: `₹${stats.thisMonth.total.toLocaleString()}`, 
            change: `${stats.thisMonth.change > 0 ? '+' : ''}${stats.thisMonth.change}%`,
            up: stats.thisMonth.change > 0,
            icon: DollarSign 
          },
          { 
            label: 'Refunds', 
            value: `₹${stats.refunds.total.toLocaleString()}`, 
            change: `${stats.refunds.change > 0 ? '+' : ''}${stats.refunds.change}%`,
            up: stats.refunds.change > 0,
            icon: RefreshCcw 
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-sm flex items-center gap-1 mt-1 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change} from last period
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#2D5A3D]/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#2D5A3D]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { method: 'Card', percentage: 65, amount: 812500, icon: CardIcon, color: 'bg-blue-100 text-blue-700' },
          { method: 'UPI', percentage: 25, amount: 312500, icon: Smartphone, color: 'bg-green-100 text-green-700' },
          { method: 'Net Banking', percentage: 8, amount: 100000, icon: Wallet, color: 'bg-purple-100 text-purple-700' },
          { method: 'Wallet', percentage: 2, amount: 25000, icon: Wallet, color: 'bg-orange-100 text-orange-700' },
        ].map((item) => (
          <div key={item.method} className="admin-card">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">{item.method}</p>
                <p className="text-xs text-gray-500">{item.percentage}% of payments</p>
              </div>
            </div>
            <p className="text-xl font-bold">₹{item.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, email, or order ID..."
              className="admin-input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select className="admin-input">
              <option value="all">All Status</option>
              <option value="captured">Paid</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
            </select>
            <select className="admin-input">
              <option value="all">All Methods</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
              <option value="wallet">Wallet</option>
            </select>
            <button className="admin-btn-outline p-2">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Patient</th>
                <th>Treatment</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <div>
                      <p className="font-medium text-sm">{payment.id}</p>
                      <p className="text-xs text-gray-400">{payment.orderId}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2D5A3D]/10 flex items-center justify-center text-[#2D5A3D] font-medium text-sm">
                        {payment.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{payment.patientName}</p>
                        <p className="text-xs text-gray-400">{payment.patientEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td>{payment.treatment}</td>
                  <td>
                    <div>
                      <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                      {payment.refund && (
                        <p className="text-xs text-red-500">-₹{payment.refund.amount.toLocaleString()}</p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="flex items-center gap-1 text-sm capitalize">
                      {getMethodIcon(payment.method)}
                      {payment.method}
                    </span>
                  </td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td>
                    <span className="text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link href={`/payments/${payment.id}`} className="p-1.5 hover:bg-[#F8F6F0] rounded-lg text-sm text-[#D4853C]">
                        View
                      </Link>
                      {payment.status === 'captured' && (
                        <button className="p-1.5 hover:bg-red-50 rounded-lg text-sm text-red-500">
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#E8E2D5]">
          <p className="text-sm text-gray-500">
            Showing {payments.length} transactions
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 bg-[#2D5A3D] text-white rounded-lg text-sm">1</span>
            <button className="p-2 border border-[#E8E2D5] rounded-lg hover:bg-[#F8F6F0]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Razorpay Integration Notice */}
      <div className="admin-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-800">Payment Gateway Integration</h4>
            <p className="text-sm text-blue-600 mt-1">
              Currently using mock payment processing. To go live, configure your Razorpay/Stripe credentials in the environment variables.
            </p>
            <div className="flex gap-3 mt-3">
              <Link href="/payments/gateway" className="text-sm text-blue-700 hover:underline font-medium">
                Configure Gateway →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
