import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { PatientHeader } from '@/components/layout/PatientHeader';
import { PatientNav } from '@/components/layout/PatientNav';

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
    default: 'Patient Portal | AyurMantra',
    template: '%s | AyurMantra Patient Portal',
  },
  description: 'Access your health records, book appointments, and manage your wellness journey with AyurMantra.',
};

export default function PatientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#F8F6F0]">
        <div className="min-h-screen flex flex-col">
          <PatientHeader />
          <div className="flex flex-1">
            <PatientNav />
            <main className="flex-1 p-6 md:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
