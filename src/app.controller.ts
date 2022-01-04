import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  welcomeMessage(): string {
    return 'Welcome to the Twitter API!';
  }
}
