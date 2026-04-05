interface Props {
  content: {
    title: string;
    subtitle?: string;
    showAll?: boolean;
    doctorIds?: string[];
  };
  doctors?: { id: string; name: string; role: string; specialization: string; experience: string; image?: string }[];
}

export function TeamSection({ content, doctors = [] }: Props) {
  return (
    <section className="py-16 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">{content.title}</h2>
          {content.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-[3/4] bg-gradient-to-br from-[var(--color-primary-light)]/30 to-[var(--color-primary)]/30 flex items-center justify-center">
                {doctor.image ? (
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">👨‍⚕️</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-1">{doctor.name}</h3>
                <p className="text-[var(--color-secondary)] font-medium text-sm mb-2">{doctor.specialization || doctor.role}</p>
                <p className="text-gray-500 text-sm">{doctor.experience} Experience</p>
              </div>
            </div>
          ))}
          {doctors.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-400">
              <span className="text-4xl block mb-2">👨‍⚕️</span>
              <p>Team members will appear here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
