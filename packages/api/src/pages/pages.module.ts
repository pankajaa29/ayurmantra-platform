import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
