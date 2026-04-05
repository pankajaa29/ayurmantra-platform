'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: '🏆',
    title: '15+ Years Experience',
    description: 'Trusted expertise in authentic Ayurvedic treatments and wellness programs.',
  },
  {
    icon: '👥',
    title: 'Expert Practitioners',
    description: 'Our team includes certified Ayurvedic doctors and experienced therapists.',
  },
  {
    icon: '🌿',
    title: '100% Natural Products',
    description: 'All treatments use pure, organic herbs and traditional formulations.',
  },
  {
    icon: '🛡️',
    title: 'Personalized Care',
    description: 'Customized treatment plans based on your unique body constitution.',
  },
];

const stats = [
  { value: '2500+', label: 'Happy Patients' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Expert Therapists' },
  { value: '100%', label: 'Natural Products' },
];

export function WhyChooseUs() {
  return (
    <section className="ayur-section bg-white overflow-hidden">
      <div className="ayur-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/why-choose-us.jpg"
                alt="Ayurvedic treatment"
                fill
                className="object-cover"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-ayur-primary text-white rounded-2xl p-6 shadow-xl"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-ayur-accent/10 text-ayur-accent text-sm font-medium mb-4"
            >
              Why Choose Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl font-bold text-ayur-primary-900 mb-6"
            >
              Holistic Healing with Ayurveda
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-8"
            >
              At AyurMantra, we combine ancient Ayurvedic wisdom with modern 
              wellness practices to provide you with the most effective and 
              personalized treatments. Our commitment to authenticity and quality 
              sets us apart.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-ayur-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-10 border-t border-ayur-earth/20"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-ayur-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
