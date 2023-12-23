import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket } from 'socket.io';
import { UserService } from '@chat/resources/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async handleConnection(client: Socket) {
    if (client.handshake.auth['token']) {
      const token = client.handshake.auth['token'];
      if (token) {
        const user = this.jwtService.decode(token.split(' ')[1]);
        if (user.sub) {
          const userData = await this.userService.update(
            { id: user.sub },
            { socketID: client.id },
          );
          if (userData.affected > 0) {
            client.handshake.auth.user = JSON.parse(
              JSON.stringify(
                await this.userService.findOne({
                  id: user.sub,
                }),
              ),
            );
          } else {
            throw new UnauthorizedException('Invalid token');
          }
        } else {
          throw new UnauthorizedException('Invalid token');
        }
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }

  handleDisconnect(client: Socket) {
    this.userService
      .update({ socketID: client.id }, { socketID: '' })
      .finally();
  }
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('getChats')
  findAll(@ConnectedSocket() client: Socket) {
    this.chatService.findAll(client.id).then((data) => {
      console.log(data);
      client.emit('getChats', data);
    });
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
