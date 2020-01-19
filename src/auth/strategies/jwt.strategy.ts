import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(req: Request , payload: any) {
    try {
      const user = await this.authService.validateUserToken(payload, req.headers.authorization.split(' ')[1]);
      return user;
    } catch (error) {
      throw new HttpException(error , HttpStatus.UNAUTHORIZED);
    }
  }
}
