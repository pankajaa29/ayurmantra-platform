import { Module } from '@nestjs/common';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [FAQController],
  providers: [FAQService],
  exports: [FAQService],
})
export class FAQModule {}
