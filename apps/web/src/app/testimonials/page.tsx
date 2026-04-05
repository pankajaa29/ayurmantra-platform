import { Metadata } from 'next';
import Link from 'next/link';
import { testimonialsApi } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Patient Testimonials & Reviews',
  description: 'Read success stories from our patients. Discover how Ayurveda has transformed their health and wellness journey.',
};

interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  age: number;
  rating: number;
  treatment: string;
  doctorName: string;
  content: string;
  featured: boolean;
  hasBeforeAfter: boolean;
  createdAt: string;
}

async function getTestimonials() {
  try {
    const response = await testimonialsApi.getPublished();
    return response.data || [];
  } catch {
    return [];
  }
}

const stats = [
  { label: 'Average Rating', value: '4.9', suffix: '/5' },
  { label: 'Total Reviews', value: '2,500+', suffix: '' },
  { label: 'Success Rate', value: '95%', suffix: '' },
  { label: 'Verified Patients', value: '100%', suffix: '' },
];

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const featuredTestimonials = testimonials.filter((t: Testimonial) => t.featured);
  const regularTestimonials = testimonials.filter((t: Testimonial) => !t.featured);

  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              💬 Patient Stories
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              What Our Patients Say
            </h1>
            <p className="text-white/80 text-lg">
              Real stories of healing and transformation from our valued patients
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-[var(--color-accent)]">⭐</span>
                  <span className="text-3xl font-bold text-[var(--color-primary)]">{stat.value}</span>
                  <span className="text-lg text-gray-400">{stat.suffix}</span>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-[var(--color-bg)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[var(--color-border)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">⭐</span>
                    ))}
                  </div>
                  <span className="text-4xl text-[var(--color-secondary)]/30 block mb-4">❝</span>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    &ldquo;{featuredTestimonials[0].content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-2xl">
                      {featuredTestimonials[0].patientName?.charAt(0) || '👤'}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-primary)]">{featuredTestimonials[0].patientName}</p>
                      <p className="text-sm text-gray-500">{featuredTestimonials[0].location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-green-500">✓</span>
                        <span className="text-xs text-green-600">Verified Patient</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                      {featuredTestimonials[0].treatment}
                    </span>
                    <span>Treated by {featuredTestimonials[0].doctorName}</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-primary)]/20 rounded-2xl flex items-center justify-center">
                    <span className="text-8xl">🌟</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] text-center mb-12">
            More Success Stories
          </h2>

          {regularTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularTestimonials.map((testimonial: Testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-[var(--color-bg)] rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i} className="text-sm">⭐</span>
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[var(--color-primary)] mb-2">{testimonial.treatment}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
                      <span className="text-lg">{testimonial.patientName?.charAt(0) || '👤'}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[var(--color-primary)]">{testimonial.patientName}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="px-2 py-1 bg-white text-[var(--color-primary)] rounded">{testimonial.treatment}</span>
                    <span className="text-gray-400">{new Date(testimonial.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-white/90 mb-8">
            Join thousands of satisfied patients who have transformed their health with Ayurveda
          </p>
          <Link
            href="/book-appointment"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Book Your Appointment <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
