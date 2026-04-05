'use client';

import { motion } from 'framer-motion';

const iconMap: Record<string, string> = {
  'user-check': '👨‍⚕️',
  leaf: '🌿',
  heart: '❤️',
  shield: '🛡️',
  clock: '⏰',
  users: '👥',
  sparkles: '✨',
  award: '🏆',
  'check-circle': '✅',
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: 'user-check',
    title: 'Expert Doctors',
    description: 'Our team consists of AYUSH-certified physicians with decades of clinical experience in Ayurvedic healing.',
  },
  {
    icon: 'leaf',
    title: '100% Natural',
    description: 'All our treatments use pure herbal ingredients, free from harmful chemicals or side effects.',
  },
  {
    icon: 'heart',
    title: 'Personalized Care',
    description: 'Every treatment plan is customized based on your unique Prakriti (constitution) and health needs.',
  },
  {
    icon: 'sparkles',
    title: 'Modern Facility',
    description: 'State-of-the-art treatment rooms and equipment for your comfort and hygiene.',
  },
];

export function WhyChooseSection({
  title = 'Why Choose AyurMantra?',
  subtitle = 'We combine traditional Ayurvedic wisdom with modern comfort to provide you with the best healing experience.',
  features = defaultFeatures,
}: WhyChooseSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-[var(--color-accent)] rounded-full text-sm font-medium mb-4">
            ✨ Why Patients Trust Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const iconEmoji = iconMap[feature.icon] || '✨';
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
                         hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/20 flex items-center justify-center text-3xl mb-4 
                              group-hover:bg-[var(--color-accent)] transition-colors">
                  {iconEmoji}
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent)] text-xl">🏆</span>
              <span className="text-sm">NABH Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent)] text-xl">✅</span>
              <span className="text-sm">ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent)] text-xl">✅</span>
              <span className="text-sm">AYUSH Ministry Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent)] text-xl">✅</span>
              <span className="text-sm">GMP Certified Facility</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
