import { TweetsService } from './tweets.service';
import { Controller, Get, Query } from '@nestjs/common';
import { Mentions } from './interfaces/tweets.interface';
import { SearchBusinessDto } from './dto/search-business.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get()
  getTweets(@Query() query: SearchBusinessDto): Promise<Mentions> {
    return this.tweetsService.findUser(query.business, query.max_results);
  }
}
