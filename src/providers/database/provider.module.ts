import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule, DatabaseConfigService } from '@chat/config';
import { ControllerLoggerEntity, ErrorLoggerEntity } from '@chat/common';
import { User } from '../../resources/user/entities/user.entity';
import { Chat } from '@chat/resources/chat/entities/chat.entity';
import { ChatParticipantsEntity } from '@chat/resources/chat/resource/chat-participants/entities/chat-participants.entity';
import { MessagesEntity } from '@chat/resources/chat/resource/messages/entities/messages.entity';
import { ReadMessagesEntity } from '@chat/resources/chat/resource/read-messages/entities/read-messages.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (configService: DatabaseConfigService) => ({
        type: 'postgres',
        host: configService.host.toString(),
        port: parseInt(configService.port),
        username: configService.user.toString(),
        password: configService.password.toString(),
        database: configService.db.toString(),
        entities: [
          User,
          ErrorLoggerEntity,
          ControllerLoggerEntity,
          Chat,
          ChatParticipantsEntity,
          MessagesEntity,
          ReadMessagesEntity,
        ],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  exports: [],
  providers: [],
})
export class DatabaseModule {}
