import { Injectable } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { CreateTreatmentDto, UpdateTreatmentDto, TreatmentFilterDto as QueryTreatmentDto } from './dto';

@Injectable()
export class TreatmentsService {
  constructor(private mockData: MockDataService) {}

  async findAll(query: QueryTreatmentDto) {
    return this.mockData.getAllTreatments(query);
  }

  async findOne(id: string) {
    return this.mockData.getTreatmentById(id);
  }

  async findBySlug(slug: string) {
    return this.mockData.getTreatmentBySlug(slug);
  }

  async create(createDto: CreateTreatmentDto, userId: string) {
    // In mock mode, just return the created treatment
    return {
      id: Date.now().toString(),
      ...createDto,
      createdById: userId,
      createdAt: new Date(),
    };
  }

  async update(id: string, updateDto: UpdateTreatmentDto) {
    return {
      id,
      ...updateDto,
      updatedAt: new Date(),
    };
  }

  async remove(id: string) {
    return { id, deleted: true };
  }

  async getCategories() {
    return this.mockData.getCategories();
  }

  async getFeatured() {
    return this.mockData.getFeaturedTreatments();
  }
}
