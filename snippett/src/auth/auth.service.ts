import { AuthDto } from './dto/auth-dto';
import { AuthSchema, Auth, AuthDocument } from './schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authDto: AuthDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.authModel.findOne({
      email: authDto.email,
      password: authDto.password,
    });
    if (user?.password !== authDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);

      const newPayload = {
        sub: payload.sub,
        email: payload.email,
      };

      const access_token = await this.jwtService.signAsync(newPayload, {
        expiresIn: '15m',
      });

      return { access_token };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async registration(authDto: AuthDto): Promise<Auth> {
    const createdUser = new this.authModel(authDto);
    return createdUser.save();
  }
}
