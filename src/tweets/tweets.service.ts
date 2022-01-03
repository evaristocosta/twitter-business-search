import { Tweets, TweetData, AuthorData } from './interfaces/tweets.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable, switchMap } from 'rxjs';

@Injectable()
export class TweetsService {
  constructor(private httpService: HttpService) {}

  findUser(business: string): Observable<AxiosResponse<Tweets[]>> {
    const urlMentionsQuery =
      'expansions=author_id&user.fields=name&max_results=20';

    return this.httpService.get('users/by/username/' + business).pipe(
      map((response) => response.data),
      switchMap((userData) =>
        this.httpService.get(
          `users/${userData.data.id}/mentions?${urlMentionsQuery}`,
        ),
      ),
      map((response) => {
        const resp = response.data;
        const tweets = resp.data;
        const authors = resp.includes.users;

        // merge author data with tweet data matching author_id
        const mergedTweets = tweets.map((tweet: TweetData) => {
          const author = authors.find(
            (author: AuthorData) => author.id === tweet.author_id,
          );
          return {
            tweet_id: tweet.id,
            tweet_text: tweet.text,
            author_name: author.name,
            author_id: author.id,
            author_username: author.username,
          };
        });

        return mergedTweets;
      }),
    );
  }
}
