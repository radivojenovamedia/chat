import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '@chat/resources/chat/entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatParticipantsService } from '@chat/resources/chat/resource/chat-participants/chat-participants.service';

@Injectable()
export class ChatDatabase {
  constructor(@InjectRepository(Chat) private chatRepo: Repository<Chat>) {}

  createChat() {
    const chat = new Chat();
    chat.chatType = 'group';
    chat.created = new Date();
    chat.name = 'New Chat';
    const chatData = this.chatRepo.create(chat);
    return this.chatRepo.save(chatData);
  }
  getParticipantChats(participantID: number) {
    return this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.chatParticipants', 'chatParticipants')
      .where('chatParticipants.userID = :participantID', { participantID })
      .getMany();
  }
}
