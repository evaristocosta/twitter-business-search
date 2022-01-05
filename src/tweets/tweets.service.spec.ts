import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockError: AxiosResponse = {
    data: {
      errors: [
        {
          details: 'error',
        },
      ],
    },
    status: 500,
    statusText: 'Internal Server Error',
    headers: {},
    config: {},
  };

  describe('findUser', () => {
    const mockResponse: AxiosResponse = {
      data: {
        data: {
          id: '123',
          name: 'test',
          username: 'test',
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    it('should find the user', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));
      const result = await service.findUser('test');
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockError));
      await expect(service.findUser('test')).rejects.toThrow('Http Exception');
    });
  });

  describe('getMentionsOfUser', () => {
    const userData = {
      id: '123',
      name: 'test',
      username: 'test',
    };

    const mockResponse: AxiosResponse = {
      data: {
        data: [
          {
            id: '456',
            author_id: '123',
            text: 'string',
          },
        ],
        includes: {
          users: [userData],
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    it('should get the mentions of the user', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));
      const result = await service.getMentionsOfUser(userData, 'test');

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ author_id: '123', tweet_id: '456' }),
        ]),
      );
    });

    it('should throw an error', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockError));
      await expect(service.getMentionsOfUser(userData, 'test')).rejects.toThrow(
        'Http Exception',
      );
    });
  });

  describe('findTweets', () => {
    it('should find the tweets', async () => {
      jest.spyOn(service, 'findUser').mockImplementation(() =>
        Promise.resolve({
          data: { id: '123', name: 'test', username: 'test' },
        }),
      );
      jest.spyOn(service, 'getMentionsOfUser').mockImplementation(() =>
        Promise.resolve([
          {
            author_name: 'string',
            author_id: 'string',
            author_username: 'string',
            tweet_id: 'string',
            tweet_text: 'string',
          },
        ]),
      );

      const result = await service.findTweets('test', 10);
      expect(result).toEqual(expect.objectContaining({ business_id: '123' }));
    });
  });
});
