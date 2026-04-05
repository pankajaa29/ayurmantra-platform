import { Injectable } from '@nestjs/common';

export interface NotificationPayload {
  to: string;
  subject?: string;
  body: string;
  type: 'email' | 'sms' | 'whatsapp';
  template?: string;
  data?: Record<string, any>;
}

export interface SMSSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface WhatsAppSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

@Injectable()
export class NotificationsService {
  // Twilio credentials (mock - replace with actual in production)
  private readonly twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || 'mock_sid';
  private readonly twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || 'mock_token';
  private readonly twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

  // WhatsApp Business API credentials
  private readonly whatsappApiToken = process.env.WHATSAPP_API_TOKEN || 'mock_token';
  private readonly whatsappPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || 'mock_id';

  /**
   * Send SMS using Twilio
   */
  async sendSMS(to: string, message: string): Promise<SMSSendResult> {
    try {
      // Mock SMS sending - in production, integrate with Twilio
      console.log(`[SMS] Sending to ${to}: ${message}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        messageId: `sms_${Date.now()}`,
      };
    } catch (error) {
      console.error('SMS sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send WhatsApp message using WhatsApp Business API
   */
  async sendWhatsApp(to: string, message: string, templateName?: string): Promise<WhatsAppSendResult> {
    try {
      // Mock WhatsApp sending - in production, integrate with WhatsApp Business API
      console.log(`[WhatsApp] Sending to ${to}: ${message}`);
      
      if (templateName) {
        console.log(`[WhatsApp] Using template: ${templateName}`);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        messageId: `wa_${Date.now()}`,
      };
    } catch (error) {
      console.error('WhatsApp sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send appointment confirmation
   */
  async sendAppointmentConfirmation(
    patientPhone: string,
    patientName: string,
    appointmentDetails: {
      date: string;
      time: string;
      doctor: string;
      treatment: string;
    },
  ): Promise<{ sms: SMSSendResult; whatsapp: WhatsAppSendResult }> {
    const message = `Hi ${patientName}, your appointment is confirmed!\n\n📅 Date: ${appointmentDetails.date}\n⏰ Time: ${appointmentDetails.time}\n👨‍⚕️ Doctor: ${appointmentDetails.doctor}\n💆 Treatment: ${appointmentDetails.treatment}\n\nLocation: AyurMantra Wellness Center, Kerala\n\nFor any changes, call: +91 800-123-4567`;

    const [sms, whatsapp] = await Promise.all([
      this.sendSMS(patientPhone, message),
      this.sendWhatsApp(patientPhone, message, 'appointment_confirmation'),
    ]);

    return { sms, whatsapp };
  }

  /**
   * Send appointment reminder
   */
  async sendAppointmentReminder(
    patientPhone: string,
    patientName: string,
    appointmentDetails: {
      date: string;
      time: string;
      doctor: string;
      treatment: string;
    },
  ): Promise<{ sms: SMSSendResult; whatsapp: WhatsAppSendResult }> {
    const message = `Reminder: ${patientName}, you have an appointment tomorrow!\n\n📅 ${appointmentDetails.date} at ${appointmentDetails.time}\n👨‍⚕️ ${appointmentDetails.doctor}\n💆 ${appointmentDetails.treatment}\n\nPlease arrive 15 minutes early.\n\nNeed to reschedule? Call: +91 800-123-4567`;

    const [sms, whatsapp] = await Promise.all([
      this.sendSMS(patientPhone, message),
      this.sendWhatsApp(patientPhone, message, 'appointment_reminder'),
    ]);

    return { sms, whatsapp };
  }

  /**
   * Send payment confirmation
   */
  async sendPaymentConfirmation(
    patientPhone: string,
    patientName: string,
    paymentDetails: {
      amount: number;
      treatment: string;
      orderId: string;
      date: string;
    },
  ): Promise<{ sms: SMSSendResult; whatsapp: WhatsAppSendResult }> {
    const message = `Payment Received! ✅\n\nHi ${patientName},\n\nWe received your payment of ₹${paymentDetails.amount} for ${paymentDetails.treatment}.\n\nOrder ID: ${paymentDetails.orderId}\nDate: ${paymentDetails.date}\n\nThank you for choosing AyurMantra!\n\nQuestions? Contact: +91 800-123-4567`;

    const [sms, whatsapp] = await Promise.all([
      this.sendSMS(patientPhone, message),
      this.sendWhatsApp(patientPhone, message, 'payment_confirmation'),
    ]);

    return { sms, whatsapp };
  }

  /**
   * Send promotional message
   */
  async sendPromotionalMessage(
    patientPhone: string,
    campaignDetails: {
      title: string;
      description: string;
      validUntil: string;
      couponCode?: string;
    },
  ): Promise<{ sms: SMSSendResult; whatsapp: WhatsAppSendResult }> {
    let message = `🌿 ${campaignDetails.title}\n\n${campaignDetails.description}\n\nValid until: ${campaignDetails.validUntil}`;
    
    if (campaignDetails.couponCode) {
      message += `\n\nUse code: ${campaignDetails.couponCode}`;
    }
    
    message += `\n\nBook now: https://ayurmantra.com/book\nOr call: +91 800-123-4567`;

    const [sms, whatsapp] = await Promise.all([
      this.sendSMS(patientPhone, message),
      this.sendWhatsApp(patientPhone, message, 'promotional'),
    ]);

    return { sms, whatsapp };
  }

  /**
   * Send bulk SMS
   */
  async sendBulkSMS(phones: string[], message: string): Promise<{ total: number; success: number; failed: number }> {
    const results = await Promise.all(
      phones.map(phone => this.sendSMS(phone, message)),
    );

    return {
      total: results.length,
      success: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
    };
  }

  /**
   * Send bulk WhatsApp
   */
  async sendBulkWhatsApp(phones: string[], message: string, templateName: string): Promise<{ total: number; success: number; failed: number }> {
    const results = await Promise.all(
      phones.map(phone => this.sendWhatsApp(phone, message, templateName)),
    );

    return {
      total: results.length,
      success: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
    };
  }

  /**
   * Get SMS/WhatsApp delivery status
   */
  async getDeliveryStatus(messageId: string): Promise<{
    messageId: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
    timestamp?: string;
    error?: string;
  }> {
    // Mock status check
    return {
      messageId,
      status: 'delivered',
      timestamp: new Date().toISOString(),
    };
  }
}
