'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  content: {
    title: string;
    items: { question: string; answer: string }[];
    showViewAll?: boolean;
    viewAllLink?: string;
  };
}

export function FaqSectionBlock({ content }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-[var(--color-bg)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] text-center mb-8">
          {content.title}
        </h2>
        <div className="space-y-4">
          {content.items.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="font-semibold text-[var(--color-primary)] pr-4">{faq.question}</h3>
                <span className="text-gray-400 flex-shrink-0">{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {content.showViewAll && (
          <div className="text-center mt-8">
            <Link
              href={content.viewAllLink || '/faq'}
              className="inline-flex items-center text-[var(--color-secondary)] font-medium hover:underline"
            >
              View All FAQs <span className="ml-1">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
