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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { CreateMediaDto, UpdateMediaDto, MediaFilterDto, AddYouTubeVideoDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Media Library')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all media files' })
  async findAll(@Query() filters: MediaFilterDto) {
    return this.mediaService.findAll(filters);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get media categories' })
  async getCategories() {
    return this.mediaService.getCategories();
  }

  @Get('types')
  @ApiOperation({ summary: 'Get media types' })
  async getTypes() {
    return this.mediaService.getTypes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get media by ID' })
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload/add media' })
  async create(@Body() data: CreateMediaDto) {
    return this.mediaService.create(data);
  }

  @Post('youtube')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add YouTube video' })
  async addYouTubeVideo(@Body() data: AddYouTubeVideoDto) {
    return this.mediaService.addYouTubeVideo(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update media' })
  async update(@Param('id') id: string, @Body() data: UpdateMediaDto) {
    return this.mediaService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete media' })
  async remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
