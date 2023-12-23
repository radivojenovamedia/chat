import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { DatabaseConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide database configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().default('chat'),
        DATABASE_PASSWORD: Joi.string().default('chat1234'),
        DATABASE_DB: Joi.string().default('chat'),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.string().default('5431'),
      }),
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
