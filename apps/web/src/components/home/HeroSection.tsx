'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title = 'Heal Naturally, Live Fully',
  subtitle = 'Experience the ancient wisdom of Ayurveda with personalized treatments, authentic herbal remedies, and holistic wellness programs tailored just for you.',
  badgeText = 'Welcome to AyurMantra',
  primaryCtaText = 'Book Consultation',
  primaryCtaLink = '/book-appointment',
  secondaryCtaText = 'Explore Treatments',
  secondaryCtaLink = '/treatments',
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/95 via-[#3D6B4D]/90 to-[var(--color-primary-light)]/85" />
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 opacity-20 pattern-mandala" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-secondary)]/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-20 left-10 text-[var(--color-accent)]/30 text-6xl rotate-12">❋</div>
        <div className="absolute top-40 right-20 text-[var(--color-accent)]/20 text-5xl -rotate-12">❋</div>
        <div className="absolute bottom-40 left-20 text-[var(--color-secondary)]/20 text-4xl rotate-45">꩜</div>
        <div className="absolute bottom-20 right-40 text-[var(--color-secondary)]/25 text-5xl -rotate-12">꩜</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -left-10 text-[var(--color-accent)]/40 text-4xl"
            >
              🪷
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm 
                         border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-sm font-medium rounded-full mb-6"
            >
              <span className="text-lg">✨</span>
              <span>{badgeText}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-shadow"
            >
              {title.split(' ').map((word, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? 'text-[var(--color-accent)] block mt-2' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative pl-6 border-l-4 border-[var(--color-accent)] mb-8"
            >
              <p className="text-white/80 text-xl leading-relaxed">
                {subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href={primaryCtaLink} 
                className="btn-golden-ayur group"
              >
                {primaryCtaText}
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href={secondaryCtaLink} 
                className="btn-primary-ayur"
              >
                {secondaryCtaText}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 pt-6 border-t border-white/20"
            >
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--color-accent)]">15+</div>
                  <div className="text-white/60 text-sm">Years Experience</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-3xl font-bold text-[var(--color-accent)]">15K+</div>
                  <div className="text-white/60 text-sm">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--color-accent)]">50+</div>
                  <div className="text-white/60 text-sm">Ancient Therapies</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-accent)]/30 via-[var(--color-secondary)]/20 to-[var(--color-accent)]/30 rounded-3xl blur-xl" />
              <div className="relative frame-ornate p-1">
                <div className="frame-ornate-inner">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-primary-light)]/40 to-[var(--color-primary)]/60">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-6"
                      >
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-secondary)]/30 
                                      flex items-center justify-center border-4 border-[var(--color-accent)]/40">
                          <span className="text-8xl">🧘‍♀️</span>
                        </div>
                      </motion.div>
                      <div className="space-y-2">
                        <p className="text-[var(--color-accent)] font-serif text-2xl font-bold">Inner Harmony</p>
                        <p className="text-white/70 text-sm max-w-xs">Authentic Ayurvedic wellness in serene traditional setting</p>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-4 right-4 text-[var(--color-accent)]/40 text-3xl"
                      >
                        ✦
                      </motion.div>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-4 left-4 text-[var(--color-secondary)]/40 text-2xl"
                      >
                        ✦
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/50 via-transparent to-[var(--color-primary)]/20" />
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[var(--color-accent)]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] 
                                flex items-center justify-center text-white text-xl">
                    🌿
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-primary)]">100% Natural</p>
                    <p className="text-xs text-gray-500">Authentic Herbs & Oils</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 
                          border border-[var(--color-secondary)]/30"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="font-bold text-[var(--color-primary)]">4.9/5</p>
                    <p className="text-xs text-gray-500">Patient Rating</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path d="M0 60L48 55C96 50 192 40 288 40C384 40 480 50 576 55C672 60 768 60 864 55C960 50 1056 40 1152 40C1248 40 1344 50 1392 55L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" 
                fill="var(--color-bg)"/>
        </svg>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-8 text-[var(--color-accent)]/40 text-2xl">
          <span>🪷</span>
          <span className="text-[var(--color-secondary)]/40">🌿</span>
          <span>🪷</span>
          <span className="text-[var(--color-secondary)]/40">🌿</span>
          <span>🪷</span>
        </div>
      </div>
    </section>
  );
}
