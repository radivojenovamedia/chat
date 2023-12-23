import { Injectable } from '@nestjs/common';
import { Chat } from '@chat/resources/chat/entities/chat.entity';
import { ChatParticipantsDatabase } from '@chat/resources/chat/resource/chat-participants/chat-participants.database';
import { UserService } from '@chat/resources/user/user.service';

@Injectable()
export class ChatParticipantsService {
  constructor(
    private chatParticipantsDB: ChatParticipantsDatabase,
    private userService: UserService,
  ) {}
  async createParticipants(usersID: string[], chat: Chat) {
    const users = await this.userService.getUsersByIds(usersID);
    return this.chatParticipantsDB.createParticipants(users, chat);
  }
}
