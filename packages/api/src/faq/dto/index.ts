import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum FAQStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export class CreateFAQDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ enum: FAQStatus })
  @IsOptional()
  @IsEnum(FAQStatus)
  status?: FAQStatus;
}

export class UpdateFAQDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  question?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  answer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ enum: FAQStatus })
  @IsOptional()
  @IsEnum(FAQStatus)
  status?: FAQStatus;
}

export class FAQFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: FAQStatus })
  @IsOptional()
  @IsEnum(FAQStatus)
  status?: FAQStatus;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
}
