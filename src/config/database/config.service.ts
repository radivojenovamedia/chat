import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with database config based operations.
 *
 * @class
 */
@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get user(): string {
    return this.configService.get<string>('database.user');
  }
  get password(): string {
    return this.configService.get<string>('database.password');
  }
  get db(): string {
    return this.configService.get<string>('database.db');
  }
  get host(): string {
    return this.configService.get<string>('database.host');
  }
  get port(): string {
    return this.configService.get<string>('database.port');
  }
}
