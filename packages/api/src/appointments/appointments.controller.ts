import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto, QueryAppointmentDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all appointments' })
  async findAll(
    @Query() query: QueryAppointmentDto,
    @GetUser() user: any,
  ) {
    // Filter by patient if user is a patient
    if (user.role === 'PATIENT') {
      const patient = await this.appointmentsService['prisma'].patient.findUnique({
        where: { userId: user.id },
      });
      if (patient) {
        query.patientId = patient.id;
      }
    }
    
    return this.appointmentsService.findAll(query);
  }

  @Get('slots/:doctorId')
  @ApiOperation({ summary: 'Get available time slots for a doctor' })
  async getAvailableSlots(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
  ) {
    return this.appointmentsService.getAvailableSlots(doctorId, date);
  }

  @Get('doctors/:treatmentId')
  @ApiOperation({ summary: 'Get doctors for a treatment' })
  async getDoctorsByTreatment(@Param('treatmentId') treatmentId: string) {
    return this.appointmentsService.getDoctorsByTreatment(treatmentId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get appointment by ID' })
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create appointment' })
  async create(
    @Body() createDto: CreateAppointmentDto,
    @GetUser('id') userId?: string,
  ) {
    return this.appointmentsService.create(createDto, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update appointment' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAppointmentDto,
    @GetUser('id') userId?: string,
  ) {
    return this.appointmentsService.update(id, updateDto, userId);
  }
}
