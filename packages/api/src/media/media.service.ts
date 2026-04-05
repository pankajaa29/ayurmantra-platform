import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { CreateMediaDto, UpdateMediaDto, MediaFilterDto, AddYouTubeVideoDto, MediaType, MediaCategory } from './dto';

@Injectable()
export class MediaService {
  constructor(private readonly mockDataService: MockDataService) {}

  async findAll(filters: MediaFilterDto) {
    let media = await this.mockDataService.getMedia();

    // Apply filters
    if (filters.type) {
      media = media.filter((m) => m.type === filters.type);
    }

    if (filters.category) {
      media = media.filter((m) => m.category === filters.category);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      media = media.filter(
        (m) =>
          m.title.toLowerCase().includes(search) ||
          m.description?.toLowerCase().includes(search)
      );
    }

    // Sort by date (newest first)
    media.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 20;
    const start = (page - 1) * limit;
    const paginated = media.slice(start, start + limit);

    return {
      data: paginated,
      meta: {
        total: media.length,
        page,
        limit,
        totalPages: Math.ceil(media.length / limit),
      },
    };
  }

  async getCategories() {
    return {
      data: Object.values(MediaCategory).map((cat) => ({
        value: cat,
        label: cat.charAt(0) + cat.slice(1).toLowerCase().replace('_', ' '),
      })),
    };
  }

  async getTypes() {
    return {
      data: Object.values(MediaType).map((type) => ({
        value: type,
        label: type.charAt(0) + type.slice(1).toLowerCase(),
      })),
    };
  }

  async findOne(id: string) {
    const media = await this.mockDataService.getMediaById(id);
    
    if (!media) {
      throw new NotFoundException('Media not found');
    }
    
    return { data: media };
  }

  async create(data: CreateMediaDto) {
    const newMedia = await this.mockDataService.createMedia(data);
    return { data: newMedia };
  }

  async addYouTubeVideo(data: AddYouTubeVideoDto) {
    // Extract video ID from YouTube URL
    const videoId = this.extractYouTubeId(data.youtubeUrl);
    
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    const mediaData: CreateMediaDto = {
      title: data.title || 'YouTube Video',
      type: MediaType.YOUTUBE,
      category: data.category || MediaCategory.GENERAL,
      url: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      externalId: videoId,
      metadata: {
        originalUrl: data.youtubeUrl,
      },
    };

    const newMedia = await this.mockDataService.createMedia(mediaData);
    return { data: newMedia };
  }

  private extractYouTubeId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
      /^([^&\s?]+)$/, // Just the ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  async update(id: string, data: UpdateMediaDto) {
    const updated = await this.mockDataService.updateMedia(id, data);
    
    if (!updated) {
      throw new NotFoundException('Media not found');
    }
    
    return { data: updated };
  }

  async remove(id: string) {
    const deleted = await this.mockDataService.deleteMedia(id);
    
    if (!deleted) {
      throw new NotFoundException('Media not found');
    }
    
    return { message: 'Media deleted successfully' };
  }
}
