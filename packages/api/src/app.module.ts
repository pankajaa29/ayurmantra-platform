import { Module, Controller, Get } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { CommonModule } from './common/common.module';
import { BlogModule } from './blog/blog.module';
import { StaffModule } from './staff/staff.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { FAQModule } from './faq/faq.module';
import { MediaModule } from './media/media.module';
import { HomepageModule } from './homepage/homepage.module';
import { SocialModule } from './social/social.module';
import { PagesModule } from './pages/pages.module';
import { ThemeModule } from './theme/theme.module';

@Controller()
class AppController {
  @Get()
  getHello() {
    return {
      name: 'AyurMantra API',
      version: '1.0.0',
      status: 'running',
      documentation: '/api/docs',
      endpoints: '/api/v1',
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    CommonModule,
    AuthModule,
    TreatmentsModule,
    AppointmentsModule,
    BlogModule,
    StaffModule,
    TestimonialsModule,
    FAQModule,
    MediaModule,
    HomepageModule,
    SocialModule,
    PagesModule,
    ThemeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
