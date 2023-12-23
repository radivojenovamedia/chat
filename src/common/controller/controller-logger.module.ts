import { Module } from '@nestjs/common';
import { ControllerLoggerService } from './controller-logger.service';
import { DatabaseService } from '@chat/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerLoggerEntity } from './controller-logger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControllerLoggerEntity])],
  exports: [ControllerLoggerService],
  providers: [ControllerLoggerService, DatabaseService],
})
export class ControllerLoggerModule {}
