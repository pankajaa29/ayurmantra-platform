'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* WhatsApp */}
              <motion.a
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                href="https://wa.me/918001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-full 
                         shadow-lg hover:bg-green-600 transition-colors"
              >
                <span className="text-sm font-medium">Chat on WhatsApp</span>
                <span className="text-xl">💬</span>
              </motion.a>

              {/* Phone */}
              <motion.a
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                href="tel:+918001234567"
                className="flex items-center gap-3 px-4 py-3 bg-[var(--color-primary)] text-white rounded-full 
                         shadow-lg hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <span className="text-sm font-medium">Call Now</span>
                <span className="text-xl">📞</span>
              </motion.a>

              {/* Emergency */}
              <motion.a
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                href="tel:+918001234567"
                className="flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-full 
                         shadow-lg hover:bg-red-600 transition-colors"
              >
                <span className="text-sm font-medium">Emergency</span>
                <span className="text-xl">🚨</span>
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[var(--color-secondary)] text-white rounded-full shadow-xl 
                   flex items-center justify-center hover:bg-[var(--color-secondary-dark)] transition-colors text-2xl"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                ✕
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="w-1 h-1 bg-white rounded-full" />
                <span className="w-1 h-1 bg-white rounded-full" />
                <span className="w-1 h-1 bg-white rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full 
                     shadow-lg flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors text-2xl"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sticky Emergency Banner (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-primary)] text-white py-3 px-4 
                      flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2">
          <span className="text-lg">📞</span>
          <span className="text-sm font-medium">Need Help?</span>
        </div>
        <a href="tel:+918001234567" className="px-4 py-1.5 bg-white text-[var(--color-primary)] rounded-full text-sm font-medium">
          Call Now
        </a>
      </div>
    </>
  );
}
