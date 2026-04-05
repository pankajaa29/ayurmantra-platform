import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FAQService } from './faq.service';
import { CreateFAQDto, UpdateFAQDto, FAQFilterDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('FAQ')
@Controller('faq')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  async findAll(@Query() filters: FAQFilterDto) {
    return this.faqService.findAll(filters);
  }

  @Get('published')
  @ApiOperation({ summary: 'Get published FAQs for website' })
  async getPublished(@Query('category') category?: string) {
    return this.faqService.getPublished(category);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get FAQ categories' })
  async getCategories() {
    return this.faqService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get FAQ by ID' })
  async findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new FAQ' })
  async create(@Body() data: CreateFAQDto) {
    return this.faqService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update FAQ' })
  async update(@Param('id') id: string, @Body() data: UpdateFAQDto) {
    return this.faqService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete FAQ' })
  async remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
