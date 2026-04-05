import { IsString, IsNumber, IsOptional, IsArray, IsEnum, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TreatmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

export class CreateTreatmentDto {
  @ApiProperty({ description: 'Treatment name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Treatment description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Category ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({ description: 'Duration in minutes' })
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({ description: 'Price in INR' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Discounted price' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountedPrice?: number;

  @ApiPropertyOptional({ description: 'Treatment benefits' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @ApiPropertyOptional({ description: 'Process steps' })
  @IsArray()
  @IsOptional()
  process?: { step: number; title: string; description: string }[];

  @ApiPropertyOptional({ description: 'What is included' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  includes?: string[];

  @ApiPropertyOptional({ description: 'Pre-care instructions' })
  @IsString()
  @IsOptional()
  preCareInstructions?: string;

  @ApiPropertyOptional({ description: 'Post-care instructions' })
  @IsString()
  @IsOptional()
  postCareInstructions?: string;

  @ApiPropertyOptional({ description: 'Contraindications' })
  @IsString()
  @IsOptional()
  contraindications?: string;

  @ApiPropertyOptional({ enum: TreatmentStatus, default: TreatmentStatus.DRAFT })
  @IsEnum(TreatmentStatus)
  @IsOptional()
  status?: TreatmentStatus;

  @ApiPropertyOptional({ description: 'SEO meta title' })
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional({ description: 'SEO meta description' })
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiPropertyOptional({ description: 'URL slug' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ description: 'Image URLs' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}

export class UpdateTreatmentDto extends CreateTreatmentDto {}

export class TreatmentFilterDto {
  @ApiPropertyOptional({ description: 'Search query' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ enum: TreatmentStatus })
  @IsEnum(TreatmentStatus)
  @IsOptional()
  status?: TreatmentStatus;

  @ApiPropertyOptional({ description: 'Minimum price' })
  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price' })
  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Category description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Parent category ID' })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({ description: 'Category image URL' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}
