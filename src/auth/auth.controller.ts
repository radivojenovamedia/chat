import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@chat/auth/local-auth.guard';
import { JwtAuthGuard } from '@chat/auth/jwt-auth.guard';
import { AuthRequest } from '@chat/auth/auth.interface';
import { Public } from '@chat/auth/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
