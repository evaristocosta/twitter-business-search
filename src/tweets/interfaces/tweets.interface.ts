export interface TweetData {
  author_id: string;
  id: string;
  text: string;
}

export interface AuthorData {
  id: string;
  name: string;
  username: string;
}

export interface TweetsResponse {
  data: Array<TweetData>;
  includes: {
    users: Array<AuthorData>;
  };
}
