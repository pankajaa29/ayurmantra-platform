interface Props {
  content: {
    title?: string;
    body: string;
  };
}

export function RichTextSection({ content }: Props) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {content.title && (
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-8">{content.title}</h2>
        )}
        <div
          className="prose prose-lg max-w-none text-gray-600 [&>p]:mb-4 [&>h2]:text-[var(--color-primary)] [&>h3]:text-[var(--color-primary)] [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </div>
    </section>
  );
}
