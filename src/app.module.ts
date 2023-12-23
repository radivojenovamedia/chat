import { Module } from '@nestjs/common';
import { AppConfigModule } from './config';
import { DatabaseModule } from './providers';
import { BcryptService } from './jobs/bcrypt/bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { ResourcesModule } from './resources/resources.module';
import { AuthModule } from '@chat/auth/auth.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, ResourcesModule, AuthModule],
  controllers: [],
  providers: [BcryptService, ConfigService],
})
export class AppModule {}
