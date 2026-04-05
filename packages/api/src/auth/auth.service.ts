import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MockDataService } from '../common/mock-data.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private mockData: MockDataService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Mock validation - check against default credentials
    if (email === 'admin@ayurmeda.com' && password === 'admin123') {
      return {
        id: '1',
        email: 'admin@ayurmeda.com',
        firstName: 'Admin',
        lastName: 'User',
        role: { name: 'SUPER_ADMIN' },
        isActive: true,
      };
    }
    if (email === 'doctor@ayurmeda.com' && password === 'admin123') {
      return {
        id: '2',
        email: 'doctor@ayurmeda.com',
        firstName: 'Dr. Rajesh',
        lastName: 'Sharma',
        role: { name: 'DOCTOR' },
        isActive: true,
      };
    }
    if (email === 'patient@ayurmeda.com' && password === 'patient123') {
      return {
        id: '3',
        email: 'patient@ayurmeda.com',
        firstName: 'John',
        lastName: 'Doe',
        role: { name: 'PATIENT' },
        isActive: true,
      };
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Mock registration
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = {
      id: Date.now().toString(),
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: { name: 'PATIENT' },
    };

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
    };
  }

  async getMe(userId: string) {
    // Return mock user based on ID
    if (userId === '1') {
      return {
        id: '1',
        email: 'admin@ayurmeda.com',
        firstName: 'Admin',
        lastName: 'User',
        role: { name: 'SUPER_ADMIN' },
      };
    }
    return {
      id: userId,
      email: 'user@ayurmeda.com',
      firstName: 'User',
      lastName: 'Name',
      role: { name: 'PATIENT' },
    };
  }
}
