import { Test, TestingModule } from '@nestjs/testing';
import { ChatParticipantsGateway } from './chat-participants.gateway';

describe('ChatParticipantsGateway', () => {
  let gateway: ChatParticipantsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatParticipantsGateway],
    }).compile();

    gateway = module.get<ChatParticipantsGateway>(ChatParticipantsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
