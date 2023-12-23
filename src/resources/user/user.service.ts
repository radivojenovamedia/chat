import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDatabase } from '@chat/resources/user/user.database';
import { UserInterface } from '@chat/resources/user/user.interface';

@Injectable()
export class UserService {
  constructor(private userDatabase: UserDatabase) {}
  create(createUserDto: CreateUserDto) {
    createUserDto.socketID = '';
    return this.userDatabase.createUser(createUserDto);
  }
  findAll() {
    return `This action returns all user`;
  }
  getUsersByIds(ids: string[]) {
    return this.userDatabase.findUsersByIds(ids);
  }

  async findOne(
    user: Partial<UserInterface>,
  ): Promise<UserInterface | undefined> {
    return this.userDatabase.findOne(user);
  }
  usersChatBySocket(socketID: string) {
    return this.userDatabase.findUsersChatBySocket(socketID);
  }

  update(query: Partial<UserInterface>, updateUserDto: UpdateUserDto) {
    return this.userDatabase.updateUser(query, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
