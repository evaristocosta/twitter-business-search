import {
  TweetData,
  AuthorData,
  TweetsResponse,
  Mentions,
} from './interfaces/tweets.interface';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { User } from './interfaces/user.interface';

@Injectable()
export class TweetsService {
  constructor(private httpService: HttpService) {}

  async findUser(business: string, max_results: number): Promise<Mentions> {
    if (max_results > 100) {
      throw new BadRequestException(
        'Bad max_results value',
        'This variable must be less than 100',
      );
    } else if (max_results < 5) {
      throw new BadRequestException(
        'Bad max_results value',
        'This variable must be greather than 5',
      );
    }

    const urlMentionsQuery = `expansions=author_id&user.fields=name&max_results=${max_results}`;

    const user: User = await lastValueFrom(
      this.httpService.get('users/by/username/' + business).pipe(
        map((response) => {
          if (response.data.errors && response.data.errors.length > 0)
            throw new NotFoundException(response.data);
          else return response.data;
        }),
      ),
    );

    const userData = user.data;

    const tweets = await lastValueFrom(
      this.httpService
        .get(`users/${userData.id}/mentions?${urlMentionsQuery}`)
        .pipe(
          map((response) => {
            const resp: TweetsResponse = response.data;
            const tweets = resp.data;
            const authors = resp.includes.users;

            // merge author data with tweet data matching author_id
            const mergedTweets = tweets.map((tweet: TweetData) => {
              const author = authors.find(
                (author: AuthorData) => author.id === tweet.author_id,
              );
              return {
                author_name: author.name,
                author_id: author.id,
                author_username: author.username,
                tweet_id: tweet.id,
                tweet_text: tweet.text,
              };
            });

            return mergedTweets;
          }),
        ),
    );

    return {
      business_id: userData.id,
      business_name: userData.name,
      business_username: userData.username,
      mentions: tweets,
    };
  }
}
