import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsController } from './tweets/tweets.controller';
import { TweetsService } from './tweets/tweets.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, TweetsController],
  providers: [AppService, TweetsService],
})
export class AppModule {}
