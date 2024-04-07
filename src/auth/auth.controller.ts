import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth.request';
import { AuthResponse } from './interfaces/auth.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthRequest): Promise<AuthResponse> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
