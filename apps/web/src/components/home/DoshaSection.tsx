'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const doshas = [
  {
    name: 'Vata',
    element: 'Air & Ether',
    color: 'from-[#87CEEB] to-[#4682B4]',
    bgColor: 'bg-blue-50',
    traits: ['Creative', 'Energetic', 'Quick-thinking'],
    description: 'The energy of movement - light, dry, and dynamic',
    symbol: '💨',
  },
  {
    name: 'Pitta',
    element: 'Fire & Water',
    color: 'from-[#FF6B35] to-[#C73E1D]',
    bgColor: 'bg-orange-50',
    traits: ['Intelligent', 'Focused', 'Leadership'],
    description: 'The energy of transformation - sharp, hot, and intense',
    symbol: '🔥',
  },
  {
    name: 'Kapha',
    element: 'Earth & Water',
    color: 'from-[var(--color-primary-light)] to-[var(--color-primary)]',
    bgColor: 'bg-emerald-50',
    traits: ['Calm', 'Loving', 'Stable'],
    description: 'The energy of stability - heavy, cold, and calm',
    symbol: '🌍',
  },
];

export function DoshaSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 text-[var(--color-accent)]/10 text-8xl">꩜</div>
        <div className="absolute bottom-20 right-10 text-[var(--color-secondary)]/10 text-8xl">꩜</div>
        <div className="absolute top-1/2 left-1/4 text-[var(--color-accent)]/5 text-6xl rotate-12">🪷</div>
        <div className="absolute top-1/3 right-1/4 text-[var(--color-secondary)]/5 text-6xl -rotate-12">🪷</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
            <span className="text-3xl">☸️</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-accent)]" />
          </div>
          
          <h2 className="heading-sacred mb-4">The Three Doshas</h2>
          
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            According to ancient Ayurvedic wisdom, the universe is composed of five elements, 
            which combine to form three fundamental energies (Doshas) that govern our existence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {doshas.map((dosha, index) => (
            <motion.div
              key={dosha.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent)]/0 via-[var(--color-accent)]/30 to-[var(--color-accent)]/0 
                              rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-[var(--color-border)] 
                              group-hover:border-[var(--color-accent)]/50 transition-all h-full
                              group-hover:shadow-2xl">
                  
                  <div className="text-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${dosha.color} 
                                flex items-center justify-center text-5xl shadow-lg`}
                    >
                      {dosha.symbol}
                    </motion.div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-2">{dosha.name}</h3>
                    <p className={`text-sm font-medium mb-4 bg-gradient-to-r ${dosha.color} bg-clip-text text-transparent`}>
                      {dosha.element}
                    </p>
                    <p className="text-gray-600 mb-6 italic">&quot;{dosha.description}&quot;</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {dosha.traits.map((trait) => (
                        <span key={trait} className="px-3 py-1 bg-[var(--color-bg)] rounded-full text-sm text-[var(--color-primary)] border border-[var(--color-border)]">
                          {trait}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-center gap-1 text-[var(--color-accent)]/40">
                      <span>✦</span><span>✦</span><span>✦</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-[var(--color-primary)] via-[#3D6B4D] to-[var(--color-primary-light)] 
                        rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pattern-mandala" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 left-4 text-[var(--color-accent)]/20 text-4xl"
            >
              ☸️
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-4 right-4 text-[var(--color-accent)]/20 text-4xl"
            >
              ☸️
            </motion.div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Discover Your Unique Constitution
              </h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
                Take our ancient Vedic Dosha assessment to uncover your Prakriti 
                and receive personalized wellness recommendations.
              </p>
              
              <Link 
                href="/dosha-quiz"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r 
                         from-[var(--color-accent)] to-[var(--color-secondary)] text-[var(--color-primary)] font-bold rounded-full
                         hover:from-[var(--color-accent-dark)] hover:to-[var(--color-secondary-dark)] transition-all
                         shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">☸️</span>
                Take Dosha Quiz
                <span>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
