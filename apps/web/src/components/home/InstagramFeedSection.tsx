'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
  likes: number;
  comments: number;
}

interface InstagramFeedSectionProps {
  posts: InstagramPost[];
  username?: string;
  profileUrl?: string;
}

export function InstagramFeedSection({
  posts,
  username = 'ayurmantra',
  profileUrl = 'https://instagram.com/ayurmantra',
}: InstagramFeedSectionProps) {
  if (!posts || posts.length === 0) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium mb-4">
            <span>📸</span>
            @{username}
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest treatments, wellness tips, and behind-the-scenes moments
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <Link href={post.permalink} target="_blank" rel="noopener noreferrer">
                <img
                  src={post.thumbnailUrl || post.mediaUrl}
                  alt={post.caption.slice(0, 50)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span className="text-sm font-medium">{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💬</span>
                      <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-center line-clamp-3">
                    {post.caption}
                  </p>
                </div>

                {post.mediaType === 'VIDEO' && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">▶</span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-medium rounded-full hover:shadow-lg transition-shadow"
          >
            <span>📸</span>
            Follow @{username}
            <span>↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
