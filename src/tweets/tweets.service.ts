import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';

@Injectable()
export class TweetsService {
  constructor(private httpService: HttpService) {}

  findUser(business: string): Observable<AxiosResponse<User[]>> {
    return this.httpService.get(
      'https://api.twitter.com/2/users/by/username/' + business,
    );
  }
}
