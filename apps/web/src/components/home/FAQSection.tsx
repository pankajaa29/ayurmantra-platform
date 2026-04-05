'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { faqApi } from '@/lib/api';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState<string>('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const [faqResponse, categoriesResponse] = await Promise.all([
        faqApi.getPublished(),
        faqApi.getCategories(),
      ]);
      
      if (faqResponse.data) {
        setFaqs(faqResponse.data);
        const uniqueCategories = Array.from(new Set<string>(faqResponse.data.map((f: FAQ) => f.category)));
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setOpenCategory(uniqueCategories[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const faqsByCategory = categories.map(category => ({
    category,
    questions: faqs.filter(f => f.category === category),
  }));

  if (loading) {
    return (
      <section className="ayur-section bg-white">
        <div className="ayur-container">
          <div className="flex items-center justify-center py-12">
            <span className="text-2xl animate-spin inline-block">⏳</span>
            <span className="ml-3 text-gray-600">Loading FAQs...</span>
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="ayur-section bg-white">
      <div className="ayur-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-4">
            <span className="mr-1">❓</span> FAQ
          </span>
          <h2 className="heading-classical mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our treatments and services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setOpenCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                    openCategory === category
                      ? 'bg-[var(--color-primary)] text-white shadow-lg'
                      : 'bg-[var(--color-bg)] text-gray-600 hover:bg-[var(--color-primary)]/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={openCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {faqsByCategory
                .find((c) => c.category === openCategory)
                ?.questions.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-bg)]"
                  >
                    <button
                      onClick={() =>
                        setOpenQuestion(openQuestion === faq.id ? null : faq.id)
                      }
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-white transition-colors"
                    >
                      <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                      <span className="text-[var(--color-primary)] shrink-0 text-lg">
                        {openQuestion === faq.id ? '▲' : '▼'}
                      </span>
                    </button>
                    {openQuestion === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="px-5 pb-5"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-2xl text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Still have questions?</h3>
                    <p className="text-white/70 text-sm">Our team is here to help you</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-[var(--color-primary)] rounded-xl font-medium 
                           hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
