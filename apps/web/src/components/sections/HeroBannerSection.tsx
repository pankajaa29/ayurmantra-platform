import Link from 'next/link';

interface Props {
  content: {
    badge?: string;
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export function HeroBannerSection({ content }: Props) {
  return (
    <section
      className="relative py-24 bg-[var(--color-primary)]"
      style={content.backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(45,90,61,0.85), rgba(31,64,48,0.9)), url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {content.badge && (
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              {content.badge}
            </span>
          )}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="text-white/80 text-lg mb-8">{content.subtitle}</p>
          )}
          {content.ctaText && content.ctaLink && (
            <Link
              href={content.ctaLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-secondary)] text-white font-medium rounded-xl hover:bg-[var(--color-secondary-dark)] transition-colors"
            >
              {content.ctaText} <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
