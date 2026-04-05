import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Headers,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { Request } from 'express';
import {
  CreateOrderDto,
  VerifyPaymentDto,
  PaymentFilterDto,
  RefundPaymentDto,
} from './dto';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaymentsController {
  // Mock Razorpay integration
  private readonly razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock';
  private readonly razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret';

  @Post('order')
  @ApiOperation({ summary: 'Create payment order' })
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const user = (req as any).user;
    
    // Mock order creation - in production, this would call Razorpay/Stripe API
    const order = {
      id: `order_${Date.now()}`,
      amount: createOrderDto.amount * 100, // Convert to paise
      currency: createOrderDto.currency || 'INR',
      receipt: createOrderDto.receipt || `receipt_${Date.now()}`,
      status: 'created',
      notes: {
        patientId: user.userId,
        treatmentId: createOrderDto.treatmentId,
        appointmentId: createOrderDto.appointmentId,
        description: createOrderDto.description,
      },
      created_at: new Date().toISOString(),
    };

    return {
      success: true,
      order,
      key_id: this.razorpayKeyId,
      message: 'Order created successfully',
    };
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify payment signature' })
  async verifyPayment(@Body() verifyDto: VerifyPaymentDto) {
    // Mock verification - in production, verify Razorpay signature
    const isValid = true; // Mock validation
    
    if (isValid) {
      return {
        success: true,
        payment: {
          id: `pay_${Date.now()}`,
          order_id: verifyDto.razorpay_order_id,
          status: 'captured',
          amount: 500000, // Mock amount
          method: verifyDto.method || 'card',
          email: 'patient@example.com',
          contact: '+919876543210',
          created_at: new Date().toISOString(),
        },
        message: 'Payment verified successfully',
      };
    }
    
    return {
      success: false,
      message: 'Invalid payment signature',
    };
  }

  @Post('refund')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Process refund' })
  async processRefund(@Body() refundDto: RefundPaymentDto) {
    // Mock refund - in production, call Razorpay refund API
    const refund = {
      id: `refund_${Date.now()}`,
      payment_id: refundDto.paymentId,
      amount: refundDto.amount,
      status: 'processed',
      reason: refundDto.reason,
      created_at: new Date().toISOString(),
    };

    return {
      success: true,
      refund,
      message: 'Refund processed successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get payment history' })
  async getPayments(@Query() filters: PaymentFilterDto) {
    // Mock payments data
    const payments = [
      {
        id: 'pay_001',
        orderId: 'order_001',
        amount: 5000,
        currency: 'INR',
        status: 'captured',
        method: 'card',
        patientName: 'John Doe',
        patientEmail: 'john@example.com',
        treatment: 'Panchakarma Detox',
        appointmentDate: '2026-03-15',
        createdAt: '2026-03-10T10:30:00Z',
      },
      {
        id: 'pay_002',
        orderId: 'order_002',
        amount: 1500,
        currency: 'INR',
        status: 'captured',
        method: 'upi',
        patientName: 'Jane Smith',
        patientEmail: 'jane@example.com',
        treatment: 'Abhyanga Massage',
        appointmentDate: '2026-03-16',
        createdAt: '2026-03-11T14:20:00Z',
      },
      {
        id: 'pay_003',
        orderId: 'order_003',
        amount: 2500,
        currency: 'INR',
        status: 'refunded',
        method: 'card',
        patientName: 'Mike Johnson',
        patientEmail: 'mike@example.com',
        treatment: 'Stress Management',
        appointmentDate: '2026-03-12',
        createdAt: '2026-03-08T09:15:00Z',
        refund: {
          id: 'refund_001',
          amount: 2500,
          reason: 'Appointment cancelled by patient',
          createdAt: '2026-03-09T10:00:00Z',
        },
      },
    ];

    // Apply filters
    let filtered = payments;
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    if (filters.method) {
      filtered = filtered.filter(p => p.method === filters.method);
    }

    return {
      success: true,
      data: filtered,
      meta: {
        total: filtered.length,
        totalAmount: filtered.reduce((sum, p) => sum + (p.status === 'captured' ? p.amount : 0), 0),
        totalRefunded: filtered.reduce((sum, p) => sum + (p.refund ? p.refund.amount : 0), 0),
      },
    };
  }

  @Get('stats')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get payment statistics' })
  async getPaymentStats() {
    return {
      success: true,
      stats: {
        today: {
          total: 45000,
          count: 8,
          refunds: 0,
        },
        thisWeek: {
          total: 285000,
          count: 45,
          refunds: 2500,
        },
        thisMonth: {
          total: 1250000,
          count: 198,
          refunds: 15000,
        },
        byMethod: {
          card: 65,
          upi: 25,
          netbanking: 8,
          wallet: 2,
        },
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment details' })
  async getPaymentDetails(@Param('id') id: string) {
    const payment = {
      id,
      orderId: 'order_001',
      amount: 5000,
      currency: 'INR',
      status: 'captured',
      method: 'card',
      card: {
        last4: '1234',
        network: 'Visa',
        type: 'credit',
      },
      patient: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 98765 43210',
      },
      treatment: {
        id: '1',
        name: 'Panchakarma Detox',
        duration: '120 min',
      },
      appointment: {
        id: 'apt_001',
        date: '2026-03-15',
        time: '10:00 AM',
        doctor: 'Dr. Rajesh Sharma',
      },
      timeline: [
        { event: 'order_created', timestamp: '2026-03-10T10:30:00Z' },
        { event: 'payment_initiated', timestamp: '2026-03-10T10:31:15Z' },
        { event: 'payment_captured', timestamp: '2026-03-10T10:32:30Z' },
      ],
      createdAt: '2026-03-10T10:30:00Z',
    };

    return {
      success: true,
      data: payment,
    };
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Handle payment webhooks' })
  async handleWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Body() payload: any,
  ) {
    // In production, verify webhook signature and process events
    console.log('Webhook received:', payload);
    
    return {
      success: true,
      message: 'Webhook processed',
    };
  }
}
