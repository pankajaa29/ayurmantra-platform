interface Props {
  content: {
    sectionLabel?: string;
    heading: string;
    body: string;
    image?: string;
    imagePosition?: 'left' | 'right';
  };
}

export function TextImageSection({ content }: Props) {
  const imageOnLeft = content.imagePosition === 'left';

  return (
    <section className="py-16 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imageOnLeft ? '' : ''}`}>
          <div className={imageOnLeft ? 'order-2' : 'order-1'}>
            {content.sectionLabel && (
              <span className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium rounded-full mb-4">
                {content.sectionLabel}
              </span>
            )}
            <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-6">{content.heading}</h2>
            <div
              className="prose text-gray-600 [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: content.body }}
            />
          </div>
          <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden ${imageOnLeft ? 'order-1' : 'order-2'}`}>
            {content.image ? (
              <img src={content.image} alt={content.heading} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary-light)]/30 to-[var(--color-primary)]/30 flex items-center justify-center">
                <span className="text-6xl">🏥</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
