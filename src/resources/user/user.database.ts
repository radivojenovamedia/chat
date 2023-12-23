import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@chat/resources/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { UserInterface } from '@chat/resources/user/user.interface';

@Injectable()
export class UserDatabase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<UserInterface>,
  ) {}
  createUser(user: UserInterface) {
    const userData = this.userRepository.create(user);
    return this.userRepository.save(userData);
  }
  findOne(userData: Partial<UserInterface>) {
    return this.userRepository.findOne({
      where: { username: userData.username, password: userData.password },
    });
  }
  findUsersByIds(ids: string[]) {
    return this.userRepository.findBy({ id: In(ids) });
  }
  findUsersChatBySocket(socketID: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.socketID = :socketID', { socketID })
      .innerJoin('user.chatsParticipant', 'userParticipant')
      .innerJoin('userParticipant.chatID', 'chat')
      .select('chat.id', 'chat_id')
      .innerJoin('chat.chatParticipants', 'chatParticipants')
      .andWhere('chatParticipants.userID <> user.id')
      .innerJoin('chatParticipants.userID', 'userData')
      .addSelect('userData.name', 'user_name')
      .getRawMany();
  }
  updateUser(user: Partial<UserInterface>, updateUser: Partial<UserInterface>) {
    return this.userRepository.update({ ...user }, updateUser);
  }
}
