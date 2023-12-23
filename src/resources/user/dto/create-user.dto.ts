import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  socketID: string;
  @IsString()
  name: string;
}
