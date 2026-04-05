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
import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto, StaffFilterDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  @ApiOperation({ summary: 'Get all staff members' })
  async findAll(@Query() filters: StaffFilterDto) {
    return this.staffService.findAll(filters);
  }

  @Get('doctors')
  @ApiOperation({ summary: 'Get all doctors for website' })
  async getDoctors() {
    return this.staffService.getDoctors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get staff member by ID' })
  async findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new staff member' })
  async create(@Body() data: CreateStaffDto) {
    return this.staffService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update staff member' })
  async update(@Param('id') id: string, @Body() data: UpdateStaffDto) {
    return this.staffService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete staff member' })
  async remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
