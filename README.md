# Twitter Business Search

![GitHub top language](https://img.shields.io/github/languages/top/evaristocosta/twitter-business-search)
![GitHub package.json version](https://img.shields.io/github/package-json/v/evaristocosta/twitter-business-search)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/evaristocosta/twitter-business-search/CI)
![NestJS](https://img.shields.io/badge/-NestJS-red)
![Twitter API](https://img.shields.io/badge/API-Twitter-9cf)

A simple API for searching mention tweets about a Twitter business or user.

## Description

The TBS (Twitter Business Search) is a project built with the purpose of personal learning of tools like NestJS and the Twitter API.

Its only objective is to retrieve tweets that mention a Twitter business or user based on query parameters.

## Using the API

TBS is freely avaliable on Heroku and can be accessed through this URL: https://twitter-business-search.herokuapp.com/tweets.

Two query parameters must be present:

- `business`: the username to look for;
- `max_results`: total tweets to retrieve, respecting the range [5, 100].

A JSON response is expected, containing the following structure:

```json
{
  "business_id": "the user id",
  "business_name": "public name",
  "business_username": "Twitter username",
  "mentions": [
    {
      "author_name": "who have mentioned the user",
      "author_id": "numeric id",
      "author_username": "username from who mentioned",
      "tweet_id": "numeric tweet id",
      "tweet_text": "text of the tweet"
    },
    ...
  ]
}
```

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
