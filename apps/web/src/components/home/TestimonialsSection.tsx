'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonialsApi } from '@/lib/api';

interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  rating: number;
  content: string;
  treatment: string;
  featured: boolean;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsApi.getFeatured();
      if (response.data) {
        setTestimonials(response.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <span className="text-2xl animate-spin inline-block">⏳</span>
            <span className="ml-3 text-gray-600">Loading testimonials...</span>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-[var(--color-accent)]/5 text-9xl">❝</div>
        <div className="absolute bottom-10 right-10 text-[var(--color-accent)]/5 text-9xl rotate-180">❝</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-3xl">🙏</span>
            <span className="px-4 py-1.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-medium rounded-full">
              Patient Stories
            </span>
            <span className="text-3xl">🙏</span>
          </div>
          
          <h2 className="heading-sacred mb-4">
            Healing Journeys
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories of transformation from our patients who experienced the power of authentic Ayurveda
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[var(--color-accent)]">⭐</span>
              ))}
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-accent)]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="relative h-full">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[var(--color-accent)]/10 rounded-full 
                              flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="text-3xl text-[var(--color-accent)]">❝</span>
                </div>
                
                <div className="bg-gradient-to-br from-[var(--color-bg)] to-white rounded-3xl p-8 
                              border border-[var(--color-border)] h-full relative overflow-hidden
                              group-hover:border-[var(--color-accent)]/50 group-hover:shadow-xl transition-all">
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium rounded-full">
                      {testimonial.treatment}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i} className="text-[var(--color-accent)]">⭐</span>
                    ))}
                  </div>

                  <p className="text-gray-700 mb-8 leading-relaxed text-sm italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border)]">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] 
                                  flex items-center justify-center text-2xl shadow-lg">
                      {testimonial.patientName?.charAt(0) || '👤'}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-[var(--color-primary)]">
                        {testimonial.patientName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 flex gap-1 text-[var(--color-accent)]/30">
                    <span>✦</span>
                    <span>✦</span>
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
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pattern-mandala" />
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--color-accent)]">5000+</div>
                <div className="text-white/80 text-sm mt-1">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--color-accent)]">4.9/5</div>
                <div className="text-white/80 text-sm mt-1">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--color-accent)]">15+</div>
                <div className="text-white/80 text-sm mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--color-accent)]">98%</div>
                <div className="text-white/80 text-sm mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
