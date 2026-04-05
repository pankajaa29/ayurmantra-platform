import { Injectable } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { UpdateSocialSettingsDto } from './dto';

@Injectable()
export class SocialService {
  constructor(private readonly mockDataService: MockDataService) {}

  async getGoogleReviews() {
    const settings = await this.mockDataService.getSocialSettings();
    
    if (!settings.googleReviews?.enabled) {
      return {
        data: {
          enabled: false,
          reviews: [],
        },
      };
    }

    // Mock Google Reviews data
    const mockReviews = [
      {
        id: 'gr1',
        authorName: 'Priya Sharma',
        rating: 5,
        text: 'Amazing Ayurvedic treatment! The doctors at AyurMantra are truly knowledgeable. My chronic back pain has significantly improved after just 3 sessions of Panchakarma therapy.',
        time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        profilePhotoUrl: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=0D9488&color=fff',
      },
      {
        id: 'gr2',
        authorName: 'Rajesh Kumar',
        rating: 5,
        text: 'The herbal remedies prescribed by Dr. Patel worked wonders for my digestive issues. The clinic maintains excellent hygiene standards and the staff is very courteous.',
        time: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        profilePhotoUrl: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D9488&color=fff',
      },
      {
        id: 'gr3',
        authorName: 'Ananya Desai',
        rating: 4,
        text: 'Great experience with the Shirodhara treatment. Very relaxing and helped with my stress levels. Would recommend for anyone looking for authentic Ayurveda treatments.',
        time: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        profilePhotoUrl: 'https://ui-avatars.com/api/?name=Ananya+Desai&background=0D9488&color=fff',
      },
      {
        id: 'gr4',
        authorName: 'Vikram Mehta',
        rating: 5,
        text: 'Best Ayurvedic clinic in the city! The detox program helped me lose 8kg and improved my overall energy levels. The diet plan was easy to follow.',
        time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        profilePhotoUrl: 'https://ui-avatars.com/api/?name=Vikram+Mehta&background=0D9488&color=fff',
      },
    ];

    const maxReviews = settings.googleReviews.maxReviews || 6;

    return {
      data: {
        enabled: true,
        placeId: settings.googleReviews.placeId,
        averageRating: 4.8,
        totalReviews: 127,
        reviews: mockReviews.slice(0, maxReviews),
      },
    };
  }

  async getInstagramFeed() {
    const settings = await this.mockDataService.getSocialSettings();
    
    if (!settings.instagram?.enabled) {
      return {
        data: {
          enabled: false,
          posts: [],
        },
      };
    }

    // Mock Instagram posts data
    const mockPosts = [
      {
        id: 'ig1',
        mediaUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300',
        caption: 'Experience the healing power of authentic Ayurveda at AyurMantra. Book your consultation today! 🌿 #Ayurveda #Wellness #AyurMantra',
        permalink: '#',
        mediaType: 'IMAGE',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 245,
        comments: 18,
      },
      {
        id: 'ig2',
        mediaUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600',
        thumbnailUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300',
        caption: 'Panchakarma therapy in progress. Detoxify your body naturally. ✨ #Panchakarma #Detox #HolisticHealth',
        permalink: '#',
        mediaType: 'IMAGE',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 189,
        comments: 12,
      },
      {
        id: 'ig3',
        mediaUrl: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600',
        thumbnailUrl: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=300',
        caption: 'Dr. Patel performing a traditional Abhyanga massage. Feel the difference! 🙏 #MassageTherapy #AyurvedicHealing',
        permalink: '#',
        mediaType: 'IMAGE',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 312,
        comments: 24,
      },
      {
        id: 'ig4',
        mediaUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300',
        caption: 'Preparing herbal medicines with love and care. 100% natural ingredients 🌱 #HerbalRemedies #NaturalHealing',
        permalink: '#',
        mediaType: 'IMAGE',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 156,
        comments: 9,
      },
      {
        id: 'ig5',
        mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
        thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        caption: 'Morning meditation at our center. Start your day with peace and positivity 🧘‍♀️ #Meditation #Mindfulness',
        permalink: '#',
        mediaType: 'IMAGE',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 278,
        comments: 21,
      },
      {
        id: 'ig6',
        mediaUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
        thumbnailUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300',
        caption: 'Ayurvedic diet consultation available. Learn to eat according to your dosha 🥗 #AyurvedicDiet #HealthyLiving',
        permalink: '#',
        mediaType: 'IMAGE',
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 201,
        comments: 15,
      },
    ];

    const maxPosts = settings.instagram.maxPosts || 6;

    return {
      data: {
        enabled: true,
        username: settings.instagram.username || 'ayurmantra',
        profileUrl: `https://instagram.com/${settings.instagram.username || 'ayurmantra'}`,
        posts: mockPosts.slice(0, maxPosts),
      },
    };
  }

  async getSettings() {
    const settings = await this.mockDataService.getSocialSettings();
    
    return {
      data: settings,
    };
  }

  async updateSettings(data: UpdateSocialSettingsDto) {
    const currentSettings = await this.mockDataService.getSocialSettings();
    
    const updatedSettings = {
      ...currentSettings,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    await this.mockDataService.updateSocialSettings(updatedSettings);
    
    return {
      message: 'Social settings updated successfully',
      data: updatedSettings,
    };
  }
}
