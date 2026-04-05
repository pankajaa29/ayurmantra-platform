import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { FloatingActions } from '@/components/layout/FloatingActions';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: 'AyurMantra - Discover Your Ayurvedic Path to Wellness',
    template: '%s | AyurMantra',
  },
  description: 'Experience authentic Ayurvedic treatments for holistic wellness. Personalized health solutions, Panchakarma therapies, and natural healing at AyurMantra.',
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2600/api/v1';

async function getThemeColors() {
  try {
    const res = await fetch(`${API_URL}/theme`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data?.colors || null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeColors = await getThemeColors();

  const themeStyle = themeColors ? {
    '--color-primary': themeColors.primary,
    '--color-primary-dark': themeColors.primaryDark,
    '--color-primary-light': themeColors.primaryLight,
    '--color-secondary': themeColors.secondary,
    '--color-secondary-dark': themeColors.secondaryDark,
    '--color-accent': themeColors.accent,
    '--color-accent-dark': themeColors.accentDark,
    '--color-bg': themeColors.background,
    '--color-border': themeColors.border,
    '--color-text': themeColors.text,
    '--color-text-light': themeColors.textLight,
  } as React.CSSProperties : undefined;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} style={themeStyle}>
      <body className="font-sans antialiased" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Header />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
        <MobileNav />
        <FloatingActions />
      </body>
    </html>
  );
}
