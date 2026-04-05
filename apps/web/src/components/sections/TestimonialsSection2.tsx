interface Props {
  content: {
    title: string;
    subtitle?: string;
  };
  testimonials?: { id: string; name: string; rating: number; comment: string; location?: string }[];
}

export function TestimonialsSection2({ content, testimonials = [] }: Props) {
  return (
    <section className="py-16 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">{content.title}</h2>
          {content.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--color-border)]">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < t.rating ? '' : 'opacity-30'}`}>⭐</span>
                ))}
              </div>
              <span className="text-3xl text-[var(--color-primary)]/20">❝</span>
              <p className="text-gray-600 text-sm mb-4">{t.comment}</p>
              <div className="border-t border-[var(--color-border)] pt-4">
                <p className="font-semibold text-[var(--color-primary)]">{t.name}</p>
                {t.location && <p className="text-gray-400 text-xs">{t.location}</p>}
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-400">
              <span className="text-4xl block mb-2">💬</span>
              <p>Testimonials will appear here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
