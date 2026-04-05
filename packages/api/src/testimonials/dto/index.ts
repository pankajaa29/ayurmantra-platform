import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TestimonialStatus {
  PUBLISHED = 'PUBLISHED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  patientName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsString()
  treatment: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ enum: TestimonialStatus })
  @IsOptional()
  @IsEnum(TestimonialStatus)
  status?: TestimonialStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasBeforeAfter?: boolean;
}

export class UpdateTestimonialDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patientName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ enum: TestimonialStatus })
  @IsOptional()
  @IsEnum(TestimonialStatus)
  status?: TestimonialStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasBeforeAfter?: boolean;
}

export class TestimonialFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: TestimonialStatus })
  @IsOptional()
  @IsEnum(TestimonialStatus)
  status?: TestimonialStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
}
