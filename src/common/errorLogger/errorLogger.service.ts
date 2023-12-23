import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database';
import { ErrorLoggerInterface } from './errorLogger.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorLoggerEntity } from './errorLogger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ErrorLoggerService {
  constructor(
    @InjectRepository(ErrorLoggerEntity)
    private errorLogger: Repository<ErrorLoggerInterface>,
    @Inject(DatabaseService)
    private databaseService: DatabaseService<
      ErrorLoggerInterface,
      ErrorLoggerInterface
    >,
  ) {
    this.databaseService.repository = this.errorLogger;
  }

  createErrorLog(query: ErrorLoggerInterface) {
    return this.databaseService.create(query);
  }
}
