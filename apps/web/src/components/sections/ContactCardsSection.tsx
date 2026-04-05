interface Props {
  content: {
    items: {
      icon: string;
      title: string;
      details: string[];
      actionText: string;
      actionLink: string;
    }[];
  };
}

export function ContactCardsSection({ content }: Props) {
  return (
    <section className="py-16 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-[var(--color-primary)] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-3">{item.title}</h3>
              <div className="space-y-1 mb-4">
                {item.details.map((detail, j) => (
                  <p key={j} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
              <a
                href={item.actionLink}
                className="inline-flex items-center text-[var(--color-secondary)] font-medium text-sm hover:underline"
              >
                {item.actionText} <span className="ml-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
