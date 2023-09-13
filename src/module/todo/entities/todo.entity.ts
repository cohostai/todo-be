import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AppBaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('todos')
export class Todo extends AppBaseEntity {
  @Expose()
  @Column()
  @ApiProperty()
  userId: string;

  @Expose()
  @Column()
  @ApiProperty()
  title: string;

  @Expose()
  @Column({ default: false })
  @ApiProperty()
  completed: boolean;
}
