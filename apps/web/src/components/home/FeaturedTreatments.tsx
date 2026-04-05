'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const treatments = [
  {
    id: '1',
    title: 'Abhyanga (Full Body Massage)',
    description: 'Traditional Ayurvedic full body massage with warm herbal oils for complete rejuvenation.',
    duration: 60,
    price: 1500,
    image: '/images/treatments/abhyanga.jpg',
    slug: 'abhyanga-full-body-massage',
  },
  {
    id: '2',
    title: 'Shirodhara Therapy',
    description: 'Therapeutic pouring of warm herbal oil on the forehead for deep relaxation and stress relief.',
    duration: 45,
    price: 1200,
    image: '/images/treatments/shirodhara.jpg',
    slug: 'shirodhara',
  },
  {
    id: '3',
    title: 'Panchakarma Detox',
    description: 'Complete Ayurvedic detoxification and rejuvenation program to cleanse your body.',
    duration: 120,
    price: 5000,
    originalPrice: 4500,
    image: '/images/treatments/panchakarma.jpg',
    slug: 'panchakarma-detox',
    featured: true,
  },
];

export function FeaturedTreatments() {
  return (
    <section className="ayur-section bg-ayur-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="ayur-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4"
            >
              Popular Therapies
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl font-bold text-white"
            >
              Featured Treatments
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 text-white hover:text-ayur-secondary transition-colors mt-4 md:mt-0"
            >
              View All Treatments
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {treatment.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-ayur-secondary text-white text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-ayur-primary-900 mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {treatment.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <span>🕐</span>
                      {treatment.duration} mins
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="flex items-center text-xl font-bold text-ayur-primary">
                        ₹{treatment.originalPrice || treatment.price}
                      </span>
                      {treatment.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{treatment.price}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/book-appointment?treatment=${treatment.id}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
