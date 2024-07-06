import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Res,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { createUserDto } from './auth-validator';

interface CustomResponse extends Response {
  cookie(name: string, value: any, options?: any): this;
}

const cookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  secure: false,
  sameSite: 'Lax',
  path: '/',
};

@Controller('/api/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @Request() req: any,
    @Res({ passthrough: true }) res: CustomResponse,
  ) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
    );

    res.cookie('refresh_token', refresh_token, cookieOptions);

    return { access_token };
  }

  @Post('signup')
  async registerUser(@Body() body: createUserDto) {
    return this.authService.signup(body);
  }

  @Post('refresh_token')
  async refreshToken(
    @Request() req: any,
    @Res({ passthrough: true }) res: CustomResponse,
  ) {
    const refresh = req.cookies['refresh_token'];
    if (!refresh) {
      return new UnauthorizedException();
    }

    const { access_token, refresh_token } =
      await this.authService.refreshToken(refresh);

    res.cookie('refresh_token', refresh_token, cookieOptions);

    return { access_token };
  }

  @Post('signout')
  signOutUser(
    @Request() req: any,
    @Res({ passthrough: true }) res: CustomResponse,
  ) {
    const refresh = req.cookies['refresh_token'];
    if (!refresh) {
      return new UnauthorizedException();
    }
    res.cookie('refresh_token', null, cookieOptions);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return { user: req.user };
  }
}
