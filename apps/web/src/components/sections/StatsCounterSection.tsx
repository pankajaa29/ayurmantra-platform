interface Props {
  content: {
    title?: string;
    items: { icon: string; number: string; label: string }[];
  };
}

export function StatsCounterSection({ content }: Props) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content.title && (
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] text-center mb-12">{content.title}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.items.map((item, i) => (
            <div key={i} className="text-center">
              <span className="text-3xl block mb-2">{item.icon}</span>
              <p className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-1">{item.number}</p>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
