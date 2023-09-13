import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, LocalAuthGuard } from 'src/common';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { LoginResponse } from './response/login.response';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Login successfully',
  })
  @ApiResponse({ status: 401, description: 'Login error' })
  async login(@Request() req): Promise<LoginResponse> {
    return {
      user: await this.usersService.findOne(req.user._id),
      token: await this.authService.genToken(req.user),
    };
  }
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  async register(@Body() register: RegisterUserDto): Promise<User> {
    return this.usersService.registerUser(register);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get user profile' })
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<User> {
    return this.usersService.findOne(req.user._id);
  }
}
