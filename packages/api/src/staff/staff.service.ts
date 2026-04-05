import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { CreateStaffDto, UpdateStaffDto, StaffFilterDto } from './dto';

@Injectable()
export class StaffService {
  constructor(private readonly mockDataService: MockDataService) {}

  async findAll(filters: StaffFilterDto) {
    let staff = await this.mockDataService.getStaff();

    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase();
      staff = staff.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.email.toLowerCase().includes(search) ||
          s.specialization?.toLowerCase().includes(search)
      );
    }

    if (filters.role) {
      staff = staff.filter((s) => s.role === filters.role);
    }

    if (filters.status) {
      staff = staff.filter((s) => s.status === filters.status);
    }

    if (filters.department) {
      staff = staff.filter((s) => s.department === filters.department);
    }

    // Pagination
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const start = (page - 1) * limit;
    const paginated = staff.slice(start, start + limit);

    return {
      data: paginated,
      meta: {
        total: staff.length,
        page,
        limit,
        totalPages: Math.ceil(staff.length / limit),
      },
    };
  }

  async getDoctors() {
    const staff = await this.mockDataService.getStaff();
    const doctors = staff.filter(
      (s) => s.role === 'DOCTOR' && s.status === 'active'
    );
    return { data: doctors };
  }

  async findOne(id: string) {
    const staff = await this.mockDataService.getStaff();
    const member = staff.find((s) => s.id === id);
    
    if (!member) {
      throw new NotFoundException('Staff member not found');
    }
    
    return { data: member };
  }

  async create(data: CreateStaffDto) {
    const newStaff = await this.mockDataService.createStaff(data);
    return { data: newStaff };
  }

  async update(id: string, data: UpdateStaffDto) {
    const updated = await this.mockDataService.updateStaff(id, data);
    
    if (!updated) {
      throw new NotFoundException('Staff member not found');
    }
    
    return { data: updated };
  }

  async remove(id: string) {
    const deleted = await this.mockDataService.deleteStaff(id);
    
    if (!deleted) {
      throw new NotFoundException('Staff member not found');
    }
    
    return { message: 'Staff member deleted successfully' };
  }
}
