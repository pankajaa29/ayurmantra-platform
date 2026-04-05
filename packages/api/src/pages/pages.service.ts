import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { UpdatePageDto } from './dto';

@Injectable()
export class PagesService {
  constructor(private readonly mockDataService: MockDataService) {}

  async getPage(slug: string) {
    const page = await this.mockDataService.getPage(slug);
    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }

    const visibleSections = page.sections
      .filter((s: any) => s.visible)
      .sort((a: any, b: any) => a.order - b.order);

    return {
      data: {
        slug: page.slug,
        title: page.title,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        sections: visibleSections,
      },
    };
  }

  async getPageAdmin(slug: string) {
    const page = await this.mockDataService.getPage(slug);
    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }

    return {
      data: page,
    };
  }

  async updatePage(slug: string, data: UpdatePageDto) {
    const page = await this.mockDataService.getPage(slug);
    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }

    const updated = await this.mockDataService.updatePage(slug, data);

    return {
      message: `Page '${slug}' updated successfully`,
      data: updated,
    };
  }

  async getSectionTypes() {
    return {
      data: [
        { type: 'HERO_BANNER', label: 'Hero Banner', description: 'Full-width banner with title, subtitle, and CTA button', icon: '🎯' },
        { type: 'TEXT_IMAGE', label: 'Text + Image', description: 'Split layout with text and image side by side', icon: '📝' },
        { type: 'VALUES_GRID', label: 'Values / Features Grid', description: 'Grid of icon cards (2-4 columns)', icon: '⭐' },
        { type: 'TEAM', label: 'Team / Doctors', description: 'Staff profile cards pulled from Doctor Management', icon: '👨‍⚕️' },
        { type: 'CONTACT_CARDS', label: 'Contact Info Cards', description: 'Cards showing phone, email, address, hours', icon: '📞' },
        { type: 'CONTACT_FORM', label: 'Contact Form', description: 'Inquiry form with customizable fields', icon: '📋' },
        { type: 'GOOGLE_MAP', label: 'Google Map', description: 'Embedded Google Maps location', icon: '📍' },
        { type: 'FAQ_SECTION', label: 'FAQ Accordion', description: 'Expandable question and answer list', icon: '❓' },
        { type: 'TESTIMONIALS', label: 'Testimonials', description: 'Customer review carousel', icon: '💬' },
        { type: 'CTA_BANNER', label: 'Call to Action', description: 'Highlighted banner with action button', icon: '📢' },
        { type: 'GALLERY', label: 'Image Gallery', description: 'Photo grid with lightbox preview', icon: '📷' },
        { type: 'VIDEO_EMBED', label: 'Video Embed', description: 'YouTube or video player section', icon: '🎬' },
        { type: 'RICH_TEXT', label: 'Rich Text Block', description: 'Free-form content with formatting', icon: '📄' },
        { type: 'WHATSAPP_CTA', label: 'WhatsApp CTA', description: 'WhatsApp chat call-to-action strip', icon: '💬' },
        { type: 'STATS_COUNTER', label: 'Stats / Counters', description: 'Number highlights with labels', icon: '📊' },
        { type: 'BULLET_LIST', label: 'Bullet List', description: 'Simple information list with title', icon: '📋' },
      ],
    };
  }
}
