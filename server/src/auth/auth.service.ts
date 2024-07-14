import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from './auth-validator';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/users/user.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credential: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(credential);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: UserType) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '2d' }),
    };
  }

  async signup(body: createUserDto) {
    const { username, email, password, fullname } = body;
    return this.usersService.createUser(username, email, password, fullname);
  }

  async refreshToken(refresh: string, user: UserType) {
    const data = await this.jwtService.decode(refresh);

    const { sub, username } = data;

    if (user._id !== sub || username !== user.username) {
      throw new UnauthorizedException();
    }

    return await this.login(user);
  }

  async getUserProfile(id: string, username: string) {
    return await this.usersService.getUserProfile(id, username);
  }
}
