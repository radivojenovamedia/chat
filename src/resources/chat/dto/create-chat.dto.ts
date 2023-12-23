import { IsArray, IsString } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  users: string[];
}
export class GetUserChats {
  @IsString()
  participantID: string;
}
