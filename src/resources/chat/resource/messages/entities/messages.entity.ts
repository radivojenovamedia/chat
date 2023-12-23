import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatParticipantsEntity } from '@chat/resources/chat/resource/chat-participants/entities/chat-participants.entity';
import { ReadMessagesEntity } from '@chat/resources/chat/resource/read-messages/entities/read-messages.entity';

@Entity()
export class MessagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  messageType: string;
  @ManyToOne(
    () => ChatParticipantsEntity,
    (participant) => participant.messages,
  )
  @JoinColumn({ name: 'participantID' })
  participantSender: ChatParticipantsEntity[];
  @Column()
  attachmentUrl: string;
  @Column()
  imageUrl: string;
  @Column()
  textMessage: string;
  @OneToMany(
    () => ReadMessagesEntity,
    (readMessage) => readMessage.readMessages,
  )
  readMessages?: ReadMessagesEntity[];
}
