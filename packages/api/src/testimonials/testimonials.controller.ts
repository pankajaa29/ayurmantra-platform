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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto, TestimonialFilterDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  async findAll(@Query() filters: TestimonialFilterDto) {
    return this.testimonialsService.findAll(filters);
  }

  @Get('published')
  @ApiOperation({ summary: 'Get published testimonials for website' })
  async getPublished() {
    return this.testimonialsService.getPublished();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured testimonials' })
  async getFeatured() {
    return this.testimonialsService.getFeatured();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  async findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new testimonial' })
  async create(@Body() data: CreateTestimonialDto) {
    return this.testimonialsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update testimonial' })
  async update(@Param('id') id: string, @Body() data: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete testimonial' })
  async remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}
