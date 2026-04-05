'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    icon: '🧪',
    title: 'Dosha Test',
    description: 'Discover your unique constitution',
    color: 'bg-[var(--color-primary)]',
    href: '/dosha-quiz',
  },
  {
    icon: '🔍',
    title: 'Remedy Finder',
    description: 'Find natural solutions for ailments',
    color: 'bg-[var(--color-secondary)]',
    href: '/remedies',
  },
  {
    icon: '📅',
    title: 'Daily Rituals',
    description: 'Morning & evening wellness practices',
    color: 'bg-[var(--color-primary-light)]',
    href: '/rituals',
  },
  {
    icon: '🍎',
    title: 'Nutrition Guide',
    description: 'Diet plans based on your dosha',
    color: 'bg-[#5A8C69]',
    href: '/nutrition',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[var(--color-bg)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4"
          >
            Unlock Your Ayurvedic Wellness
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Personalized recommendations based on your unique constitution
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href} className="block group">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-all h-full text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[var(--color-primary)] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
