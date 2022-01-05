import { UserData } from './user.interface';
export interface TweetData {
  author_id: string;
  id: string;
  text: string;
}

export interface TweetsResponse {
  data: Array<TweetData>;
  includes: {
    users: Array<UserData>;
  };
  meta?: Record<string, unknown>;
}
