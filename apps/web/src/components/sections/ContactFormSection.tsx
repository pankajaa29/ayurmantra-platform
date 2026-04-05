'use client';

import { useState } from 'react';

interface Props {
  content: {
    title: string;
    subtitle?: string;
    recipientEmail?: string;
    subjectOptions?: string[];
    successMessage?: string;
  };
}

export function ContactFormSection({ content }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-6">{content.title}</h2>
          {content.subtitle && <p className="text-gray-600 mb-8">{content.subtitle}</p>}

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <span className="text-4xl block mb-4">✓</span>
              <p className="text-green-700 font-medium">{content.successMessage || 'Thank you! Your message has been sent.'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all" />
              </div>
              {content.subjectOptions && content.subjectOptions.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all">
                    <option value="">Select a subject</option>
                    {content.subjectOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                <textarea rows={5} required className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none" />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <span>📤</span> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
