import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { TokenExpiredError } from 'jsonwebtoken';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { UserEntity } from 'src/users/entities/user.entity';
import { refreshTokenConfig } from 'src/common/config/configuration';
import { LoginResponse } from './interface/login-response.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const checkPassword = await user.comparePassword(password);
    console.log(user, 'Nama User');
    console.log(password);
    console.log(checkPassword);
    if (user && checkPassword) {
      console.log('berhasil');
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const refresh_token = await this.createRefreshToken(user);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token
    } as LoginResponse;
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshTokenDto;
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOne(
      payload.jid,
      { relations: ['user'] },
    );

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not found');
    }

    if (refreshToken.isRevoked) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    const access_token = await this.createAccessToken(refreshToken.user);

    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      } else {
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async createAccessToken(user: UserEntity): Promise<string> {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return access_token;
  }

  async createRefreshToken(user: UserEntity): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      +refreshTokenConfig.expiresIn,
    );
    const payload = { jid: refreshToken.id };
    const refresh_token = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );

    return refresh_token;
  }

  async revokeRefreshToken(id: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne(id);
    if (!refreshToken) {
      throw new NotFoundException('Refresh token is not found');
    }
    refreshToken.isRevoked = true;
    await refreshToken.save();
  }
}
