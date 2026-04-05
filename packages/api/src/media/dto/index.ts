import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  YOUTUBE = 'YOUTUBE',
  DOCUMENT = 'DOCUMENT',
}

export enum MediaCategory {
  HERO = 'HERO',
  GALLERY = 'GALLERY',
  BLOG = 'BLOG',
  TREATMENT = 'TREATMENT',
  DOCTOR = 'DOCTOR',
  TESTIMONIAL = 'TESTIMONIAL',
  GENERAL = 'GENERAL',
}

export class CreateMediaDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiProperty({ enum: MediaType })
  @IsEnum(MediaType)
  type: MediaType;

  @ApiPropertyOptional({ enum: MediaCategory })
  @IsOptional()
  @IsEnum(MediaCategory)
  category?: MediaCategory;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  externalId?: string; // For YouTube video ID

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}

export class UpdateMediaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiPropertyOptional({ enum: MediaCategory })
  @IsOptional()
  @IsEnum(MediaCategory)
  category?: MediaCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}

export class MediaFilterDto {
  @ApiPropertyOptional({ enum: MediaType })
  @IsOptional()
  @IsEnum(MediaType)
  type?: MediaType;

  @ApiPropertyOptional({ enum: MediaCategory })
  @IsOptional()
  @IsEnum(MediaCategory)
  category?: MediaCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
}

// YouTube specific
export class AddYouTubeVideoDto {
  @ApiProperty()
  @IsString()
  youtubeUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ enum: MediaCategory })
  @IsOptional()
  @IsEnum(MediaCategory)
  category?: MediaCategory;
}

// Google Reviews
export class GoogleReviewSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  placeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  enabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  maxReviews?: number;
}

// Instagram
export class InstagramSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  enabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  maxPosts?: number;
}
