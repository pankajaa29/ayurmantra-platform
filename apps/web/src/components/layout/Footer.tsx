'use client';

import Link from 'next/link';

const footerLinks = {
  treatments: [
    { label: 'Panchakarma', href: '/treatments/panchakarma' },
    { label: 'Abhyanga Massage', href: '/treatments/abhyanga' },
    { label: 'Shirodhara', href: '/treatments/shirodhara' },
    { label: 'Ayurvedic Facial', href: '/treatments/facial' },
    { label: 'Stress Management', href: '/treatments/stress' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/doctors' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  support: [
    { label: 'Patient Portal', href: 'http://localhost:2700' },
    { label: 'Book Appointment', href: 'http://localhost:2700/book-appointment' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const certifications = [
  { name: 'AYUSH Certified', icon: '🛡️' },
  { name: 'ISO 9001:2015', icon: '🏆' },
  { name: 'NABH', icon: '⭐' },
];

const socialIcons = ['📘', '📷', '🐦', '📺'];

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      {/* Certifications Bar */}
      <div className="border-b border-white/10">
        <div className="ayur-container py-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-sm text-white/60">Certified & Accredited:</span>
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center gap-2 text-white/80">
                <span className="text-[var(--color-accent)]">{cert.icon}</span>
                <span className="text-sm">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="ayur-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-2xl">
                🌿
              </div>
              <span className="font-serif text-2xl font-bold">AyurMantra</span>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              Experience the ancient wisdom of Ayurveda with modern healthcare standards. 
              Your journey to holistic wellness begins here.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/80">
                <span className="text-[var(--color-accent)] text-xl shrink-0 mt-0.5">📍</span>
                <span className="text-sm">123 Wellness Lane, Ayurveda Nagar<br />Kerala, India 682001</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <span className="text-[var(--color-accent)] text-xl shrink-0">📞</span>
                <span className="text-sm">+91 800-123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <span className="text-[var(--color-accent)] text-xl shrink-0">✉️</span>
                <span className="text-sm">info@ayurmantra.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <span className="text-[var(--color-accent)] text-xl shrink-0">🕐</span>
                <span className="text-sm">Mon-Sat: 9AM - 8PM | Sun: 10AM - 4PM</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[var(--color-accent)]">Treatments</h4>
            <ul className="space-y-3">
              {footerLinks.treatments.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[var(--color-accent)] transition-colors text-sm flex items-center gap-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[var(--color-accent)]">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[var(--color-accent)] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[var(--color-accent)]">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[var(--color-accent)] transition-colors text-sm flex items-center gap-1">
                    {link.label}
                    {link.label.includes('Portal') && <span>↗</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60">Follow us:</span>
              <div className="flex gap-3">
                {socialIcons.map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl
                             hover:bg-[var(--color-accent)] transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-white/50">Recognized by</p>
                <p className="text-sm font-medium">Ministry of AYUSH</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-xs text-white/50">Award</p>
                <p className="text-sm font-medium">Best Wellness Center 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="ayur-container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} AyurMantra Wellness Center. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-[var(--color-accent)]/10 py-3">
        <div className="ayur-container flex items-center justify-center gap-6 text-xs text-white/50">
          <span className="flex items-center gap-1">
            🛡️ SSL Secured
          </span>
          <span>|</span>
          <span>100% Safe & Secure Payments</span>
          <span>|</span>
          <span>Money Back Guarantee</span>
        </div>
      </div>
    </footer>
  );
}
