'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Dosha Analysis',
    description: 'Discover your unique Prakriti constitution through ancient Vedic assessment methods.',
    image: '🧘‍♀️',
    color: 'from-[var(--color-primary)] to-[var(--color-primary-light)]',
    href: '/dosha-quiz',
  },
  {
    title: 'Panchakarma Therapy',
    description: 'Experience the five-fold detoxification therapy for complete mind-body rejuvenation.',
    image: '✨',
    color: 'from-[var(--color-accent)] to-[var(--color-secondary)]',
    href: '/services',
  },
  {
    title: 'Ayurvedic Wellness',
    description: 'Holistic healing programs combining diet, herbs, yoga, and meditation for balanced living.',
    image: '🌿',
    color: 'from-[var(--color-secondary)] to-[var(--color-secondary-dark)]',
    href: '/services',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-[var(--color-bg)] relative overflow-hidden pattern-floral">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-secondary)] to-[var(--color-accent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[var(--color-accent)] text-2xl">꩜</span>
            <span className="px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium rounded-full">
              Our Sacred Services
            </span>
            <span className="text-[var(--color-accent)] text-2xl">꩜</span>
          </div>
          
          <h2 className="heading-sacred mb-4">Ancient Healing Arts</h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover authentic Ayurvedic therapies rooted in 5000-year-old Indian traditions, 
            personalized for your unique constitution and wellness goals.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
            <span className="text-[var(--color-accent)] text-2xl">🪷</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-accent)]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link href={service.href} className="block group h-full">
                <div className="card-ayur-premium h-full relative overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${service.color}`} />
                  
                  <div className="p-8">
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} 
                                    flex items-center justify-center shadow-lg 
                                    group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-4xl">{service.image}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-2 -right-2 text-[var(--color-accent)]/30 text-xl"
                      >
                        ✦
                      </motion.div>
                    </div>
                    
                    <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-3 
                                 group-hover:text-[var(--color-secondary)] transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="flex items-center text-[var(--color-secondary)] font-medium group-hover:gap-3 transition-all">
                      <span>Explore Therapy</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} 
                                opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full 
                         shadow-lg border border-[var(--color-accent)]/30">
            <span className="text-2xl">🌿</span>
            <span className="text-[var(--color-primary)] font-medium">50+ Traditional Therapies Available</span>
            <Link href="/services" className="text-[var(--color-secondary)] hover:underline ml-2">
              View All
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
