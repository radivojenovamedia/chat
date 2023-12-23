import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatParticipantsEntity } from '@chat/resources/chat/resource/chat-participants/entities/chat-participants.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  chatType: string;
  @Column()
  created: Date;
  @Column()
  name: string;
  @OneToMany(() => ChatParticipantsEntity, (user) => user.chatID)
  chatParticipants?: ChatParticipantsEntity[];
}
