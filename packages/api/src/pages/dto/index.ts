import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PageSectionDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsBoolean()
  visible: boolean;

  @ApiProperty()
  @IsObject()
  content: Record<string, any>;
}

export class UpdatePageDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  sections?: PageSectionDto[];
}
