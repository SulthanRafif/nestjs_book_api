/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicGuard } from 'src/common/decorators/public.guard';
import { AuthService } from './auth.service';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @PublicGuard()
  @Post('login')
  async login(@Request() req) {
    console.log(req.user, 'loginnya');

    return this.authService.login(req.user);
  }

  @Post('refresh-token')
  @PublicGuard()
  async refreshToken(
    @Body() refreshTokenDto: RefreshAccessTokenDto,
  ) : Promise<{access_token: string}> {
    return this.authService.refreshAccessToken(refreshTokenDto);
  }

  @Patch('/:id/revoke')
  @PublicGuard()
  async revokeRefreshToken(@Param('id') id: string): Promise<void> {
    return this.authService.revokeRefreshToken(id);
  }
}
