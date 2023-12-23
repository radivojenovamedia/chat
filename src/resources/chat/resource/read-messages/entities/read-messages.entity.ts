import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatParticipantsEntity } from '@chat/resources/chat/resource/chat-participants/entities/chat-participants.entity';
import { MessagesEntity } from '@chat/resources/chat/resource/messages/entities/messages.entity';

@Entity()
export class ReadMessagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @ManyToOne(
    () => ChatParticipantsEntity,
    (participant) => participant.readMessages,
  )
  @JoinColumn({ name: 'participantID' })
  participantReader: ChatParticipantsEntity[];
  @ManyToOne(() => MessagesEntity, (message) => message.readMessages)
  @JoinColumn({ name: 'readMessagesID' })
  readMessages: MessagesEntity[];
}
