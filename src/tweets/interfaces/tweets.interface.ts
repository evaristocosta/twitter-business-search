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

export interface Mentions {
  business_id: string;
  business_name: string;
  business_username: string;
  mentions: Array<{
    author_name: string;
    author_id: string;
    author_username: string;
    tweet_id: string;
    tweet_text: string;
  }>;
}
