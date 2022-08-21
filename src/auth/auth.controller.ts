import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import AuthService from './auth.service';
import { AuthDto } from './dto';
import { AuthExample } from './api-example';
import { AuthResponse } from './api-response/auth.entity';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody(AuthExample)
  signup(@Body() dto: AuthDto): Promise<AuthResponse> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody(AuthExample)
  signin(@Body() dto: AuthDto): Promise<AuthResponse> {
    return this.authService.signin(dto);
  }
}
