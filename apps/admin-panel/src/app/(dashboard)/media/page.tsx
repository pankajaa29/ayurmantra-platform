'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, ExternalLink, Youtube, Image, Video, FileText, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mediaApi } from '@/lib/api';
import { ImageUploader } from '@/components/ImageUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  altText?: string;
  type: 'IMAGE' | 'VIDEO' | 'YOUTUBE' | 'DOCUMENT';
  category: string;
  url: string;
  thumbnailUrl?: string;
  externalId?: string;
  createdAt: string;
}

const categoryColors: Record<string, string> = {
  HERO: 'bg-purple-100 text-purple-800',
  GALLERY: 'bg-blue-100 text-blue-800',
  BLOG: 'bg-green-100 text-green-800',
  TREATMENT: 'bg-orange-100 text-orange-800',
  DOCTOR: 'bg-pink-100 text-pink-800',
  TESTIMONIAL: 'bg-yellow-100 text-yellow-800',
  GENERAL: 'bg-gray-100 text-gray-800',
};

const typeIcons: Record<string, React.ReactNode> = {
  IMAGE: <Image className="w-4 h-4" />,
  VIDEO: <Video className="w-4 h-4" />,
  YOUTUBE: <Youtube className="w-4 h-4" />,
  DOCUMENT: <FileText className="w-4 h-4" />,
};

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [types, setTypes] = useState<{ value: string; label: string }[]>([]);
  
  // Dialog states
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isYouTubeDialogOpen, setIsYouTubeDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Upload form states
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('GENERAL');
  const [uploadedImage, setUploadedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // YouTube form states
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [youtubeCategory, setYoutubeCategory] = useState('GENERAL');
  const [isAddingYouTube, setIsAddingYouTube] = useState(false);

  useEffect(() => {
    fetchMedia();
    fetchCategories();
    fetchTypes();
  }, [searchQuery, typeFilter, categoryFilter]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params: any = { limit: 50 };
      if (searchQuery) params.search = searchQuery;
      if (typeFilter && typeFilter !== 'ALL') params.type = typeFilter;
      if (categoryFilter && categoryFilter !== 'ALL') params.category = categoryFilter;
      const response = await mediaApi.getAll(params);
      setMedia(response.data || []);
    } catch (error) {
      toast.error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await mediaApi.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await mediaApi.getTypes();
      setTypes(response.data || []);
    } catch (error) {
      console.error('Failed to load types');
    }
  };

  const handleUpload = async () => {
    if (!uploadTitle || !uploadedImage) {
      toast.error('Please provide a title and upload an image');
      return;
    }

    try {
      setIsUploading(true);
      await mediaApi.create({
        title: uploadTitle,
        description: uploadDescription,
        type: 'IMAGE',
        category: uploadCategory,
        url: uploadedImage,
      });
      toast.success('Media uploaded successfully');
      setIsUploadDialogOpen(false);
      resetUploadForm();
      fetchMedia();
    } catch (error) {
      toast.error('Failed to upload media');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddYouTube = async () => {
    if (!youtubeUrl) {
      toast.error('Please provide a YouTube URL');
      return;
    }

    try {
      setIsAddingYouTube(true);
      await mediaApi.addYouTube({
        youtubeUrl,
        title: youtubeTitle,
        category: youtubeCategory,
      });
      toast.success('YouTube video added successfully');
      setIsYouTubeDialogOpen(false);
      resetYouTubeForm();
      fetchMedia();
    } catch (error) {
      toast.error('Failed to add YouTube video');
    } finally {
      setIsAddingYouTube(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMedia) return;

    try {
      setIsDeleting(true);
      await mediaApi.delete(selectedMedia.id);
      toast.success('Media deleted successfully');
      setIsPreviewDialogOpen(false);
      setSelectedMedia(null);
      fetchMedia();
    } catch (error) {
      toast.error('Failed to delete media');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const resetUploadForm = () => {
    setUploadTitle('');
    setUploadDescription('');
    setUploadCategory('GENERAL');
    setUploadedImage('');
  };

  const resetYouTubeForm = () => {
    setYoutubeUrl('');
    setYoutubeTitle('');
    setYoutubeCategory('GENERAL');
  };

  const openPreview = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsPreviewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-900">Media Library</h1>
          <p className="text-gray-600 mt-1">Manage images, videos, and YouTube embeds for your website</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsYouTubeDialogOpen(true)}
            className="border-red-200 hover:bg-red-50"
          >
            <Youtube className="w-4 h-4 mr-2 text-red-600" />
            Add YouTube
          </Button>
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="bg-teal-700 hover:bg-teal-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter || 'ALL'} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter || 'ALL'} onValueChange={(v) => setCategoryFilter(v === 'ALL' ? '' : v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No media found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || typeFilter || categoryFilter
              ? 'Try adjusting your filters'
              : 'Upload images or add YouTube videos to get started'}
          </p>
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="bg-teal-700 hover:bg-teal-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload First Media
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {media.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer group"
              onClick={() => openPreview(item)}
            >
              <Card className="overflow-hidden border-gray-200 hover:border-teal-300 transition-all">
                <div className="aspect-video relative bg-gray-100">
                  {item.type === 'YOUTUBE' ? (
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.altText || item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" className="text-white bg-white/20 hover:bg-white/30">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90">
                      {typeIcons[item.type]} {item.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={categoryColors[item.category] || 'bg-gray-100 text-gray-800'}>
                      {item.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload images for use across your website
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="Enter media title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="Enter description (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={uploadCategory} onValueChange={setUploadCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Image *</Label>
              <ImageUploader
                value={uploadedImage}
                onChange={setUploadedImage}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading || !uploadTitle || !uploadedImage}
              className="bg-teal-700 hover:bg-teal-800"
            >
              {isUploading ? 'Uploading...' : 'Upload Media'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* YouTube Dialog */}
      <Dialog open={isYouTubeDialogOpen} onOpenChange={setIsYouTubeDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add YouTube Video</DialogTitle>
            <DialogDescription>
              Add YouTube videos to your media library
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube URL *</Label>
              <Input
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeTitle">Title (optional)</Label>
              <Input
                id="youtubeTitle"
                value={youtubeTitle}
                onChange={(e) => setYoutubeTitle(e.target.value)}
                placeholder="Custom title for the video"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeCategory">Category</Label>
              <Select value={youtubeCategory} onValueChange={setYoutubeCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsYouTubeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddYouTube}
              disabled={isAddingYouTube || !youtubeUrl}
              className="bg-red-600 hover:bg-red-700"
            >
              {isAddingYouTube ? 'Adding...' : 'Add YouTube Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedMedia?.title}</DialogTitle>
            <DialogDescription>
              {selectedMedia?.description || 'Media preview'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedMedia && (
              <>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {selectedMedia.type === 'YOUTUBE' ? (
                    <iframe
                      src={selectedMedia.url}
                      title={selectedMedia.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.altText || selectedMedia.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={categoryColors[selectedMedia.category] || 'bg-gray-100'}>
                    {selectedMedia.category}
                  </Badge>
                  <Badge variant="outline">{selectedMedia.type}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyUrl(selectedMedia.url)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy URL
                  </Button>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
