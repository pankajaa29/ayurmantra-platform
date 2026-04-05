interface Props {
  content: {
    title: string;
    subtitle?: string;
    columns?: number;
    items: { icon: string; title: string; description: string }[];
  };
}

export function ValuesGridSection({ content }: Props) {
  const cols = content.columns || 4;
  const gridClass =
    cols === 2 ? 'md:grid-cols-2' :
    cols === 3 ? 'md:grid-cols-3' :
    'md:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">{content.title}</h2>
          {content.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
        <div className={`grid grid-cols-1 ${gridClass} gap-6`}>
          {content.items.map((item, i) => (
            <div key={i} className="bg-[var(--color-bg)] rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-[var(--color-primary)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[var(--color-primary)] mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
