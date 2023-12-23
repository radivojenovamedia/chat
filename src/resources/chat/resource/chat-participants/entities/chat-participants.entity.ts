import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@chat/resources/user/entities/user.entity';
import { Chat } from '@chat/resources/chat/entities/chat.entity';
import { MessagesEntity } from '@chat/resources/chat/resource/messages/entities/messages.entity';
import { ReadMessagesEntity } from '@chat/resources/chat/resource/read-messages/entities/read-messages.entity';

@Entity()
export class ChatParticipantsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @ManyToOne(() => User, (user) => user.chatsParticipant)
  @JoinColumn({ name: 'userID' })
  userID: User;
  @ManyToOne(() => Chat, (chat) => chat.chatParticipants)
  @JoinColumn({ name: 'chatID' })
  chatID: Chat;
  @OneToMany(() => MessagesEntity, (message) => message.participantSender)
  messages?: MessagesEntity[];
  @OneToMany(
    () => ReadMessagesEntity,
    (readMessage) => readMessage.participantReader,
  )
  readMessages?: ReadMessagesEntity[];
}
