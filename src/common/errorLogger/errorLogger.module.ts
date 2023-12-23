import { Module } from '@nestjs/common';
import { ErrorLoggerService } from './errorLogger.service';
import { ErrorLoggerEntity } from './errorLogger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from '@chat/database';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorLoggerEntity])],
  exports: [ErrorLoggerService],
  providers: [ErrorLoggerService, DatabaseService],
})
export class ErrorLoggerModule {}
