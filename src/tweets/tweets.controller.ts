import { Tweets } from './interfaces/tweets.interface';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { TweetsService } from './tweets.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get(':business')
  getTweets(
    @Param('business') business: string,
  ): Observable<AxiosResponse<Tweets[]>> {
    return this.tweetsService.findUser(business);
  }
}
