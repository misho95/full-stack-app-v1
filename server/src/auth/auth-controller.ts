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
import { AuthenticatedGuard } from './authentication.guard';
import { UserType } from 'src/users/user.type';
import { Session } from 'express-session';

interface CustomResponse extends Response {
  cookie(name: string, value: any, options?: any): this;
}

interface UserSession extends Session {
  passport: {
    user: UserType;
  };
}

interface UserRequest extends Request {
  user: UserType;
  cookies: any;
  session: UserSession;
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
    @Request() req: UserRequest,
    @Res({ passthrough: true }) res: CustomResponse,
  ) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
    );

    req.session.passport.user = {
      _id: req.user._id,
      fullname: req.user.fullname,
      username: req.user.username,
      email: req.user.email,
      access_token,
    };

    req.session.save();

    res.cookie('refresh_token', refresh_token, cookieOptions);

    return { access_token };
  }

  @Post('signup')
  async registerUser(@Body() body: createUserDto) {
    return this.authService.signup(body);
  }

  @Get('session')
  async getSession(@Request() req: UserRequest) {
    return req.user ? true : false;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('token')
  async getToken(@Request() req: UserRequest) {
    return { access_token: req.user.access_token };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('refresh_token')
  async refreshToken(
    @Request() req: UserRequest,
    @Res({ passthrough: true }) res: CustomResponse,
  ) {
    const refresh = req.cookies['refresh_token'];
    if (!refresh) {
      return new UnauthorizedException();
    }

    const data = await this.authService.refreshToken(refresh, req.user);

    const { access_token } = data;

    req.session.passport.user.access_token = access_token;
    req.session.save();

    return { access_token };
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: UserRequest) {
    const { _id, username } = req.user;
    return this.authService.getUserProfile(_id, username);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Request() req: UserRequest) {
    req.session.destroy((err) => {
      return new UnauthorizedException(err);
    });
    return { msg: 'The user session has ended' };
  }
}
