import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { AppBaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends AppBaseEntity {
  @Expose()
  @Column()
  @ApiProperty()
  fullName: string;

  @Expose()
  @Column()
  @ApiProperty()
  userName: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  @ApiProperty()
  password: string;
}
