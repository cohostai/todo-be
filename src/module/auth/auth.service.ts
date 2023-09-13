import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interface/jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { compare } from 'src/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(userName);
    if (user && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async genToken(user: User): Promise<string> {
    const payload = {
      id: user._id,
      fullName: user.fullName,
      userName: user.userName,
    } as JwtPayload;
    return this.jwtService.sign(payload);
  }
  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verify(token);
  }
}
