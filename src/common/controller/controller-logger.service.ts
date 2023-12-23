import { Inject, Injectable } from '@nestjs/common';
import { ControllerLoggerInterface } from './controller-logger.interface';
import { DatabaseService } from '@chat/database';
import { InjectRepository } from '@nestjs/typeorm';
import { ControllerLoggerEntity } from './controller-logger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ControllerLoggerService {
  constructor(
    @InjectRepository(ControllerLoggerEntity)
    private controllerData: Repository<ControllerLoggerInterface>,
    @Inject(DatabaseService)
    private databaseService: DatabaseService<
      ControllerLoggerInterface,
      ControllerLoggerInterface
    >,
  ) {
    this.databaseService.repository = this.controllerData;
  }

  createLog(query: ControllerLoggerInterface) {
    return this.databaseService.create(query);
  }
}
