export interface Mentions {
  business_id: string;
  business_name: string;
  business_username: string;
  mentions: Array<MentionsContent>;
}

export interface MentionsContent {
  author_name: string;
  author_id: string;
  author_username: string;
  tweet_id: string;
  tweet_text: string;
}
