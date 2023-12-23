import { Test, TestingModule } from '@nestjs/testing';
import { ReadMessagesService } from './read-messages.service';

describe('ReadMessagesService', () => {
  let service: ReadMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadMessagesService],
    }).compile();

    service = module.get<ReadMessagesService>(ReadMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
