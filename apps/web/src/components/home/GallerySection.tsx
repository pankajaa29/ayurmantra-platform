'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const galleryItems = [
  { id: 1, category: 'facility', title: 'Panchakarma Treatment Room', description: 'State-of-the-art therapy suite' },
  { id: 2, category: 'treatment', title: 'Abhyanga Massage', description: 'Traditional full body oil massage' },
  { id: 3, category: 'herbs', title: 'Herbal Garden', description: 'Organic medicinal herb cultivation' },
  { id: 4, category: 'facility', title: 'Yoga & Meditation Hall', description: 'Peaceful practice environment' },
  { id: 5, category: 'treatment', title: 'Shirodhara Therapy', description: 'Ancient oil pouring technique' },
  { id: 6, category: 'facility', title: 'Reception Area', description: 'Welcoming traditional ambiance' },
];

const categories = ['all', 'facility', 'treatment', 'herbs'];

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section className="ayur-section bg-[var(--color-bg)]">
      <div className="ayur-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-sm font-medium mb-4">
            <span className="mr-1">📷</span> Gallery
          </span>
          <h2 className="heading-classical mb-4">Experience Our Sanctuary</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a virtual tour of our award-winning facility designed for holistic healing
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-gray-600 hover:bg-[var(--color-primary)]/10'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setLightboxImage(item.id)}
              className="group relative aspect-square bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] 
                       rounded-2xl overflow-hidden cursor-pointer shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-serif text-white/20">{item.title.charAt(0)}</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs text-[var(--color-accent)] uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-white font-serif text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{item.description}</p>
                </div>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm 
                           rounded-full text-white text-xs font-medium">
                {item.category}
              </div>
            </motion.div>
          ))}
        </div>

        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full text-3xl"
            >
              ✕
            </button>
            <button
              onClick={() => setLightboxImage(Math.max(1, lightboxImage - 1))}
              className="absolute left-4 p-3 text-white hover:bg-white/20 rounded-full text-3xl"
            >
              ◀
            </button>
            <div className="max-w-4xl w-full aspect-video bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] 
                          rounded-2xl flex items-center justify-center">
              <span className="text-8xl font-serif text-white/30">
                {galleryItems.find(i => i.id === lightboxImage)?.title.charAt(0)}
              </span>
            </div>
            <button
              onClick={() => setLightboxImage(Math.min(galleryItems.length, lightboxImage + 1))}
              className="absolute right-4 p-3 text-white hover:bg-white/20 rounded-full text-3xl"
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
