[PT-BR version](/twitter-business-search/pt-br)

The TBS (Twitter Business Search) is a project built with the purpose of personal learning of tools like NestJS and the Twitter API.

Its only objective is to retrieve tweets that mention a Twitter business or user based on query parameters.

## Using the API

TBS is freely avaliable on Heroku and can be accessed through this URL: [https://twitter-business-search.herokuapp.com/](https://twitter-business-search.herokuapp.com/).

To make a request, use the endpoint:
```http
GET /tweets?business=BusinessUsername&max_results=10
```

| Parameter | Type | Description |
| :---------- | :---- | :---------- |
| `business` | string | **Required**. Twitter username to be searched |
| `max_results` | int | **Required**. Total tweets to retrieve (min: 5, max: 100) |

A JSON response is expected, containing the following structure:

```javascript
{
  "business_id": int,
  "business_name": string,
  "business_username": string,
  "mentions": [
    {
      "author_name": string,
      "author_id": int,
      "author_username": string,
      "tweet_id": int,
      "tweet_text": string
    },
    ...
  ]
}
```

From it, you can define:

- `business_id`: id of the Twitter user;
- `business_name`: public name of the Twitter user;
- `business_username`: Twitter username of the Twitter user;
- `mentions`: list of tweets where the user was mentioned;
- `author_name`: name of the author (user that mentioned the searched user);
- `author_id`: id of the author;
- `author_username`: Twitter username of the author;
- `tweet_id`: id of the tweet;
- `tweet_text`: text of the tweet.

## Example

One could use the API making a GET HTTP request to the base URL to search tweets mentioning Microsoft, for example. This can be done using `curl` with the following command:

```shell
$ curl "https://twitter-business-search.herokuapp.com/tweets?business=Microsoft&max_results=10"
```

## Run locally (development)

To run this application locally, you will need to install the following dependencies:

- Node (v17.3)
- Yarn (v3.1.1)
- NestJS (v8.1.6)

Then, clone the repository and run the following command inside the project folder:
```shell
$ yarn install
```

Create a `.env` file at the root of the project, following the structure set on `.env.example`. You will need a Twitter API Bearer Token to run the application ([more information here](https://developer.twitter.com/en)).

After that, you can run the application using the following command:
```shell
$ yarn start:dev
```
