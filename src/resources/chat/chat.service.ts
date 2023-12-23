import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatDatabase } from '@chat/resources/chat/chat.database';
import { ChatParticipantsService } from '@chat/resources/chat/resource/chat-participants/chat-participants.service';
import { UserService } from '@chat/resources/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private chatDatabase: ChatDatabase,
    private chatParticipants: ChatParticipantsService,
    private userService: UserService,
  ) {}
  create(createChatDto: CreateChatDto) {
    return this.chatDatabase.createChat().then((chat) => {
      return this.chatParticipants.createParticipants(
        createChatDto.users,
        chat,
      );
    });
  }

  findAll(socketID: string) {
    return this.userService.usersChatBySocket(socketID);
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
