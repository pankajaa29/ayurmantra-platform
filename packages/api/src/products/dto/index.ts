import { IsString, IsNumber, IsOptional, IsArray, IsEnum, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued',
}

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty({ description: 'SKU code' })
  @IsString()
  sku: string;

  @ApiPropertyOptional({ description: 'Product description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Category ID' })
  @IsString()
  categoryId: string;

  @ApiPropertyOptional({ description: 'Subcategory' })
  @IsString()
  @IsOptional()
  subcategory?: string;

  @ApiProperty({ description: 'Cost price' })
  @IsNumber()
  @Min(0)
  costPrice: number;

  @ApiProperty({ description: 'Selling price' })
  @IsNumber()
  @Min(0)
  sellingPrice: number;

  @ApiPropertyOptional({ description: 'Discounted price' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountedPrice?: number;

  @ApiProperty({ description: 'Current stock quantity' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'Low stock alert threshold' })
  @IsNumber()
  @Min(0)
  lowStockThreshold: number;

  @ApiPropertyOptional({ description: 'Unit of measurement' })
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiPropertyOptional({ description: 'Supplier ID' })
  @IsString()
  @IsOptional()
  supplierId?: string;

  @ApiPropertyOptional({ description: 'Product images' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ description: 'Barcode/QR code' })
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiPropertyOptional({ description: 'Expiry date for medicines' })
  @IsString()
  @IsOptional()
  expiryDate?: string;

  @ApiPropertyOptional({ description: 'Batch number' })
  @IsString()
  @IsOptional()
  batchNumber?: string;

  @ApiPropertyOptional({ enum: ProductStatus, default: ProductStatus.ACTIVE })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiPropertyOptional({ description: 'Product specifications' })
  @IsString()
  @IsOptional()
  specifications?: string;

  @ApiPropertyOptional({ description: 'Usage instructions' })
  @IsString()
  @IsOptional()
  usageInstructions?: string;

  @ApiPropertyOptional({ description: 'Side effects/warnings' })
  @IsString()
  @IsOptional()
  warnings?: string;
}

export class UpdateProductDto extends CreateProductDto {}

export class UpdateStockDto {
  @ApiProperty({ description: 'Quantity to add (positive) or remove (negative)' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Reason for stock update' })
  @IsString()
  reason: string;

  @ApiPropertyOptional({ description: 'Reference number' })
  @IsString()
  @IsOptional()
  reference?: string;
}

export class ProductFilterDto {
  @ApiPropertyOptional({ description: 'Search by name or SKU' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ enum: ProductStatus })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiPropertyOptional({ description: 'Filter low stock items', type: 'boolean' })
  @IsOptional()
  lowStock?: boolean;

  @ApiPropertyOptional({ description: 'Supplier ID' })
  @IsString()
  @IsOptional()
  supplier?: string;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class CreateSupplierDto {
  @ApiProperty({ description: 'Supplier name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Contact person' })
  @IsString()
  @IsOptional()
  contactPerson?: string;

  @ApiPropertyOptional({ description: 'Email' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Address' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'GST/Tax ID' })
  @IsString()
  @IsOptional()
  taxId?: string;

  @ApiPropertyOptional({ description: 'Payment terms' })
  @IsString()
  @IsOptional()
  paymentTerms?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Status', default: 'active' })
  @IsString()
  @IsOptional()
  status?: string;
}
