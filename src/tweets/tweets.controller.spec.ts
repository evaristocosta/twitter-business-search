import { TweetsService } from './tweets.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TweetsController } from './tweets.controller';

describe('TweetsController', () => {
  let controller: TweetsController;
  let service: TweetsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: TweetsService,
      useFactory: () => ({
        findTweets: jest.fn(() => []),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetsController],
      providers: [TweetsService, ApiServiceProvider],
    }).compile();

    controller = module.get<TweetsController>(TweetsController);
    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTweets', () => {
    it('should call the tweets function', async () => {
      controller.getTweets({ business: 'algum', max_results: 10 });
      expect(service.findTweets).toHaveBeenCalled();
    });
  });
});
