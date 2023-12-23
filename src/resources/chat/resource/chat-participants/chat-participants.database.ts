import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatParticipantsEntity } from '@chat/resources/chat/resource/chat-participants/entities/chat-participants.entity';
import { Repository } from 'typeorm';
import { User } from '@chat/resources/user/entities/user.entity';
import { Chat } from '@chat/resources/chat/entities/chat.entity';
import { UserInterface } from '@chat/resources/user/user.interface';

@Injectable()
export class ChatParticipantsDatabase {
  constructor(
    @InjectRepository(ChatParticipantsEntity)
    private chatParticipantsRepo: Repository<ChatParticipantsEntity>,
  ) {}

  createParticipants(users: UserInterface[], chat: Chat) {
    const participants = users.map((user) => {
      const participant = new ChatParticipantsEntity();
      participant.userID = user;
      participant.chatID = chat;
      return participant;
    });
    const participantsData = this.chatParticipantsRepo.create(participants);
    return this.chatParticipantsRepo.save(participantsData);
  }
}
