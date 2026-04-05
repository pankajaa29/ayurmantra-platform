import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { MockDataService } from '../common/mock-data.service';
import {
  CreateTreatmentDto,
  UpdateTreatmentDto,
  TreatmentFilterDto,
  CreateCategoryDto,
} from './dto';

@ApiTags('Treatments')
@Controller('treatments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TreatmentsController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Get()
  @ApiOperation({ summary: 'Get all treatments with filters' })
  async findAll(@Query() filters: TreatmentFilterDto) {
    const treatments = this.mockDataService.getMockTreatments();
    
    // Apply filters
    let filtered = treatments;
    
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    
    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search)
      );
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(t => t.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(t => t.price <= filters.maxPrice);
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);
    
    return {
      data: paginated,
      meta: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      },
    };
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all treatment categories' })
  async getCategories() {
    return {
      data: this.mockDataService.getMockCategories(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get treatment by ID' })
  async findOne(@Param('id') id: string) {
    const treatments = this.mockDataService.getMockTreatments();
    const treatment = treatments.find(t => t.id === id);
    
    if (!treatment) {
      return { error: 'Treatment not found' };
    }
    
    return { data: treatment };
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create new treatment' })
  async create(@Body() createDto: CreateTreatmentDto) {
    // Mock creation - would save to database
    const newTreatment = {
      id: Date.now().toString(),
      ...createDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      message: 'Treatment created successfully',
      data: newTreatment,
    };
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update treatment' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTreatmentDto,
  ) {
    return {
      message: 'Treatment updated successfully',
      data: {
        id,
        ...updateDto,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete treatment' })
  async remove(@Param('id') id: string) {
    return {
      message: 'Treatment deleted successfully',
      data: { id },
    };
  }

  @Post('categories')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create category' })
  async createCategory(@Body() createDto: CreateCategoryDto) {
    const newCategory = {
      id: Date.now().toString(),
      ...createDto,
      createdAt: new Date().toISOString(),
    };
    
    return {
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  @Put('categories/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update category' })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateDto: CreateCategoryDto,
  ) {
    return {
      message: 'Category updated successfully',
      data: { id, ...updateDto },
    };
  }

  @Delete('categories/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete category' })
  async removeCategory(@Param('id') id: string) {
    return {
      message: 'Category deleted successfully',
      data: { id },
    };
  }
}
