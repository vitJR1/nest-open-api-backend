import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './interfaces/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(email);
    if (user === undefined || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return { token: await this.jwt.signAsync({ id: user.id }) };
  }
}
