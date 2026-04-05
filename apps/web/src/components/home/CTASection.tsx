'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function CTASection({
  title = 'Ready to Begin Your Healing Journey?',
  subtitle = 'Book your consultation today and take the first step towards a healthier, happier you.',
  primaryButtonText = 'Book Appointment',
  primaryButtonLink = '/book-appointment',
  secondaryButtonText = 'Contact Us',
  secondaryButtonLink = '/contact',
}: CTASectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[#3D6B4D] to-[var(--color-primary-light)]">
        <div className="absolute inset-0 opacity-10 pattern-mandala" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-3xl" />
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-20 text-[var(--color-accent)]/20 text-6xl"
        >
          🪷
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-20 text-[var(--color-accent)]/20 text-5xl"
        >
          🌿
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-10 text-[var(--color-accent)]/10 text-8xl"
        >
          ☸️
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
              <span className="text-3xl text-[var(--color-accent)]">🌿</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-accent)]" />
            </div>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={primaryButtonLink}
              className="group inline-flex items-center justify-center gap-3 
                       px-10 py-5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] 
                       text-[var(--color-primary)] font-bold rounded-full
                       hover:from-[var(--color-accent-dark)] hover:to-[var(--color-secondary-dark)] 
                       transition-all shadow-xl hover:shadow-2xl"
            >
              <span>📅</span>
              {primaryButtonText}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              href={secondaryButtonLink}
              className="group inline-flex items-center justify-center gap-3 
                       px-10 py-5 bg-white/10 backdrop-blur-sm 
                       text-white border-2 border-white/30 font-medium rounded-full
                       hover:bg-white/20 hover:border-white/50 transition-all"
            >
              <span>📞</span>
              {secondaryButtonText}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🌿', text: '100% Natural Treatments' },
              { icon: '🙏', text: 'Expert Ayurvedic Doctors' },
              { icon: '☸️', text: 'Personalized Care Plans' },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center gap-3 
                         bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4
                         border border-white/10"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-white font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <span className="text-[var(--color-accent)]">✓</span> Free Initial Consultation
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[var(--color-accent)]">✓</span> Online Booking Available
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[var(--color-accent)]">✓</span> Customized Treatment Plans
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path d="M0 50L48 45C96 40 192 30 288 30C384 30 480 40 576 45C672 50 768 50 864 45C960 40 1056 30 1152 30C1248 30 1344 40 1392 45L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
                fill="var(--color-bg)"/>
        </svg>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4 text-[var(--color-accent)]/40 text-xl">
          <span>🪷</span>
          <span>🌿</span>
          <span>🪷</span>
          <span>🌿</span>
          <span>🪷</span>
        </div>
      </div>
    </section>
  );
}
