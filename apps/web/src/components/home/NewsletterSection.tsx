'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface NewsletterSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

const benefits = [
  { icon: '📖', text: 'Weekly Ayurvedic health tips' },
  { icon: '✨', text: 'Exclusive treatment discounts' },
  { icon: '🎁', text: 'Free wellness guides & eBooks' },
];

export function NewsletterSection({
  title = 'Subscribe to Our Wellness Newsletter',
  subtitle = 'Get the latest Ayurvedic health tips, exclusive offers, and wellness wisdom delivered straight to your inbox.',
  buttonText = 'Subscribe Now',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-dark)] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span>✉️</span>
              <span className="text-sm font-medium">Join 15,000+ Subscribers</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[var(--color-accent)]">{benefit.icon}</span>
                  <span className="text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="px-8 py-4 bg-[var(--color-primary)] text-white font-medium rounded-xl 
                           hover:bg-[var(--color-primary-dark)] transition-colors flex items-center justify-center gap-2
                           disabled:opacity-70"
                >
                  {submitted ? (
                    <>
                      <span>✓</span>
                      Subscribed!
                    </>
                  ) : (
                    buttonText
                  )}
                </button>
              </div>
              <p className="text-xs text-white/70 mt-3">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
