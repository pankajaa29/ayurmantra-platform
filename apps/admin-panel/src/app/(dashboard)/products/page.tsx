'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Package,
  DollarSign,
  ShoppingCart,
  Edit,
  Trash2,
  AlertCircle,
} from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Triphala Churna',
    category: 'Herbal Supplements',
    price: '₹299',
    stock: 45,
    status: 'in-stock',
    sales: 234,
  },
  {
    id: '2',
    name: 'Ashwagandha Capsules',
    category: 'Herbal Supplements',
    price: '₹450',
    stock: 12,
    status: 'low-stock',
    sales: 189,
  },
  {
    id: '3',
    name: 'Brahmi Oil',
    category: 'Hair Care',
    price: '₹350',
    stock: 0,
    status: 'out-of-stock',
    sales: 156,
  },
  {
    id: '4',
    name: 'Kumkumadi Tailam',
    category: 'Skin Care',
    price: '₹599',
    stock: 28,
    status: 'in-stock',
    sales: 98,
  },
  {
    id: '5',
    name: 'Chyawanprash',
    category: 'Immunity',
    price: '₹275',
    stock: 67,
    status: 'in-stock',
    sales: 312,
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Products</h1>
          <p className="text-gray-500 mt-1">Manage clinic products and inventory</p>
        </div>
        <Link href="/products/new" className="admin-btn-primary">
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: '48', icon: Package },
          { label: 'In Stock', value: '42', icon: '✅' },
          { label: 'Low Stock', value: '4', icon: '⚠️' },
          { label: 'Out of Stock', value: '2', icon: '❌' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2D5A3D]/10 flex items-center justify-center">
                {typeof stat.icon === 'string' ? (
                  <span className="text-lg">{stat.icon}</span>
                ) : (
                  <stat.icon className="w-5 h-5 text-[#2D5A3D]" />
                )}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Sales</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="font-medium">{product.name}</td>
                  <td>{product.category}</td>
                  <td className="font-medium">{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`badge ${
                      product.status === 'in-stock' ? 'badge-green' :
                      product.status === 'low-stock' ? 'badge-yellow' : 'badge-red'
                    }`}>
                      {product.status === 'low-stock' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {product.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td>{product.sales}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-[#F8F6F0] rounded-lg">
                        <Edit className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
