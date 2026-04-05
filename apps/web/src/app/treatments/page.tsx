import Link from 'next/link';

const treatments = [
  {
    id: 'panchakarma',
    name: 'Panchakarma Detox',
    title: 'Complete Ayurvedic Detoxification & Rejuvenation',
    duration: '7-21 Days',
    price: '₹25,000 - ₹75,000',
    rating: 4.9,
    reviews: 456,
    description: 'Panchakarma is Ayurveda\'s premier detoxification and rejuvenation therapy. It involves five therapeutic procedures that eliminate toxins from the body, balance the doshas, and restore optimal health.',
    benefits: ['Complete body detoxification', 'Improved digestion and metabolism', 'Enhanced immunity', 'Stress relief and mental clarity', 'Weight management', 'Chronic disease management'],
    process: [
      { step: 1, title: 'Consultation', desc: 'Detailed assessment by our Ayurvedic physician' },
      { step: 2, title: 'Preparation', desc: 'Internal oleation and external therapies' },
      { step: 3, title: 'Main Treatment', desc: 'Five purificatory procedures based on your condition' },
      { step: 4, title: 'Rasayana', desc: 'Rejuvenation therapy with herbal medicines' },
    ],
    includes: ['Daily doctor consultation', 'All Ayurvedic medicines', 'Therapeutic treatments', 'Special diet meals', 'Yoga & meditation sessions', 'Accommodation (for residential)'],
  },
  {
    id: 'abhyanga',
    name: 'Abhyanga Massage',
    title: 'Traditional Full Body Oil Massage',
    duration: '60-90 Minutes',
    price: '₹1,500 - ₹2,500',
    rating: 4.8,
    reviews: 892,
    description: 'Abhyanga is a traditional Ayurvedic full-body massage using warm medicated oils. It promotes circulation, relieves muscle tension, and brings deep relaxation.',
    benefits: ['Improved blood circulation', 'Muscle relaxation and pain relief', 'Better sleep quality', 'Skin nourishment', 'Stress reduction', 'Enhanced immunity'],
    process: [
      { step: 1, title: 'Oil Selection', desc: 'Customized herbal oil based on your dosha' },
      { step: 2, title: 'Full Body Massage', desc: 'Synchronized massage by two therapists' },
      { step: 3, title: 'Steam Therapy', desc: 'Herbal steam to enhance oil absorption' },
      { step: 4, title: 'Relaxation', desc: 'Rest period for complete absorption' },
    ],
    includes: ['Herbal massage oil', 'Steam therapy', 'Shower facilities', 'Herbal tea'],
  },
  {
    id: 'shirodhara',
    name: 'Shirodhara Therapy',
    title: 'Ancient Oil Pouring Treatment for Mind',
    duration: '45-60 Minutes',
    price: '₹1,200 - ₹1,800',
    rating: 4.9,
    reviews: 534,
    description: 'Shirodhara involves pouring a continuous stream of warm herbal oil on the forehead. It deeply relaxes the nervous system, relieves stress, and promotes mental clarity.',
    benefits: ['Deep mental relaxation', 'Relief from anxiety and depression', 'Better sleep quality', 'Improved concentration', 'Headache and migraine relief', 'Hair nourishment'],
    process: [
      { step: 1, title: 'Preparation', desc: 'Mild head massage with herbal oil' },
      { step: 2, title: 'Shirodhara', desc: 'Continuous oil stream on third eye' },
      { step: 3, title: 'Scalp Massage', desc: 'Gentle massage during the process' },
      { step: 4, title: 'Rest', desc: 'Relaxation period post-treatment' },
    ],
    includes: ['Specialized Shirodhara oil', 'Head massage', 'Relaxation room', 'Post-treatment tea'],
  },
];

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-16">
        <div className="ayur-container">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4">
            <span>←</span> Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Treatments</h1>
          <p className="text-white/80 max-w-2xl">
            Discover our comprehensive range of authentic Ayurvedic treatments, 
            each designed to restore balance and promote holistic wellness.
          </p>
        </div>
      </div>

      <div className="ayur-container py-16">
        <div className="grid gap-8">
          {treatments.map((treatment, index) => (
            <div key={treatment.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[var(--color-border)]">
              <div className="grid md:grid-cols-2 gap-0">
                <div className={`relative h-64 md:h-auto bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] 
                               flex items-center justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <span className="text-8xl font-serif text-white/20">{treatment.name.charAt(0)}</span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      {treatment.duration}
                    </div>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                      <span>⭐</span>
                      {treatment.rating} ({treatment.reviews})
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-2">{treatment.name}</h2>
                  <p className="text-[var(--color-secondary)] font-medium mb-4">{treatment.title}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center gap-1 text-gray-600">
                      <span>🕐</span> {treatment.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[var(--color-secondary)] font-bold">
                      <span>💰</span> {treatment.price}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{treatment.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[var(--color-primary)] mb-3">Key Benefits</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {treatment.benefits.slice(0, 4).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-green-500 shrink-0">✓</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/treatments/${treatment.id}`}
                      className="flex-1 bg-[var(--color-primary)] text-white py-3 px-6 rounded-xl font-medium 
                               text-center hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/book-appointment"
                      className="flex items-center gap-2 bg-[var(--color-secondary)] text-white py-3 px-6 rounded-xl 
                               font-medium hover:bg-[var(--color-secondary-dark)] transition-colors"
                    >
                      <span>📅</span> Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Looking for a customized treatment plan?</p>
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-dark)] 
                     text-white py-4 px-8 rounded-full font-medium hover:shadow-xl transition-all"
          >
            Get Free Consultation <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
