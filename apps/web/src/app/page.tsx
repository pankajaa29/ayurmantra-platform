import { homepageApi, mediaApi, socialApi } from '@/lib/api';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustBadges } from '@/components/home/TrustBadges';
import { ServicesSection } from '@/components/home/ServicesSection';
import { DoshaSection } from '@/components/home/DoshaSection';
import { DoctorsSection } from '@/components/home/DoctorsSection';
import { WhyChooseSection } from '@/components/home/WhyChooseSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { GallerySection } from '@/components/home/GallerySection';
import { FAQSection } from '@/components/home/FAQSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { CTASection } from '@/components/home/CTASection';
import { GoogleReviewsSection } from '@/components/home/GoogleReviewsSection';
import { InstagramFeedSection } from '@/components/home/InstagramFeedSection';

// Force dynamic rendering to always get fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getHomepageData() {
  try {
    const [homepageRes, mediaRes, googleReviewsRes, instagramRes] = await Promise.all([
      homepageApi.getSettings(),
      mediaApi.getAll({ limit: 50 }),
      socialApi.getGoogleReviews(),
      socialApi.getInstagramFeed(),
    ]);

    // Create a media lookup map
    const mediaMap = new Map();
    if (mediaRes.data) {
      mediaRes.data.forEach((item: any) => {
        mediaMap.set(item.id, item);
      });
    }

    // Resolve media references in homepage data
    const resolvedSections = homepageRes.data?.sections?.map((section: any) => {
      if (section.data?.backgroundImage) {
        const mediaItem = mediaMap.get(section.data.backgroundImage);
        if (mediaItem) {
          return {
            ...section,
            data: {
              ...section.data,
              backgroundImageUrl: mediaItem.url,
            },
          };
        }
      }
      return section;
    }) || [];

    return {
      sections: resolvedSections,
      googleReviews: googleReviewsRes.data,
      instagram: instagramRes.data,
      mediaMap,
    };
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return { sections: [], googleReviews: null, instagram: null, mediaMap: new Map() };
  }
}

export default async function HomePage() {
  const { sections, googleReviews, instagram, mediaMap } = await getHomepageData();

  // Get section data by ID
  const getSection = (id: string) => sections.find((s: any) => s.id === id)?.data;

  // Get media URL by ID
  const getMediaUrl = (id: string) => mediaMap.get(id)?.url || '';

  const heroData = getSection('hero');
  const trustBadgesData = getSection('trustBadges');
  const whyChooseData = getSection('whyChoose');
  const newsletterData = getSection('newsletter');
  const ctaData = getSection('cta');

  // Determine section order from CMS
  const sectionOrder = sections.map((s: any) => s.id);

  // Render sections based on order
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return heroData?.enabled !== false && (
          <HeroSection
            title={heroData?.title}
            subtitle={heroData?.subtitle}
            badgeText={heroData?.badgeText}
            primaryCtaText={heroData?.primaryCtaText}
            primaryCtaLink={heroData?.primaryCtaLink}
            secondaryCtaText={heroData?.secondaryCtaText}
            secondaryCtaLink={heroData?.secondaryCtaLink}
            backgroundImage={heroData?.backgroundImageUrl || getMediaUrl(heroData?.backgroundImage)}
          />
        );
      case 'trustBadges':
        return trustBadgesData?.enabled !== false && (
          <TrustBadges
            stats={trustBadgesData?.stats}
            certifications={trustBadgesData?.certifications}
          />
        );
      case 'treatments':
        return <ServicesSection />;
      case 'dosha':
        return <DoshaSection />;
      case 'doctors':
        return <DoctorsSection />;
      case 'whyChoose':
        return whyChooseData?.enabled !== false && (
          <WhyChooseSection
            title={whyChooseData?.title}
            subtitle={whyChooseData?.subtitle}
            features={whyChooseData?.features}
          />
        );
      case 'features':
        return <FeaturesSection />;
      case 'testimonials':
        return <TestimonialsSection />;
      case 'googleReviews':
        return googleReviews?.enabled && (
          <GoogleReviewsSection
            reviews={googleReviews.reviews}
            averageRating={googleReviews.averageRating}
            totalReviews={googleReviews.totalReviews}
          />
        );
      case 'gallery':
        return <GallerySection />;
      case 'instagram':
        return instagram?.enabled && (
          <InstagramFeedSection
            posts={instagram.posts}
            username={instagram.username}
            profileUrl={instagram.profileUrl}
          />
        );
      case 'faq':
        return <FAQSection />;
      case 'newsletter':
        return newsletterData?.enabled !== false && (
          <NewsletterSection
            title={newsletterData?.title}
            subtitle={newsletterData?.subtitle}
            buttonText={newsletterData?.buttonText}
          />
        );
      case 'cta':
        return ctaData?.enabled !== false && (
          <CTASection
            title={ctaData?.title}
            subtitle={ctaData?.subtitle}
            primaryButtonText={ctaData?.primaryButtonText}
            primaryButtonLink={ctaData?.primaryButtonLink}
            secondaryButtonText={ctaData?.secondaryButtonText}
            secondaryButtonLink={ctaData?.secondaryButtonLink}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {sectionOrder.length > 0 ? (
        // Render in CMS-defined order
        sectionOrder.map((sectionId: string) => (
          <div key={sectionId}>{renderSection(sectionId)}</div>
        ))
      ) : (
        // Fallback to default order if CMS data not available
        <>
          <HeroSection />
          <TrustBadges />
          <ServicesSection />
          <DoshaSection />
          <DoctorsSection />
          <WhyChooseSection />
          <FeaturesSection />
          <TestimonialsSection />
          {googleReviews?.enabled && (
            <GoogleReviewsSection
              reviews={googleReviews.reviews}
              averageRating={googleReviews.averageRating}
              totalReviews={googleReviews.totalReviews}
            />
          )}
          <GallerySection />
          {instagram?.enabled && (
            <InstagramFeedSection
              posts={instagram.posts}
              username={instagram.username}
              profileUrl={instagram.profileUrl}
            />
          )}
          <FAQSection />
          <NewsletterSection />
          <CTASection />
        </>
      )}
    </>
  );
}
