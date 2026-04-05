import Link from 'next/link';

interface Props {
  content: {
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor?: string;
  };
}

export function CtaBannerSection({ content }: Props) {
  const bgColor = content.backgroundColor || 'var(--color-primary)';

  return (
    <section className="py-16" style={{ backgroundColor: bgColor }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
        {content.subtitle && <p className="text-white/80 text-lg mb-8">{content.subtitle}</p>}
        <Link
          href={content.buttonLink}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-secondary)] text-white font-medium rounded-xl hover:bg-[var(--color-secondary-dark)] transition-colors"
        >
          {content.buttonText} <span>→</span>
        </Link>
      </div>
    </section>
  );
}
