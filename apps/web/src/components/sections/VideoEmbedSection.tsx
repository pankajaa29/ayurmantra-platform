interface Props {
  content: {
    title: string;
    videoUrl: string;
    description?: string;
  };
}

export function VideoEmbedSection({ content }: Props) {
  if (!content.videoUrl) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] text-center mb-8">{content.title}</h2>
        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src={content.videoUrl}
            title={content.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {content.description && (
          <p className="text-gray-600 text-center mt-6">{content.description}</p>
        )}
      </div>
    </section>
  );
}
