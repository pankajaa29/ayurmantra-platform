import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from '../common/mock-data.service';
import { CreateBlogPostDto, UpdateBlogPostDto, BlogPostFilterDto, BlogPostStatus } from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly mockDataService: MockDataService) {}

  async findAll(filters: BlogPostFilterDto) {
    let posts = await this.mockDataService.getBlogPosts();

    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.excerpt.toLowerCase().includes(search) ||
          post.content.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      posts = posts.filter(
        (post) => post.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.status) {
      posts = posts.filter((post) => post.status === filters.status);
    }

    if (filters.featured !== undefined) {
      posts = posts.filter((post) => post.featured === filters.featured);
    }

    // Sort by published date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Pagination
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const start = (page - 1) * limit;
    const paginatedPosts = posts.slice(start, start + limit);

    return {
      data: paginatedPosts,
      meta: {
        total: posts.length,
        page,
        limit,
        totalPages: Math.ceil(posts.length / limit),
      },
    };
  }

  async findPublished(filters: BlogPostFilterDto) {
    // Only return published posts for public website
    filters.status = BlogPostStatus.PUBLISHED;
    return this.findAll(filters);
  }

  async findOne(id: string) {
    const posts = await this.mockDataService.getBlogPosts();
    const post = posts.find((p) => p.id === id);
    
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }
    
    return { data: post };
  }

  async findBySlug(slug: string) {
    const posts = await this.mockDataService.getBlogPosts();
    const post = posts.find((p) => p.slug === slug);
    
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }
    
    return { data: post };
  }

  async create(data: CreateBlogPostDto) {
    const newPost = await this.mockDataService.createBlogPost(data);
    return { data: newPost };
  }

  async update(id: string, data: UpdateBlogPostDto) {
    const updatedPost = await this.mockDataService.updateBlogPost(id, data);
    
    if (!updatedPost) {
      throw new NotFoundException('Blog post not found');
    }
    
    return { data: updatedPost };
  }

  async remove(id: string) {
    const deleted = await this.mockDataService.deleteBlogPost(id);
    
    if (!deleted) {
      throw new NotFoundException('Blog post not found');
    }
    
    return { message: 'Blog post deleted successfully' };
  }
}
