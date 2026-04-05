import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PagesService } from './pages.service';
import { UpdatePageDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Pages CMS')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('section-types')
  @ApiOperation({ summary: 'Get available section types for page builder' })
  async getSectionTypes() {
    return this.pagesService.getSectionTypes();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get page content (public)' })
  async getPage(@Param('slug') slug: string) {
    return this.pagesService.getPage(slug);
  }

  @Get(':slug/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get full page content for admin editing' })
  async getPageAdmin(@Param('slug') slug: string) {
    return this.pagesService.getPageAdmin(slug);
  }

  @Put(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update page content' })
  async updatePage(@Param('slug') slug: string, @Body() data: UpdatePageDto) {
    return this.pagesService.updatePage(slug, data);
  }
}
