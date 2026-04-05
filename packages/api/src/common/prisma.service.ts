import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  // Mock Prisma service for development without database
  async $connect() {
    console.log('Mock database connected');
  }

  async $disconnect() {
    console.log('Mock database disconnected');
  }
}
