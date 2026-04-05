interface Props {
  content: {
    title: string;
    items: string[];
  };
}

export function BulletListSection({ content }: Props) {
  return (
    <section className="py-12 bg-[var(--color-bg)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
          <h3 className="font-semibold text-[var(--color-primary)] mb-4">{content.title}</h3>
          <ul className="space-y-3 text-sm">
            {content.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[var(--color-secondary)]">•</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
