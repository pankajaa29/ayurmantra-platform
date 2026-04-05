import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [HomepageController],
  providers: [HomepageService],
  exports: [HomepageService],
})
export class HomepageModule {}
