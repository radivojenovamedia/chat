import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { UserService } from '@chat/resources/user/user.service';

@Module({
  imports: [UserModule, ChatModule],
})
export class ResourcesModule {}
