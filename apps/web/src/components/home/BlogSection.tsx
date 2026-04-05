'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    id: '1',
    title: 'Understanding Your Dosha: Vata, Pitta, and Kapha',
    excerpt: 'Discover your unique body constitution and learn how to balance your doshas for optimal health.',
    image: '/images/blog/doshas.jpg',
    category: 'Ayurveda Tips',
    date: '2024-01-15',
    slug: 'understanding-your-dosha',
  },
  {
    id: '2',
    title: 'Morning Rituals for Ayurvedic Wellness',
    excerpt: 'Start your day the Ayurvedic way with these simple morning practices for better health.',
    image: '/images/blog/morning.jpg',
    category: 'Wellness',
    date: '2024-01-10',
    slug: 'morning-rituals-ayurveda',
  },
  {
    id: '3',
    title: 'Benefits of Panchakarma Detoxification',
    excerpt: 'Learn why Panchakarma is considered the ultimate Ayurvedic detox and rejuvenation therapy.',
    image: '/images/blog/panchakarma.jpg',
    category: 'Detox & Cleansing',
    date: '2024-01-05',
    slug: 'benefits-of-panchakarma',
  },
];

export function BlogSection() {
  return (
    <section className="ayur-section bg-white">
      <div className="ayur-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-ayur-secondary/10 text-ayur-secondary text-sm font-medium mb-4"
            >
              Health & Wellness
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl font-bold text-ayur-primary-900"
            >
              Latest from Our Blog
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-ayur-primary font-medium hover:text-ayur-secondary transition-colors mt-4 md:mt-0"
            >
              View All Articles
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="card-ayur overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-ayur-primary text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span>📅</span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-ayur-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
