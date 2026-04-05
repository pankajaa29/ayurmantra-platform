'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  Clock,
  DollarSign,
  CheckCircle,
  X,
  Loader2,
} from 'lucide-react';

interface TreatmentFormData {
  name: string;
  description: string;
  categoryId: string;
  duration: number;
  price: number;
  discountedPrice: number;
  status: 'active' | 'inactive' | 'draft';
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  includes: string[];
  preCareInstructions: string;
  postCareInstructions: string;
  contraindications: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

export default function NewTreatmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<TreatmentFormData>({
    name: '',
    description: '',
    categoryId: '',
    duration: 60,
    price: 0,
    discountedPrice: 0,
    status: 'draft',
    benefits: [''],
    process: [{ step: 1, title: '', description: '' }],
    includes: [''],
    preCareInstructions: '',
    postCareInstructions: '',
    contraindications: '',
    metaTitle: '',
    metaDescription: '',
    slug: '',
  });

  const categories = [
    { id: '1', name: 'Detox' },
    { id: '2', name: 'Massage' },
    { id: '3', name: 'Therapy' },
    { id: '4', name: 'Beauty' },
    { id: '5', name: 'Wellness' },
    { id: '6', name: 'Panchakarma' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/treatments');
      }
    } catch (error) {
      console.error('Error creating treatment:', error);
    }
    setLoading(false);
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addProcessStep = () => {
    setFormData({
      ...formData,
      process: [
        ...formData.process,
        { step: formData.process.length + 1, title: '', description: '' },
      ],
    });
  };

  const removeProcessStep = (index: number) => {
    setFormData({
      ...formData,
      process: formData.process.filter((_, i) => i !== index).map((p, i) => ({ ...p, step: i + 1 })),
    });
  };

  const updateProcessStep = (index: number, field: string, value: string) => {
    const newProcess = [...formData.process];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setFormData({ ...formData, process: newProcess });
  };

  const addInclude = () => {
    setFormData({ ...formData, includes: [...formData.includes, ''] });
  };

  const removeInclude = (index: number) => {
    setFormData({
      ...formData,
      includes: formData.includes.filter((_, i) => i !== index),
    });
  };

  const updateInclude = (index: number, value: string) => {
    const newIncludes = [...formData.includes];
    newIncludes[index] = value;
    setFormData({ ...formData, includes: newIncludes });
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: CheckCircle },
    { id: 'details', label: 'Details', icon: Clock },
    { id: 'seo', label: 'SEO', icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/treatments" className="p-2 hover:bg-[#F8F6F0] rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Add New Treatment</h1>
          <p className="text-gray-500 mt-1">Create a new treatment package</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#2D5A3D] text-white shadow-lg'
                      : 'bg-white border border-[#E8E2D5] text-gray-600 hover:bg-[#F8F6F0]'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}

              {/* Status Card */}
              <div className="mt-6 p-4 bg-white rounded-xl border border-[#E8E2D5]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E2D5] focus:border-[#2D5A3D] outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#2D5A3D] text-white 
                         rounded-xl font-medium hover:bg-[#1F4030] transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {loading ? 'Saving...' : 'Save Treatment'}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="admin-card"
            >
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">Basic Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Panchakarma Detox Therapy"
                        className="admin-input"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the treatment and its benefits..."
                        className="admin-input resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        required
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="admin-input"
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes) *</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          required
                          min="1"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                          className="admin-input pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          required
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                          className="admin-input pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price (₹)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          value={formData.discountedPrice}
                          onChange={(e) => setFormData({ ...formData, discountedPrice: parseInt(e.target.value) })}
                          className="admin-input pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images Upload */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Images</label>
                    <div className="border-2 border-dashed border-[#E8E2D5] rounded-xl p-8 text-center hover:border-[#2D5A3D] transition-colors cursor-pointer">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Drag and drop images here, or click to browse</p>
                      <p className="text-sm text-gray-400 mt-1">JPG, PNG up to 5MB each</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-8">
                  {/* Benefits */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#2D5A3D]">Benefits</h3>
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="flex items-center gap-1 text-sm text-[#D4853C] hover:underline"
                      >
                        <Plus className="w-4 h-4" /> Add Benefit
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => updateBenefit(index, e.target.value)}
                            placeholder={`Benefit ${index + 1}`}
                            className="admin-input flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#2D5A3D]">Treatment Process</h3>
                      <button
                        type="button"
                        onClick={addProcessStep}
                        className="flex items-center gap-1 text-sm text-[#D4853C] hover:underline"
                      >
                        <Plus className="w-4 h-4" /> Add Step
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.process.map((step, index) => (
                        <div key={index} className="p-4 bg-[#F8F6F0] rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-8 h-8 bg-[#2D5A3D] text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </span>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                              placeholder="Step title"
                              className="admin-input flex-1"
                            />
                            <button
                              type="button"
                              onClick={() => removeProcessStep(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            value={step.description}
                            onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                            placeholder="Step description"
                            rows={2}
                            className="admin-input resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#2D5A3D]">What's Included</h3>
                      <button
                        type="button"
                        onClick={addInclude}
                        className="flex items-center gap-1 text-sm text-[#D4853C] hover:underline"
                      >
                        <Plus className="w-4 h-4" /> Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.includes.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => updateInclude(index, e.target.value)}
                            placeholder={`Included item ${index + 1}`}
                            className="admin-input flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeInclude(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pre-Care Instructions</label>
                      <textarea
                        rows={4}
                        value={formData.preCareInstructions}
                        onChange={(e) => setFormData({ ...formData, preCareInstructions: e.target.value })}
                        placeholder="Instructions for patients before the treatment..."
                        className="admin-input resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Post-Care Instructions</label>
                      <textarea
                        rows={4}
                        value={formData.postCareInstructions}
                        onChange={(e) => setFormData({ ...formData, postCareInstructions: e.target.value })}
                        placeholder="Instructions for patients after the treatment..."
                        className="admin-input resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contraindications / Warnings</label>
                    <textarea
                      rows={3}
                      value={formData.contraindications}
                      onChange={(e) => setFormData({ ...formData, contraindications: e.target.value })}
                      placeholder="List any conditions where this treatment should be avoided..."
                      className="admin-input resize-none"
                    />
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">SEO Settings</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">/treatments/</span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="treatment-name"
                        className="admin-input flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="SEO title for search engines"
                      className="admin-input"
                    />
                    <p className="text-xs text-gray-400 mt-1">Recommended: 50-60 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      rows={3}
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="Brief description for search engine results..."
                      className="admin-input resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">Recommended: 150-160 characters</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </form>
    </div>
  );
}
