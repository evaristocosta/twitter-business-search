import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TweetsController } from './tweets/tweets.controller';
import { TweetsService } from './tweets/tweets.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      baseURL: 'https://api.twitter.com/2/',
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }),
  ],
  controllers: [AppController, TweetsController],
  providers: [TweetsService],
})
export class AppModule {}
