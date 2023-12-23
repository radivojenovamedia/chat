import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@chat/resources/user/entities/user.entity';
import { ControllerLoggerModule, ErrorLoggerModule } from '@chat/common';
import { UserDatabase } from '@chat/resources/user/user.database';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ErrorLoggerModule,
    ControllerLoggerModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserDatabase],
  exports: [UserService],
})
export class UserModule {}
