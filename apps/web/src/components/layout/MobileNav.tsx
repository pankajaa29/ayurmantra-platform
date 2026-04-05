'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mobileNavItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/tips', label: 'Tips', icon: '📝' },
  { href: '/remedies', label: 'Remedies', icon: '💊' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] z-50">
      <div className="flex items-center justify-around py-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-[var(--color-primary)]' : 'text-gray-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
