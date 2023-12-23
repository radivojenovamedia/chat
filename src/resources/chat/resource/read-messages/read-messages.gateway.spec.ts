import { Test, TestingModule } from '@nestjs/testing';
import { ReadMessagesGateway } from './read-messages.gateway';

describe('ReadMessagesGateway', () => {
  let gateway: ReadMessagesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadMessagesGateway],
    }).compile();

    gateway = module.get<ReadMessagesGateway>(ReadMessagesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
