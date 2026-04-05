import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [ThemeController],
  providers: [ThemeService],
  exports: [ThemeService],
})
export class ThemeModule {}
