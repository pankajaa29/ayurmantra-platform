'use client';

import { useState } from 'react';

interface Props {
  content: {
    title: string;
    images: { url: string; alt?: string; caption?: string }[];
  };
}

export function GallerySection2({ content }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!content.images || content.images.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] text-center mb-12">{content.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="aspect-square rounded-xl overflow-hidden group relative"
            >
              <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              {img.caption && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-sm">{img.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white text-3xl">✕</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }} className="absolute left-4 text-white text-3xl">◀</button>
          <img
            src={content.images[lightbox].url}
            alt={content.images[lightbox].alt || ''}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          <button onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(content.images.length - 1, lightbox + 1)); }} className="absolute right-4 text-white text-3xl">▶</button>
        </div>
      )}
    </section>
  );
}
