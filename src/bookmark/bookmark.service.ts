import { Injectable, BadRequestException } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export default class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
    return bookmarks;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    return bookmark;
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new BadRequestException('Access to resources denied');
    }

    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new BadRequestException('Access to resources denied');
    }

    return this.prisma.bookmark.delete({ where: { id: bookmarkId } });
  }
}
