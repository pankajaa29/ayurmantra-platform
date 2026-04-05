interface Props {
  content: {
    title: string;
    subtitle?: string;
    phoneNumber: string;
    buttonText: string;
  };
}

export function WhatsappCtaSection({ content }: Props) {
  return (
    <section className="py-12 bg-[#25D366]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#25D366] rounded-xl flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-800">{content.title}</h3>
              {content.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
            </div>
          </div>
          <a
            href={`https://wa.me/${content.phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#128C7E] transition-colors"
          >
            <span>💬</span> {content.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
