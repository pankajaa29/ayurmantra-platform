import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';
import {
  HomepageSettingsDto,
  UpdateHeroSectionDto,
  UpdateTrustBadgesSectionDto,
  UpdateWhyChooseSectionDto,
  UpdateGallerySectionDto,
  UpdateNewsletterSectionDto,
  UpdateCTASectionDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Homepage CMS')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  @ApiOperation({ summary: 'Get homepage settings (public)' })
  async getHomepageSettings() {
    return this.homepageService.getSettings();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get full homepage settings for admin' })
  async getAdminSettings() {
    return this.homepageService.getAdminSettings();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update full homepage settings' })
  async updateSettings(@Body() data: HomepageSettingsDto) {
    return this.homepageService.updateSettings(data);
  }

  @Put('hero')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update hero section' })
  async updateHero(@Body() data: UpdateHeroSectionDto) {
    return this.homepageService.updateSection('hero', data);
  }

  @Put('trust-badges')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update trust badges section' })
  async updateTrustBadges(@Body() data: UpdateTrustBadgesSectionDto) {
    return this.homepageService.updateSection('trustBadges', data);
  }

  @Put('why-choose')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update why choose us section' })
  async updateWhyChoose(@Body() data: UpdateWhyChooseSectionDto) {
    return this.homepageService.updateSection('whyChoose', data);
  }

  @Put('gallery')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gallery section' })
  async updateGallery(@Body() data: UpdateGallerySectionDto) {
    return this.homepageService.updateSection('gallery', data);
  }

  @Put('newsletter')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update newsletter section' })
  async updateNewsletter(@Body() data: UpdateNewsletterSectionDto) {
    return this.homepageService.updateSection('newsletter', data);
  }

  @Put('cta')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update CTA section' })
  async updateCTA(@Body() data: UpdateCTASectionDto) {
    return this.homepageService.updateSection('cta', data);
  }

  @Put('section-order')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update section order and visibility' })
  async updateSectionOrder(@Body() data: { sections: { id: string; order: number; enabled: boolean }[] }) {
    return this.homepageService.updateSectionOrder(data.sections);
  }
}
