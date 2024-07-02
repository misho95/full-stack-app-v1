import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // 2. READ COOKIES
    const cookies = request.cookies;
    const signedCookies = request.signedCookies;
    console.log('cookies', cookies, 'signedCookies', signedCookies);
    return true;
  }
}
