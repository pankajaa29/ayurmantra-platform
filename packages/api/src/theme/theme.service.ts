import { Injectable } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';

@Injectable()
export class ThemeService {
  constructor(private readonly mockDataService: MockDataService) {}

  async getTheme() {
    const settings = await this.mockDataService.getThemeSettings();
    return {
      data: {
        colors: settings.colors,
        activePreset: settings.activePreset,
      },
    };
  }

  async getAdminTheme() {
    const settings = await this.mockDataService.getThemeSettings();
    return { data: settings };
  }

  async updateTheme(data: any) {
    const updated = await this.mockDataService.updateThemeSettings(data);
    return {
      message: 'Theme updated successfully',
      data: updated,
    };
  }
}
