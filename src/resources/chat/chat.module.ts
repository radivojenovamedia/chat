import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatParticipantsGateway } from './resource/chat-participants/chat-participants.gateway';
import { MessagesGateway } from './resource/messages/messages.gateway';
import { ReadMessagesGateway } from './resource/read-messages/read-messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@chat/resources/user/entities/user.entity';
import { Chat } from '@chat/resources/chat/entities/chat.entity';
import { ChatParticipantsEntity } from '@chat/resources/chat/resource/chat-participants/entities/chat-participants.entity';
import { MessagesEntity } from '@chat/resources/chat/resource/messages/entities/messages.entity';
import { ReadMessagesEntity } from '@chat/resources/chat/resource/read-messages/entities/read-messages.entity';
import { ReadMessagesService } from './resource/read-messages/read-messages.service';
import { MessagesService } from './resource/messages/messages.service';
import { ChatParticipantsService } from './resource/chat-participants/chat-participants.service';
import { ChatDatabase } from '@chat/resources/chat/chat.database';
import { ChatParticipantsDatabase } from '@chat/resources/chat/resource/chat-participants/chat-participants.database';
import { UserModule } from '@chat/resources/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Chat,
      ChatParticipantsEntity,
      MessagesEntity,
      ReadMessagesEntity,
    ]),
    UserModule,
  ],
  providers: [
    ChatGateway,
    ChatService,
    ChatParticipantsGateway,
    MessagesGateway,
    ReadMessagesGateway,
    ReadMessagesService,
    MessagesService,
    ChatParticipantsService,
    ChatDatabase,
    ChatParticipantsDatabase,
  ],
})
export class ChatModule {}
