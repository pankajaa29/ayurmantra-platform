import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Photo Gallery - Our Wellness Center',
  description: 'Explore our state-of-the-art Ayurvedic wellness center, treatment rooms, and herbal gardens through our photo gallery.',
};

const galleryImages = [
  {
    id: '1',
    category: 'facility',
    title: 'Reception & Waiting Area',
    description: 'Warm and welcoming reception with traditional Indian decor',
    emoji: '🏥',
  },
  {
    id: '2',
    category: 'treatment',
    title: 'Panchakarma Treatment Room',
    description: 'State-of-the-art Panchakarma therapy suite',
    emoji: '🧘',
  },
  {
    id: '3',
    category: 'facility',
    title: 'Yoga & Meditation Hall',
    description: 'Peaceful space for yoga and meditation practice',
    emoji: '🧘‍♀️',
  },
  {
    id: '4',
    category: 'treatment',
    title: 'Massage Therapy Room',
    description: 'Private rooms for Abhyanga and other massage therapies',
    emoji: '💆',
  },
  {
    id: '5',
    category: 'herbs',
    title: 'Herbal Garden',
    description: 'Organic cultivation of medicinal herbs and plants',
    emoji: '🌿',
  },
  {
    id: '6',
    category: 'facility',
    title: 'Consultation Rooms',
    description: 'Private consultation spaces with expert doctors',
    emoji: '🩺',
  },
  {
    id: '7',
    category: 'treatment',
    title: 'Shirodhara Setup',
    description: 'Traditional Shirodhara oil therapy equipment',
    emoji: '💧',
  },
  {
    id: '8',
    category: 'herbs',
    title: 'Medicine Preparation Area',
    description: 'Where we prepare authentic Ayurvedic medicines',
    emoji: '⚗️',
  },
  {
    id: '9',
    category: 'facility',
    title: 'Steam Therapy Room',
    description: 'Herbal steam therapy for detoxification',
    emoji: '🧖',
  },
  {
    id: '10',
    category: 'herbs',
    title: 'Ingredient Storage',
    description: 'Carefully stored organic herbs and ingredients',
    emoji: '🫙',
  },
  {
    id: '11',
    category: 'treatment',
    title: 'Facial Treatment Room',
    description: 'Ayurvedic facial and beauty treatments',
    emoji: '✨',
  },
  {
    id: '12',
    category: 'facility',
    title: 'Dining Area',
    description: 'Serving authentic Ayurvedic meals to patients',
    emoji: '🍽️',
  },
];

const categories = [
  { id: 'all', label: 'All Photos', count: galleryImages.length },
  { id: 'facility', label: 'Facility', count: galleryImages.filter(i => i.category === 'facility').length },
  { id: 'treatment', label: 'Treatment Rooms', count: galleryImages.filter(i => i.category === 'treatment').length },
  { id: 'herbs', label: 'Herbal Garden', count: galleryImages.filter(i => i.category === 'herbs').length },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              📸 Virtual Tour
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Experience Our Sanctuary
            </h1>
            <p className="text-white/80 text-lg">
              Take a visual tour of our award-winning Ayurvedic wellness center designed for holistic healing
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15,000', label: 'Sq. Ft. Facility' },
              { value: '12', label: 'Treatment Rooms' },
              { value: '5', label: 'Herbal Gardens' },
              { value: '100+', label: 'Organic Herbs' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[var(--color-primary)]">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.id === 'all'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-white text-gray-600 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]'
                }`}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-70">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-primary)]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-6xl">{image.emoji}</span>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs rounded mb-2">
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-white">
                      {image.title}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[var(--color-primary)]">
                  {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                </div>

                {/* Always visible title */}
                <div className="p-4 bg-white">
                  <h3 className="font-serif text-lg font-semibold text-[var(--color-primary)] mb-1">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">
              World-Class Facilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our center is designed to provide the most authentic and comfortable Ayurvedic healing experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🌿',
                title: 'Organic Herb Garden',
                description: 'Cultivating 100+ medicinal herbs used in our treatments',
              },
              {
                icon: '♨️',
                title: 'Steam Therapy Suites',
                description: 'Traditional swedana therapy with herbal steam',
              },
              {
                icon: '🧘',
                title: 'Meditation Hall',
                description: 'Peaceful space for yoga and meditation practices',
              },
              {
                icon: '🍃',
                title: 'Eco-Friendly Design',
                description: 'Sustainable construction with natural materials',
              },
              {
                icon: '💧',
                title: 'Pure Water Systems',
                description: 'RO purified water for all treatments and consumption',
              },
              {
                icon: '🛡️',
                title: 'Hygiene Standards',
                description: 'Hospital-grade cleanliness and sterilization',
              },
              {
                icon: '🅿️',
                title: 'Ample Parking',
                description: 'Free parking for patients and visitors',
              },
              {
                icon: '♿',
                title: 'Accessibility',
                description: 'Wheelchair accessible entrance and facilities',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-[var(--color-bg)] rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-3 block">{feature.icon}</span>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Visit Us in Person
          </h2>
          <p className="text-white/90 mb-8">
            Experience the tranquility and healing atmosphere of our wellness center firsthand. 
            We welcome you to take a guided tour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Book a Tour
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/30 font-medium rounded-xl hover:bg-white/20 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
