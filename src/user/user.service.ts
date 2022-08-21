import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export default class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;
    return user;
  }

  async allUser() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
    return users;
  }
}
