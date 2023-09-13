import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../interface/jwt-payload.interface';
import { UsersService } from 'src/module/users/users.service';
import { User } from 'src/module/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwtSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.userService.findOne(payload.id);
  }
}
