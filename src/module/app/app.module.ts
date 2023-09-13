import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/common/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/common/services';
import { HealthModule } from '../health/health.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TodoModule } from '../todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthModule,
    HealthModule,
    UsersModule,
    TodoModule,
  ],
})
export class AppModule {}
