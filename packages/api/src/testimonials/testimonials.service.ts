import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { CreateTestimonialDto, UpdateTestimonialDto, TestimonialFilterDto } from './dto';

@Injectable()
export class TestimonialsService {
  constructor(private readonly mockDataService: MockDataService) {}

  async findAll(filters: TestimonialFilterDto) {
    let testimonials = await this.mockDataService.getTestimonials();

    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase();
      testimonials = testimonials.filter(
        (t) =>
          t.patientName.toLowerCase().includes(search) ||
          t.content.toLowerCase().includes(search) ||
          t.treatment.toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      testimonials = testimonials.filter((t) => t.status === filters.status);
    }

    if (filters.featured !== undefined) {
      testimonials = testimonials.filter((t) => t.featured === filters.featured);
    }

    if (filters.treatment) {
      testimonials = testimonials.filter((t) => t.treatment === filters.treatment);
    }

    // Sort by date (newest first)
    testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const start = (page - 1) * limit;
    const paginated = testimonials.slice(start, start + limit);

    return {
      data: paginated,
      meta: {
        total: testimonials.length,
        page,
        limit,
        totalPages: Math.ceil(testimonials.length / limit),
      },
    };
  }

  async getPublished() {
    const testimonials = await this.mockDataService.getTestimonials();
    const published = testimonials
      .filter((t) => t.status === 'PUBLISHED')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return { data: published };
  }

  async getFeatured() {
    const testimonials = await this.mockDataService.getTestimonials();
    const featured = testimonials
      .filter((t) => t.featured && t.status === 'PUBLISHED')
      .slice(0, 6);
    return { data: featured };
  }

  async findOne(id: string) {
    const testimonials = await this.mockDataService.getTestimonials();
    const testimonial = testimonials.find((t) => t.id === id);
    
    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }
    
    return { data: testimonial };
  }

  async create(data: CreateTestimonialDto) {
    const newTestimonial = await this.mockDataService.createTestimonial(data);
    return { data: newTestimonial };
  }

  async update(id: string, data: UpdateTestimonialDto) {
    const updated = await this.mockDataService.updateTestimonial(id, data);
    
    if (!updated) {
      throw new NotFoundException('Testimonial not found');
    }
    
    return { data: updated };
  }

  async remove(id: string) {
    const deleted = await this.mockDataService.deleteTestimonial(id);
    
    if (!deleted) {
      throw new NotFoundException('Testimonial not found');
    }
    
    return { message: 'Testimonial deleted successfully' };
  }
}
