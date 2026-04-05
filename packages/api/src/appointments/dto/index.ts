import { IsString, IsOptional, IsUUID, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  patientId?: string;

  @ApiProperty()
  @IsUUID()
  doctorId: string;

  @ApiProperty()
  @IsUUID()
  treatmentId: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsString()
  endTime: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiPropertyOptional({ enum: ['IN_PERSON', 'ONLINE', 'PHONE'] })
  @IsOptional()
  @IsEnum(['IN_PERSON', 'ONLINE', 'PHONE'])
  type?: 'IN_PERSON' | 'ONLINE' | 'PHONE';
}

export class UpdateAppointmentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'] })
  @IsOptional()
  @IsEnum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'])
  status?: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
}

export class QueryAppointmentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  patientId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @ApiPropertyOptional({ enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'] })
  @IsOptional()
  @IsEnum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date?: string;
}
