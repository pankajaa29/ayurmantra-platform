import { Injectable } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { HomepageSettingsDto } from './dto';

@Injectable()
export class HomepageService {
  constructor(private readonly mockDataService: MockDataService) {}

  async getSettings() {
    const settings = await this.mockDataService.getHomepageSettings();
    
    // Return only enabled sections for public view
    const enabledSections = settings.sectionOrder?.filter(s => s.enabled) || [];
    const orderedSections = enabledSections.sort((a, b) => a.order - b.order);
    
    return {
      data: {
        sections: orderedSections.map(s => ({
          id: s.id,
          name: s.name,
          data: settings[s.id],
        })),
        socialIntegrations: settings.socialIntegrations,
      },
    };
  }

  async getAdminSettings() {
    const settings = await this.mockDataService.getHomepageSettings();
    
    return {
      data: settings,
    };
  }

  async updateSettings(data: HomepageSettingsDto) {
    const currentSettings = await this.mockDataService.getHomepageSettings();
    
    const updatedSettings = {
      ...currentSettings,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    await this.mockDataService.updateHomepageSettings(updatedSettings);
    
    return {
      message: 'Homepage settings updated successfully',
      data: updatedSettings,
    };
  }

  async updateSection(sectionId: string, data: any) {
    const currentSettings = await this.mockDataService.getHomepageSettings();
    
    const updatedSettings = {
      ...currentSettings,
      [sectionId]: {
        ...currentSettings[sectionId],
        ...data,
      },
      updatedAt: new Date().toISOString(),
    };
    
    await this.mockDataService.updateHomepageSettings(updatedSettings);
    
    return {
      message: `${sectionId} section updated successfully`,
      data: updatedSettings[sectionId],
    };
  }

  async updateSectionOrder(sections: { id: string; order: number; enabled: boolean }[]) {
    const currentSettings = await this.mockDataService.getHomepageSettings();
    
    const updatedSettings = {
      ...currentSettings,
      sectionOrder: sections,
      updatedAt: new Date().toISOString(),
    };
    
    await this.mockDataService.updateHomepageSettings(updatedSettings);
    
    return {
      message: 'Section order updated successfully',
      data: sections,
    };
  }
}
