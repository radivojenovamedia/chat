import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatParticipantsEntity } from '@chat/resources/chat/resource/chat-participants/entities/chat-participants.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @Column({ default: '' })
  socketID: string;
  @OneToMany(() => ChatParticipantsEntity, (user) => user.userID)
  chatsParticipant?: ChatParticipantsEntity[];
}
