import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { AppBaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('todos')
export class Todo extends AppBaseEntity {
  @Expose()
  @Column()
  @ApiProperty()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
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
