'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Loader2,
  CheckCircle,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
} from 'lucide-react';
import { blogApi } from '@/lib/api';
import { ImageUploader } from '@/components/ImageUploader';

// Simple Rich Text Toolbar Component
const RichTextToolbar = ({ onFormat }: { onFormat: (command: string) => void }) => {
  const buttons = [
    { cmd: 'bold', label: 'B', style: 'font-bold' },
    { cmd: 'italic', label: 'I', style: 'italic' },
    { cmd: 'underline', label: 'U', style: 'underline' },
    { cmd: 'justifyLeft', label: '⬅', style: '' },
    { cmd: 'justifyCenter', label: '↔', style: '' },
    { cmd: 'justifyRight', label: '➡', style: '' },
    { cmd: 'insertUnorderedList', label: '•', style: '' },
    { cmd: 'insertOrderedList', label: '1.', style: '' },
    { cmd: 'createLink', label: '🔗', style: '' },
  ];

  return (
    <div className="flex items-center gap-1 p-2 bg-[#F8F6F0] border-b border-[#E8E2D5]">
      {buttons.map((btn) => (
        <button
          key={btn.cmd}
          type="button"
          onClick={() => onFormat(btn.cmd)}
          className="px-3 py-1.5 rounded hover:bg-white text-sm font-medium transition-colors"
        >
          <span className={btn.style}>{btn.label}</span>
        </button>
      ))}
    </div>
  );
};

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [] as string[],
    featuredImage: '' as string,
    author: 'Dr. Rajesh Sharma',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    publishDate: new Date().toISOString().split('T')[0],
    metaTitle: '',
    metaDescription: '',
    slug: '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleFormat = (command: string) => {
    document.execCommand(command, false, undefined);
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setFormData({ ...formData, content: e.currentTarget.innerHTML });
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const data = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category || 'General',
        tags: formData.tags,
        status: 'PUBLISHED',
        featured: false,
        authorName: formData.author,
        authorRole: 'Ayurvedic Physician',
        publishedAt: new Date().toISOString(),
        readTime: '5 min read',
        featuredImage: formData.featuredImage,
      };

      await blogApi.create(data);
      setPublished(true);
      setTimeout(() => {
        router.push('/blog');
      }, 1500);
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      const data = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category || 'General',
        tags: formData.tags,
        status: 'DRAFT',
        featured: false,
        authorName: formData.author,
        authorRole: 'Ayurvedic Physician',
        publishedAt: null,
        readTime: '5 min read',
      };

      await blogApi.create(data);
      alert('Draft saved successfully!');
      router.push('/blog');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/blog" className="p-2 hover:bg-[#F8F6F0] rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">
              {formData.title || 'New Blog Post'}
            </h1>
            <p className="text-gray-500 mt-1">Create and publish health content</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={loading}
            className="admin-btn-outline"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={loading || !formData.title || !formData.content}
            className="admin-btn-primary"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : published ? <CheckCircle className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {published ? 'Published!' : 'Publish'}
          </button>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="admin-card">
              <input
                type="text"
                placeholder="Enter blog post title..."
                value={formData.title}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  });
                }}
                className="w-full text-2xl font-bold border-none outline-none placeholder:text-gray-300"
              />
            </div>

            {/* Content Editor */}
            <div className="admin-card p-0 overflow-hidden">
              <RichTextToolbar onFormat={handleFormat} />
              <div
                contentEditable
                onInput={handleContentChange}
                className="min-h-[400px] p-4 outline-none prose max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            </div>

            {/* Excerpt */}
            <div className="admin-card">
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the post (shown in previews)..."
                className="admin-input resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{formData.excerpt.length}/160 characters recommended</p>
            </div>

            {/* SEO Settings */}
            <div className="admin-card">
              <h3 className="font-semibold text-[#2D5A3D] mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">/blog/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
                    placeholder="SEO title (50-60 chars)"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="SEO description (150-160 chars)"
                    className="admin-input resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="admin-card">
              <h3 className="font-semibold text-[#2D5A3D] mb-4">Publish Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="admin-input"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      className="admin-input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select className="admin-input pl-10">
                      <option>Dr. Rajesh Sharma</option>
                      <option>Dr. Priya Patel</option>
                      <option>Dr. Ananya Iyer</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="admin-card">
              <h3 className="font-semibold text-[#2D5A3D] mb-4">Featured Image</h3>
              <ImageUploader
                value={formData.featuredImage || ''}
                onChange={(value) => setFormData({ ...formData, featuredImage: value })}
              />
              <p className="text-xs text-gray-400 mt-2">Recommended: 1200x630px</p>
            </div>

            {/* Category & Tags */}
            <div className="admin-card">
              <h3 className="font-semibold text-[#2D5A3D] mb-4">Organization</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-input"
                  >
                    <option value="">Select Category</option>
                    <option value="treatments">Treatments</option>
                    <option value="wellness">Wellness Tips</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="news">News & Updates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      placeholder="Add tag and press Enter"
                      className="admin-input flex-1"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#2D5A3D]/10 text-[#2D5A3D] rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="admin-card bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] text-white">
              <h3 className="font-semibold mb-4">Preview</h3>
              <div className="space-y-2 text-sm">
                <p><span className="opacity-70">Status:</span> {formData.status}</p>
                <p><span className="opacity-70">Words:</span> {formData.content.replace(/<[^>]*>/g, '').split(' ').length}</p>
                <p><span className="opacity-70">Reading time:</span> {Math.ceil(formData.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
