import { HeroBannerSection } from './HeroBannerSection';
import { TextImageSection } from './TextImageSection';
import { ValuesGridSection } from './ValuesGridSection';
import { TeamSection } from './TeamSection';
import { ContactCardsSection } from './ContactCardsSection';
import { ContactFormSection } from './ContactFormSection';
import { GoogleMapSection } from './GoogleMapSection';
import { FaqSectionBlock } from './FaqSectionBlock';
import { TestimonialsSection2 } from './TestimonialsSection2';
import { CtaBannerSection } from './CtaBannerSection';
import { GallerySection2 } from './GallerySection2';
import { VideoEmbedSection } from './VideoEmbedSection';
import { RichTextSection } from './RichTextSection';
import { WhatsappCtaSection } from './WhatsappCtaSection';
import { StatsCounterSection } from './StatsCounterSection';
import { BulletListSection } from './BulletListSection';

interface PageSection {
  id: string;
  type: string;
  order: number;
  visible: boolean;
  content: any;
}

interface SharedData {
  doctors?: any[];
  testimonials?: any[];
}

export function SectionRenderer({ sections, sharedData = {} }: { sections: PageSection[]; sharedData?: SharedData }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case 'HERO_BANNER':
            return <HeroBannerSection key={section.id} content={section.content} />;
          case 'TEXT_IMAGE':
            return <TextImageSection key={section.id} content={section.content} />;
          case 'VALUES_GRID':
            return <ValuesGridSection key={section.id} content={section.content} />;
          case 'TEAM':
            return <TeamSection key={section.id} content={section.content} doctors={sharedData.doctors} />;
          case 'CONTACT_CARDS':
            return <ContactCardsSection key={section.id} content={section.content} />;
          case 'CONTACT_FORM':
            return <ContactFormSection key={section.id} content={section.content} />;
          case 'GOOGLE_MAP':
            return <GoogleMapSection key={section.id} content={section.content} />;
          case 'FAQ_SECTION':
            return <FaqSectionBlock key={section.id} content={section.content} />;
          case 'TESTIMONIALS':
            return <TestimonialsSection2 key={section.id} content={section.content} testimonials={sharedData.testimonials} />;
          case 'CTA_BANNER':
            return <CtaBannerSection key={section.id} content={section.content} />;
          case 'GALLERY':
            return <GallerySection2 key={section.id} content={section.content} />;
          case 'VIDEO_EMBED':
            return <VideoEmbedSection key={section.id} content={section.content} />;
          case 'RICH_TEXT':
            return <RichTextSection key={section.id} content={section.content} />;
          case 'WHATSAPP_CTA':
            return <WhatsappCtaSection key={section.id} content={section.content} />;
          case 'STATS_COUNTER':
            return <StatsCounterSection key={section.id} content={section.content} />;
          case 'BULLET_LIST':
            return <BulletListSection key={section.id} content={section.content} />;
          default:
            return null;
        }
      })}
    </>
  );
}
