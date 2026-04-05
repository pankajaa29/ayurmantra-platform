import { Metadata } from 'next';
import { treatmentsApi } from '@/lib/api';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our range of authentic Ayurvedic treatments including Panchakarma, Abhyanga, Shirodhara, and more.',
};

async function getTreatments() {
  try {
    return await treatmentsApi.getAll({ limit: 100 });
  } catch {
    return { data: [] };
  }
}

const defaultTreatments = [
  { id: '1', title: 'Abhyanga (Full Body Massage)', description: 'Traditional Ayurvedic full body massage with warm herbal oils for complete rejuvenation.', duration: 60, price: 1500 },
  { id: '2', title: 'Shirodhara Therapy', description: 'Therapeutic pouring of warm herbal oil on the forehead for deep relaxation.', duration: 45, price: 1200 },
  { id: '3', title: 'Panchakarma Detox', description: 'Complete Ayurvedic detoxification and rejuvenation program.', duration: 120, price: 5000 },
  { id: '4', title: 'Ayurvedic Facial', description: 'Natural facial treatment using Ayurvedic herbs and oils.', duration: 60, price: 1800 },
  { id: '5', title: 'Stress Management Program', description: 'Comprehensive program for stress relief and mental wellness.', duration: 90, price: 2500 },
  { id: '6', title: 'Herbal Steam Therapy', description: 'Traditional steam therapy with medicated herbs for detoxification.', duration: 30, price: 800 },
];

export default async function ServicesPage() {
  const treatmentsData = await getTreatments();
  const treatments = treatmentsData.data?.length > 0 ? treatmentsData.data : defaultTreatments;

  return (
    <>
      <section className="relative py-20 bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              Our Services
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Ayurvedic Treatments</h1>
            <p className="text-white/80 text-lg">
              Discover our comprehensive range of authentic Ayurvedic therapies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment: any) => (
              <div key={treatment.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-primary)]/20 flex items-center justify-center">
                  <span className="text-4xl">🌿</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>🕐</span> {treatment.duration} mins
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-2">{treatment.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{treatment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-xl font-bold text-[var(--color-primary)]">
                      ₹{treatment.price}
                    </span>
                    <Link
                      href={`/book-appointment?treatment=${treatment.id}`}
                      className="inline-flex items-center px-4 py-2 bg-[var(--color-secondary)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors"
                    >
                      Book Now <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-4">
            Not Sure Which Treatment is Right for You?
          </h2>
          <p className="text-white/70 mb-6">Take our dosha quiz or schedule a free consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dosha-quiz" className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-secondary)] text-white font-medium rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors">
              Take Dosha Quiz
            </Link>
            <Link href="/book-appointment" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white border border-white/30 font-medium rounded-full hover:bg-white/20 transition-colors">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
