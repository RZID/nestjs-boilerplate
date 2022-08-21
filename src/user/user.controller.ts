import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import {
  // ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserResponse } from './api-response/user.entity';
import { EditUserExample } from './api-example';
import UserService from './user.service';
import { Role } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import { RolesGuard } from '../auth/role/roles.guard';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export default class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User): UserResponse {
    return user;
  }

  @Patch()
  @ApiBody(EditUserExample)
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ): Promise<EditUserDto> {
    return this.userService.editUser(userId, dto);
  }

  @Get('all-users')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  allUser(): Promise<UserResponse[]> {
    return this.userService.allUser();
  }
}
