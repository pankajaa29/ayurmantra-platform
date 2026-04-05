interface Props {
  content: {
    title: string;
    embedUrl?: string;
    address?: string;
  };
}

export function GoogleMapSection({ content }: Props) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-6">{content.title}</h2>
        <div className="rounded-2xl overflow-hidden border-2 border-[var(--color-border)]" style={{ minHeight: 400 }}>
          {content.embedUrl ? (
            <iframe
              src={content.embedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          ) : (
            <div className="h-[400px] bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-primary)]/20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl block mb-4">📍</span>
                <p className="text-gray-500">Google Maps Integration</p>
                {content.address && <p className="text-sm text-gray-400 mt-1">{content.address}</p>}
              </div>
            </div>
          )}
        </div>
        {content.address && content.embedUrl && (
          <p className="text-gray-500 text-sm mt-3">📍 {content.address}</p>
        )}
      </div>
    </section>
  );
}
