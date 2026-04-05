import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Amount in smallest currency unit (paise for INR)' })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiPropertyOptional({ description: 'Currency code', default: 'INR' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({ description: 'Order receipt ID' })
  @IsString()
  @IsOptional()
  receipt?: string;

  @ApiPropertyOptional({ description: 'Treatment ID' })
  @IsString()
  @IsOptional()
  treatmentId?: string;

  @ApiPropertyOptional({ description: 'Appointment ID' })
  @IsString()
  @IsOptional()
  appointmentId?: string;

  @ApiPropertyOptional({ description: 'Payment description' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class VerifyPaymentDto {
  @ApiProperty({ description: 'Razorpay order ID' })
  @IsString()
  razorpay_order_id: string;

  @ApiProperty({ description: 'Razorpay payment ID' })
  @IsString()
  razorpay_payment_id: string;

  @ApiProperty({ description: 'Razorpay signature' })
  @IsString()
  razorpay_signature: string;

  @ApiPropertyOptional({ description: 'Payment method' })
  @IsString()
  @IsOptional()
  method?: string;
}

export class RefundPaymentDto {
  @ApiProperty({ description: 'Payment ID to refund' })
  @IsString()
  paymentId: string;

  @ApiProperty({ description: 'Refund amount' })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ description: 'Refund reason' })
  @IsString()
  reason: string;
}

export class PaymentFilterDto {
  @ApiPropertyOptional({ description: 'Payment status' })
  @IsEnum(['created', 'authorized', 'captured', 'refunded', 'failed'])
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Payment method' })
  @IsEnum(['card', 'upi', 'netbanking', 'wallet', 'emi'])
  @IsOptional()
  method?: string;

  @ApiPropertyOptional({ description: 'Start date' })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date' })
  @IsString()
  @IsOptional()
  endDate?: string;
}

export class PaymentMethodDto {
  @ApiProperty({ description: 'Payment method type' })
  @IsEnum(['card', 'upi', 'netbanking', 'wallet'])
  type: string;

  @ApiPropertyOptional({ description: 'Card details' })
  @IsOptional()
  card?: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    name: string;
  };

  @ApiPropertyOptional({ description: 'UPI ID' })
  @IsString()
  @IsOptional()
  upiId?: string;
}
