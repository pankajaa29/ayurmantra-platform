'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import { blogApi } from '@/lib/api';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  authorName: string;
  category: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  views: number;
  publishedAt: string;
  featured: boolean;
}

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    published: 0,
    drafts: 0,
    totalViews: 0,
    featured: 0,
  });

  // Fetch blog posts from API
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getAll({ limit: 100 });
      if (response.data) {
        setPosts(response.data);
        
        // Calculate stats
        const published = response.data.filter((p: BlogPost) => p.status === 'PUBLISHED').length;
        const drafts = response.data.filter((p: BlogPost) => p.status === 'DRAFT').length;
        const featured = response.data.filter((p: BlogPost) => p.featured).length;
        const totalViews = response.data.reduce((sum: number, p: BlogPost) => sum + (p.views || 0), 0);
        
        setStats({
          published,
          drafts,
          totalViews,
          featured,
        });
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await blogApi.delete(id);
      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.authorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Blog & CMS</h1>
          <p className="text-gray-500 mt-1">Manage website content and blog posts</p>
        </div>
        <Link href="/blog/new" className="admin-btn-primary">
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E8E2D5]">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'posts'
              ? 'border-[#2D5A3D] text-[#2D5A3D]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Blog Posts ({stats.published + stats.drafts})
        </button>
      </div>

      {activeTab === 'posts' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Published', value: stats.published, color: 'badge-green' },
              { label: 'Drafts', value: stats.drafts, color: 'badge-yellow' },
              { label: 'Total Views', value: formatNumber(stats.totalViews), color: 'badge-blue' },
              { label: 'Featured', value: stats.featured, color: 'badge-purple' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="admin-card"
              >
                <span className={`badge ${stat.color}`}>{stat.label}</span>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Search */}
          <div className="admin-card">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input pl-10"
              />
            </div>
          </div>

          {/* Posts Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card overflow-hidden"
          >
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#2D5A3D]" />
                <span className="ml-3 text-gray-600">Loading posts...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Views</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <tr key={post.id}>
                          <td>
                            <div className="flex items-center gap-2">
                              {post.featured && (
                                <span className="text-yellow-400">⭐</span>
                              )}
                              <span className="font-medium line-clamp-1">{post.title}</span>
                            </div>
                          </td>
                          <td className="flex items-center gap-1">
                            <User className="w-3 h-3 text-gray-400" />
                            {post.authorName}
                          </td>
                          <td>{post.category}</td>
                          <td>{(post.views || 0).toLocaleString()}</td>
                          <td>
                            <span className={`badge ${
                              post.status === 'PUBLISHED' ? 'badge-green' : 
                              post.status === 'DRAFT' ? 'badge-yellow' : 'badge-gray'
                            }`}>
                              {post.status === 'PUBLISHED' ? (
                                <><CheckCircle className="w-3 h-3 mr-1" /> Published</>
                              ) : post.status === 'DRAFT' ? (
                                <><Clock className="w-3 h-3 mr-1" /> Draft</>
                              ) : (
                                <><Trash2 className="w-3 h-3 mr-1" /> Archived</>
                              )}
                            </span>
                          </td>
                          <td>{formatDate(post.publishedAt)}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Link 
                                href={`/blog/${post.id}`}
                                className="p-1.5 hover:bg-[#F8F6F0] rounded-lg"
                              >
                                <Eye className="w-4 h-4 text-gray-500" />
                              </Link>
                              <Link 
                                href={`/blog/edit/${post.id}`}
                                className="p-1.5 hover:bg-[#F8F6F0] rounded-lg"
                              >
                                <Edit className="w-4 h-4 text-blue-500" />
                              </Link>
                              <button 
                                onClick={() => handleDelete(post.id)}
                                className="p-1.5 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          {searchTerm ? 'No posts found matching your search' : 'No blog posts yet. Create your first post!'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
