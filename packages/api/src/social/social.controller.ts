import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SocialService } from './social.service';
import { UpdateSocialSettingsDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Social Integrations')
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('reviews/google')
  @ApiOperation({ summary: 'Get Google reviews (public)' })
  async getGoogleReviews() {
    return this.socialService.getGoogleReviews();
  }

  @Get('instagram/feed')
  @ApiOperation({ summary: 'Get Instagram feed (public)' })
  async getInstagramFeed() {
    return this.socialService.getInstagramFeed();
  }

  @Get('admin/settings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get social integration settings' })
  async getSettings() {
    return this.socialService.getSettings();
  }

  @Put('admin/settings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update social integration settings' })
  async updateSettings(@Body() data: UpdateSocialSettingsDto) {
    return this.socialService.updateSettings(data);
  }
}
