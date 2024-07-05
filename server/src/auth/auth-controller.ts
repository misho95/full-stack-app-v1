import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CustomAuthGuard } from './custom-guard';

interface CustomResponse extends Response {
  cookie(name: string, value: any, options?: any): this;
}

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

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      secure: false,
      sameSite: 'Lax',
      path: '/',
    });

    return { access_token };
  }

  @UseGuards(CustomAuthGuard)
  @Post('refresh_token')
  refreshToken(@Request() req: any) {
    const refresh = req.cookies['refresh_token'];
    if (!refresh) {
      return new UnauthorizedException();
    }
    return this.authService.refreshToken(refresh);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return { user: req.user };
  }
}
