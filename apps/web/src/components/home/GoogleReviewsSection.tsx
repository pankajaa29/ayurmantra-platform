'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  time: string;
  profilePhotoUrl?: string;
}

interface GoogleReviewsSectionProps {
  reviews: Review[];
  averageRating?: number;
  totalReviews?: number;
}

export function GoogleReviewsSection({
  reviews,
  averageRating = 4.9,
  totalReviews = 127,
}: GoogleReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Reviews
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xl ${i < Math.floor(averageRating) ? '' : 'opacity-30'}`}>⭐</span>
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
            <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real reviews from patients who have experienced our Ayurvedic treatments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {review.profilePhotoUrl ? (
                    <img
                      src={review.profilePhotoUrl}
                      alt={review.authorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium">
                      {review.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{review.authorName}</p>
                    <p className="text-xs text-gray-500">{formatDate(review.time)}</p>
                  </div>
                </div>
                <span className="text-2xl text-teal-200">❝</span>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < review.rating ? '' : 'opacity-30'}`}>⭐</span>
                ))}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="https://www.google.com/search?q=AyurMantra+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium"
          >
            View all reviews on Google
            <span>↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
