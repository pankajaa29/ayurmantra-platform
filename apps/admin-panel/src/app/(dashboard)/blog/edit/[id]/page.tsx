'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Save, Eye } from 'lucide-react';
import { blogApi } from '@/lib/api';
import { ImageUploader } from '@/components/ImageUploader';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  featured: boolean;
  authorName: string;
  authorRole: string;
  readTime: string;
  featuredImage?: string;
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Treatments',
    tags: '',
    status: 'DRAFT',
    featured: false,
    authorName: '',
    authorRole: '',
    readTime: '5 min read',
    featuredImage: '',
  });

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await blogApi.getById(params.id);
      if (response?.data) {
        setPost(response.data);
        setFormData({
          title: response.data.title || '',
          slug: response.data.slug || '',
          excerpt: response.data.excerpt || '',
          content: response.data.content || '',
          category: response.data.category || 'Treatments',
          tags: response.data.tags?.join(', ') || '',
          status: response.data.status || 'DRAFT',
          featured: response.data.featured || false,
          authorName: response.data.authorName || '',
          authorRole: response.data.authorRole || '',
          readTime: response.data.readTime || '5 min read',
          featuredImage: response.data.featuredImage || '',
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };

      console.log('Sending update request:', { id: params.id, data });
      const response = await blogApi.update(params.id, data);
      console.log('Update response:', response);
      
      alert('Blog post updated successfully!');
      router.push('/blog');
    } catch (error: any) {
      console.error('Error updating post:', error);
      alert(`Failed to update blog post: ${error?.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#2D5A3D]" />
        <span className="ml-3 text-gray-600">Loading post...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#D4853C] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="p-2 hover:bg-[#F8F6F0] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#2D5A3D]">Edit Blog Post</h1>
            <p className="text-sm text-gray-500">Update your article content</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/blog/${params.id}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8E2D5] rounded-lg text-gray-600 hover:bg-[#F8F6F0] transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D5A3D] text-white rounded-lg hover:bg-[#1F4030] transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="admin-card space-y-4">
          <h2 className="font-serif text-lg font-semibold text-[#2D5A3D]">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (!formData.slug) {
                  setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                }
              }}
              className="admin-input w-full"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="admin-input w-full"
                placeholder="post-url-slug"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="admin-input w-full"
              >
                <option value="Treatments">Treatments</option>
                <option value="Wellness">Wellness</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Education">Education</option>
                <option value="News">News</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="admin-input w-full h-24 resize-none"
              placeholder="Brief description of the post (shown in listings)"
              required
            />
          </div>
        </div>

        {/* Content */}
        <div className="admin-card space-y-4">
          <h2 className="font-serif text-lg font-semibold text-[#2D5A3D]">Content</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Article Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="admin-input w-full h-96 resize-none font-mono text-sm"
              placeholder="Write your article content here... (HTML supported)"
              required
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="admin-card space-y-4">
          <h2 className="font-serif text-lg font-semibold text-[#2D5A3D]">Author Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="admin-input w-full"
                placeholder="Dr. Rajesh Sharma"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Role</label>
              <input
                type="text"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                className="admin-input w-full"
                placeholder="Chief Ayurvedic Physician"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="admin-input w-full"
                placeholder="5 min read"
              />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="admin-card space-y-4">
          <h2 className="font-serif text-lg font-semibold text-[#2D5A3D]">Featured Image</h2>
          <ImageUploader
            value={formData.featuredImage}
            onChange={(value) => setFormData({ ...formData, featuredImage: value })}
          />
          <p className="text-xs text-gray-400">Recommended: 1200x630px</p>
        </div>

        {/* Settings */}
        <div className="admin-card space-y-4">
          <h2 className="font-serif text-lg font-semibold text-[#2D5A3D]">Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="admin-input w-full"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="admin-input w-full"
                placeholder="Ayurveda, Health, Wellness"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-[#2D5A3D] rounded"
            />
            <label htmlFor="featured" className="text-sm text-gray-700">
              Feature this post on homepage
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 border border-[#E8E2D5] rounded-xl text-gray-600 hover:bg-[#F8F6F0] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#2D5A3D] text-white rounded-xl hover:bg-[#1F4030] transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
