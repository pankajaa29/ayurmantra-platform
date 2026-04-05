import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { CreateFAQDto, UpdateFAQDto, FAQFilterDto } from './dto';

@Injectable()
export class FAQService {
  constructor(private readonly mockDataService: MockDataService) {}

  async findAll(filters: FAQFilterDto) {
    let faqs = await this.mockDataService.getFAQs();

    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase();
      faqs = faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(search) ||
          f.answer.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      faqs = faqs.filter((f) => f.category === filters.category);
    }

    if (filters.status) {
      faqs = faqs.filter((f) => f.status === filters.status);
    }

    // Sort by order then by date
    faqs.sort((a, b) => {
      if (a.order !== b.order) return (a.order || 0) - (b.order || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Pagination
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const start = (page - 1) * limit;
    const paginated = faqs.slice(start, start + limit);

    return {
      data: paginated,
      meta: {
        total: faqs.length,
        page,
        limit,
        totalPages: Math.ceil(faqs.length / limit),
      },
    };
  }

  async getPublished(category?: string) {
    let faqs = await this.mockDataService.getFAQs();
    faqs = faqs
      .filter((f) => f.status === 'PUBLISHED')
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    if (category) {
      faqs = faqs.filter((f) => f.category === category);
    }
    
    return { data: faqs };
  }

  async getCategories() {
    const faqs = await this.mockDataService.getFAQs();
    const categories = [...new Set(faqs.map((f) => f.category).filter(Boolean))];
    return { data: categories };
  }

  async findOne(id: string) {
    const faqs = await this.mockDataService.getFAQs();
    const faq = faqs.find((f) => f.id === id);
    
    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }
    
    return { data: faq };
  }

  async create(data: CreateFAQDto) {
    const newFAQ = await this.mockDataService.createFAQ(data);
    return { data: newFAQ };
  }

  async update(id: string, data: UpdateFAQDto) {
    const updated = await this.mockDataService.updateFAQ(id, data);
    
    if (!updated) {
      throw new NotFoundException('FAQ not found');
    }
    
    return { data: updated };
  }

  async remove(id: string) {
    const deleted = await this.mockDataService.deleteFAQ(id);
    
    if (!deleted) {
      throw new NotFoundException('FAQ not found');
    }
    
    return { message: 'FAQ deleted successfully' };
  }
}
