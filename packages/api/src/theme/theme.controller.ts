import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ThemeService } from './theme.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Theme')
@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  @ApiOperation({ summary: 'Get active theme colors (public)' })
  async getTheme() {
    return this.themeService.getTheme();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get full theme settings for admin' })
  async getAdminTheme() {
    return this.themeService.getAdminTheme();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update theme settings' })
  async updateTheme(@Body() data: any) {
    return this.themeService.updateTheme(data);
  }
}
