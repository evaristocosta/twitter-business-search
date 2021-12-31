import { User } from './interfaces/user.interface';
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
  ): Observable<AxiosResponse<User[]>> {
    return this.tweetsService.findUser(business);
  }
}
