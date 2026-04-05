import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GoogleReviewSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

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
  @IsNumber()
  maxReviews?: number;
}

export class InstagramSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxPosts?: number;
}

export class UpdateSocialSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  googleReviews?: GoogleReviewSettingsDto;

  @ApiPropertyOptional()
  @IsOptional()
  instagram?: InstagramSettingsDto;
}
