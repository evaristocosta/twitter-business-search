import { TweetsService } from './tweets.service';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Mentions } from './interfaces/mentions.interface';
import { SearchBusinessDto } from './dto/search-business.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get()
  getTweets(@Query() query: SearchBusinessDto): Promise<Mentions> {
    if (!query.business || !query.max_results) {
      throw new BadRequestException('Missing query values');
    }

    return this.tweetsService.findTweets(query.business, query.max_results);
  }
}
