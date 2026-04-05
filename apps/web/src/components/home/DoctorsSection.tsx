'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { staffApi } from '@/lib/api';

interface Doctor {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  qualification: string;
  status: string;
}

export function DoctorsSection() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await staffApi.getDoctors();
      if (response.data) {
        // Only show active doctors, limit to 4
        const activeDoctors = response.data
          .filter((d: Doctor) => d.status === 'active')
          .slice(0, 4);
        setDoctors(activeDoctors);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="ayur-section bg-white">
        <div className="ayur-container">
          <div className="flex items-center justify-center py-20">
            <span className="text-4xl animate-spin">⏳</span>
            <span className="ml-3 text-gray-600">Loading doctors...</span>
          </div>
        </div>
      </section>
    );
  }

  if (doctors.length === 0) {
    return null; // Hide section if no doctors
  }

  return (
    <section className="ayur-section bg-white">
      <div className="ayur-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-4">
            🏆 Award-Winning Team
          </span>
          <h2 className="heading-classical mb-4">Meet Our Expert Doctors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of highly qualified Ayurvedic physicians combines ancient wisdom with modern healthcare standards
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group card-ayur"
            >
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-serif text-white/30">{doctor.name.charAt(0)}</span>
                </div>
                {doctor.status === 'active' && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Available
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-medium">{doctor.experience} experience</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-1">{doctor.name}</h3>
                <p className="text-[var(--color-secondary)] text-sm font-medium mb-2">{doctor.role}</p>
                <p className="text-gray-600 text-sm mb-3">{doctor.specialization}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-bold text-gray-800">{doctor.rating || 4.8}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-500">{doctor.reviews || 0} reviews</span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-[var(--color-secondary)]">🏆</span>
                    {doctor.qualification}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-[var(--color-primary)] 
                           text-[var(--color-primary)] rounded-lg font-medium text-sm
                           group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all"
                >
                  <span>📅</span>
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-[var(--color-secondary)] font-medium hover:gap-4 transition-all"
          >
            View All Doctors
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
