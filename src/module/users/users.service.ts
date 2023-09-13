import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { hash } from 'src/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
    private configService: ConfigService,
  ) {}

  async findOneByUserName(userName: string): Promise<User> {
    return this.userRepository.findOne({ where: { userName: userName } });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ _id: id });
  }

  async registerUser(createUserDto: RegisterUserDto): Promise<any> {
    const { fullName, password, userName } = createUserDto;
    const userExits = await this.findOneByUserName(userName);
    if (userExits != null) throw new BadRequestException('User already exists');
    const passportHash = await hash(
      password,
      this.configService.get('saltOrRounds') ?? '10',
    );
    return this.userRepository.save({
      fullName: fullName,
      password: passportHash,
      userName: userName,
    });
  }
}
