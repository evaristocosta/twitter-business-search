import { Tweets } from './interfaces/tweets.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable, switchMap } from 'rxjs';

@Injectable()
export class TweetsService {
  constructor(private httpService: HttpService) {}

  findUser(business: string): Observable<AxiosResponse<Tweets[]>> {
    return this.httpService.get('users/by/username/' + business).pipe(
      map((response) => response.data),
      switchMap((userData) =>
        this.httpService.get(
          `users/${userData.data.id}/mentions?expansions=author_id&user.fields=name&max_results=20`,
        ),
      ),
      map((response) => response.data),
    );
  }
}
