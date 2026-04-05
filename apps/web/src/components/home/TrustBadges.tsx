'use client';

import { motion } from 'framer-motion';

const iconMap: Record<string, string> = {
  users: '👥',
  star: '⭐',
  award: '🏆',
  shield: '🛡️',
  clock: '⏰',
  'check-circle': '✅',
  heart: '❤️',
  'thumbs-up': '👍',
};

interface StatItem {
  icon: string;
  value: string;
  label: string;
  color: string;
}

interface TrustBadgesProps {
  stats?: StatItem[];
  certifications?: string[];
}

const defaultStats: StatItem[] = [
  { icon: 'users', value: '15,000+', label: 'Happy Patients', color: '#0D9488' },
  { icon: 'star', value: '4.9', label: 'Average Rating', color: '#D97706' },
  { icon: 'award', value: '25+', label: 'Years Experience', color: '#0D9488' },
  { icon: 'shield', value: '100%', label: 'Safe & Natural', color: '#D97706' },
];

const defaultCertifications = ['AYUSH Certified', 'ISO 9001:2015', 'GMP Certified', 'Organic Certified'];

export function TrustBadges({ stats = defaultStats, certifications = defaultCertifications }: TrustBadgesProps) {
  return (
    <section className="py-8 bg-white border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const iconEmoji = iconMap[stat.icon] || '🔹';
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-[var(--color-bg)] to-white border border-[var(--color-border)]"
              >
                <div 
                  className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                  style={{ backgroundColor: stat.color }}
                >
                  {iconEmoji}
                </div>
                <p className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-4 border-t border-[var(--color-border)]">
          <span className="text-sm text-gray-500 font-medium">Certified & Trusted:</span>
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-2 text-gray-600">
              <span className="text-[var(--color-secondary)]">🛡️</span>
              <span className="text-sm font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
