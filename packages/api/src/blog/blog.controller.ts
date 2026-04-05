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
import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto, BlogPostFilterDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  async findAll(@Query() filters: BlogPostFilterDto) {
    return this.blogService.findAll(filters);
  }

  @Get('published')
  @ApiOperation({ summary: 'Get all published blog posts for website' })
  async findPublished(@Query() filters: BlogPostFilterDto) {
    return this.blogService.findPublished(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get blog post by ID' })
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get blog post by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog post' })
  async create(@Body() data: CreateBlogPostDto) {
    return this.blogService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog post' })
  async update(@Param('id') id: string, @Body() data: UpdateBlogPostDto) {
    return this.blogService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a blog post' })
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
