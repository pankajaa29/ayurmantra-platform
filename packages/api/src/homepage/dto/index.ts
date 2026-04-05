import { IsString, IsOptional, IsBoolean, IsArray, IsObject, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Hero Section
export class HeroSectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  badgeText?: string;

  @ApiProperty()
  @IsString()
  primaryCtaText: string;

  @ApiProperty()
  @IsString()
  primaryCtaLink: string;

  @ApiProperty()
  @IsString()
  secondaryCtaText: string;

  @ApiProperty()
  @IsString()
  secondaryCtaLink: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  backgroundImage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

// Stats/Trust Badges
export class StatItemDto {
  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsString()
  color: string;
}

export class TrustBadgesSectionDto {
  @ApiProperty({ type: [StatItemDto] })
  @IsArray()
  stats: StatItemDto[];

  @ApiProperty({ type: [String] })
  @IsArray()
  certifications: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

// Feature Card
export class FeatureCardDto {
  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class WhyChooseSectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiProperty({ type: [FeatureCardDto] })
  @IsArray()
  features: FeatureCardDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

// Gallery Section
export class GallerySectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  imageIds: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

// Newsletter
export class NewsletterSectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @IsString()
  buttonText: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

// CTA Section
export class CTASectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @IsString()
  primaryButtonText: string;

  @ApiProperty()
  @IsString()
  primaryButtonLink: string;

  @ApiProperty()
  @IsString()
  secondaryButtonText: string;

  @ApiProperty()
  @IsString()
  secondaryButtonLink: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  backgroundImage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

// Section Order
export class SectionOrderDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsBoolean()
  enabled: boolean;
}

// Full Homepage Settings
export class HomepageSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  hero?: HeroSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  trustBadges?: TrustBadgesSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  whyChoose?: WhyChooseSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  gallery?: GallerySectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  newsletter?: NewsletterSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  cta?: CTASectionDto;

  @ApiPropertyOptional({ type: [SectionOrderDto] })
  @IsOptional()
  sectionOrder?: SectionOrderDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  socialIntegrations?: {
    googleReviews?: {
      enabled: boolean;
      placeId?: string;
      maxReviews?: number;
    };
    instagram?: {
      enabled: boolean;
      username?: string;
      maxPosts?: number;
    };
  };

  // Allow updatedAt to be passed but ignored (for compatibility)
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  updatedAt?: string;
}

// Update Hero
export class UpdateHeroSectionDto extends HeroSectionDto {}

// Update Trust Badges
export class UpdateTrustBadgesSectionDto extends TrustBadgesSectionDto {}

// Update Why Choose
export class UpdateWhyChooseSectionDto extends WhyChooseSectionDto {}

// Update Gallery
export class UpdateGallerySectionDto extends GallerySectionDto {}

// Update Newsletter
export class UpdateNewsletterSectionDto extends NewsletterSectionDto {}

// Update CTA
export class UpdateCTASectionDto extends CTASectionDto {}
