interface TweetData {
  author_id: string;
  id: string;
  text: string;
}

export interface Tweets {
  data: Array<TweetData>;
}
