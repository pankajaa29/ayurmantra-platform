import { Metadata } from 'next';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2600/api/v1';

async function getPageData() {
  try {
    const [pageRes, testimonialsRes] = await Promise.all([
      fetch(`${API_URL}/pages/contact`, { cache: 'no-store' }),
      fetch(`${API_URL}/testimonials?status=published&limit=6`, { cache: 'no-store' }),
    ]);

    const pageData = pageRes.ok ? await pageRes.json() : null;
    const testimonialsData = testimonialsRes.ok ? await testimonialsRes.json() : null;

    return {
      page: pageData?.data || null,
      testimonials: (testimonialsData?.data || []).map((t: any) => ({
        id: t.id,
        name: t.name || t.patientName,
        rating: t.rating || 5,
        comment: t.content || t.comment,
        location: t.location || '',
      })),
    };
  } catch {
    return { page: null, testimonials: [] };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPageData();
  return {
    title: page?.metaTitle || 'Contact Us | AyurMantra',
    description: page?.metaDescription || 'Get in touch with AyurMantra.',
  };
}

export default async function ContactPage() {
  const { page, testimonials } = await getPageData();

  if (!page || !page.sections || page.sections.length === 0) {
    return (
      <section className="py-24 bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-white/70 mt-4">Page content is being set up. Please check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <SectionRenderer
      sections={page.sections}
      sharedData={{ testimonials }}
    />
  );
}
