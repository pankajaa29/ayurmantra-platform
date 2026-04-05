import { Injectable } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { CreateAppointmentDto, UpdateAppointmentDto, QueryAppointmentDto } from './dto';

@Injectable()
export class AppointmentsService {
  constructor(private mockData: MockDataService) {}

  async findAll(query: QueryAppointmentDto) {
    return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }

  async findOne(id: string) {
    return null;
  }

  async create(createDto: CreateAppointmentDto, patientUserId?: string) {
    // Mock appointment creation
    return {
      id: Date.now().toString(),
      ...createDto,
      patientId: patientUserId || 'mock-patient',
      status: 'PENDING',
      createdAt: new Date(),
    };
  }

  async update(id: string, updateDto: UpdateAppointmentDto, userId?: string) {
    return {
      id,
      ...updateDto,
      updatedAt: new Date(),
    };
  }

  async getAvailableSlots(doctorId: string, date: string) {
    return this.mockData.getAvailableSlots(doctorId, date);
  }

  async getDoctorsByTreatment(treatmentId: string) {
    return this.mockData.getDoctorsByTreatment(treatmentId);
  }
}
