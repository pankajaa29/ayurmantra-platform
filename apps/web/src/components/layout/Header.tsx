'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT US' },
  { href: '/services', label: 'SERVICES' },
  { href: '/products', label: 'PRODUCTS' },
  { href: '/blog', label: 'BLOG' },
  { href: '/contact', label: 'CONTACT' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Ayurmeda */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-2xl">
              🌿
            </div>
            <span className="text-black font-serif text-2xl font-bold tracking-wide">
              AyurMantra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-semibold tracking-wider transition-colors rounded-full ${
                  pathname === link.href
                    ? 'bg-black/5 text-black'
                    : 'text-black/80 hover:bg-black/5 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/book-appointment"
              className="inline-flex items-center px-5 py-2.5 bg-[var(--color-secondary)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors shadow-md"
            >
              BOOK APPOINTMENT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black text-2xl"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-black/5">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-semibold rounded-lg ${
                  pathname === link.href
                    ? 'bg-black/5 text-black'
                    : 'text-black/80 hover:bg-black/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-appointment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 px-4 py-3 bg-[var(--color-secondary)] text-white text-center font-medium rounded-full"
            >
              BOOK APPOINTMENT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
