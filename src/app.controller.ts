import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  welcomeMessage(): string {
    const message = `
        <h1>Welcome to the Twitter Business Search (TBS) API!</h1>
        <p>A simple API for searching mention tweets about a Twitter business or user.</p>
        <p>A project built with the purpose of personal learning of tools like NestJS and the Twitter API.</p>
        <p>Its only objective is to retrieve tweets that mention a Twitter business or user based on query parameters.</p>
        <h2>How to use it</h2>
        <p>Just add the path "tweets" to the base URL and add the query parameters:</p>
        <ul>
            <li>business: the Twitter business or user to search for;</li>
            <li>max_results: the maximum number of results to return (default: 10, max: 100, min: 5).</li>
        </ul>
        <p>
            Example: 
            <a href="/tweets?business=Microsoft&max_results=10">
                /tweets?business=Microsoft&max_results=10
            </a>
        </p>
        <p>
            For more information, check the 
            <a href="https://evaristocosta.github.io/twitter-business-search/" target="_blank">
                GitHub repository page
            </a>.
        </p>
    `;
    return message;
  }
}
