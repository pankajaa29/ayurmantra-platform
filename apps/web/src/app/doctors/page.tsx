import { Metadata } from 'next';
import Link from 'next/link';
import { staffApi } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Our Doctors - Expert Ayurvedic Physicians',
  description: 'Meet our team of experienced Ayurvedic doctors and wellness experts. Book consultations with our specialists.',
};

interface Doctor {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  qualification: string;
  rating: number;
  reviews: number;
  patients: number;
  status: string;
  bio: string;
}

async function getDoctors() {
  try {
    const response = await staffApi.getDoctors();
    return response.data || [];
  } catch {
    return [];
  }
}

const stats = [
  { label: 'Expert Doctors', value: '4+', icon: '👥' },
  { label: 'Years Combined Exp.', value: '65+', icon: '🕐' },
  { label: 'Happy Patients', value: '40K+', icon: '✓' },
  { label: 'Success Rate', value: '98%', icon: '⭐' },
];

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              Our Medical Team
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our Expert Doctors
            </h1>
            <p className="text-white/80 text-lg">
              Our team of highly qualified Ayurvedic physicians combines ancient wisdom with modern healthcare standards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {doctors.map((doctor: Doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-primary)]/20 p-6 flex flex-col items-center justify-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-lg mb-4">
                        {doctor.name.charAt(0)}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <span>⭐</span>
                        <span className="font-bold text-lg">{doctor.rating || 4.8}</span>
                        <span className="text-gray-500 text-sm">({doctor.reviews || 0} reviews)</span>
                      </div>
                      <p className="text-sm text-gray-600 text-center">
                        {(doctor.patients || 0).toLocaleString()}+ patients treated
                      </p>
                    </div>

                    <div className="md:w-3/5 p-6">
                      <div className="mb-4">
                        <h3 className="font-serif text-xl font-bold text-[var(--color-primary)]">{doctor.name}</h3>
                        <p className="text-[var(--color-secondary)] font-medium">{doctor.role}</p>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{doctor.bio}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-[var(--color-secondary)]">🏆</span>
                          <span className="text-gray-600">{doctor.qualification}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-[var(--color-secondary)]">🕐</span>
                          <span className="text-gray-600">{doctor.experience} experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-[var(--color-secondary)]">🏆</span>
                          <span className="text-gray-600">{doctor.specialization}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                        <div className="text-sm">
                          <p className="text-gray-500">Status: {doctor.status === 'active' ? 'Available' : 'Unavailable'}</p>
                        </div>
                        <Link
                          href={`/book-appointment?doctor=${doctor.id}`}
                          className="inline-flex items-center px-4 py-2 bg-[var(--color-secondary)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors"
                        >
                          <span className="mr-1">📅</span>
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No doctors available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">Why Consult Our Doctors?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference of personalized Ayurvedic care from certified professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✓', title: 'Certified Experts', description: 'All our doctors are AYUSH certified with extensive clinical experience and continuous education.' },
              { icon: '👥', title: 'Personalized Care', description: 'Every treatment plan is customized based on your unique Prakriti and health conditions.' },
              { icon: '🏆', title: 'Proven Results', description: 'Over 40,000 successful treatments with high patient satisfaction and wellness outcomes.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-white/90 mb-8">
            Book a consultation with our expert doctors and discover the power of Ayurveda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <span>📅</span> Book Consultation
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/30 font-medium rounded-xl hover:bg-white/20 transition-colors"
            >
              View Treatments <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
