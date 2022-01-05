[Versão em inglês](/twitter-business-search/)

TBS (Twitter Business Search) é um projeto construído com propósito pessoal de aprendizagem de ferramentas como NestJS e a API do Twitter.

Seu único objetivo é de buscar tweets que mencionem uma empresa ou usuário do Twitter baseado em parâmetros de consulta.

## Usando a API

TBS é gratuitamente disponível no Heroku e pode ser acessado através desta URL: [https://twitter-business-search.herokuapp.com/](https://twitter-business-search.herokuapp.com/).

Para fazer uma requisição, usa-se o endpoint:
```http
GET /tweets?business=BusinessUsername&max_results=10
```

| Parâmetros | Tipo | Descrição |

| ---------- | ---- | ---------- |
| `business` | string | **Requerido.** Nome de usuário (username) do Twitter para pesquisa |
| `max_results` | int | **Requerido.** Quantidade total de tweets (min: 5, max: 100) |

Uma resposta JSON é esperada, contendo a seguinte estrutura:

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

Desta, pode-se definir:

- `business_id`: id do usuário no Twitter;
- `business_name`: nome público do usuário no Twitter;
- `business_username`: nome de usuário (username) do usuário no Twitter;
- `mentions`: lista de tweets em que o usuário foi mencionado;
- `author_name`: nome do autor (usuário que mencionou o usuário pesquisado) ;
- `author_id`: id do autor;
- `author_username`: nome de usuário (username) do autor;
- `tweet_id`: id do tweet;
- `tweet_text`: texto do tweet.

## Exemplo

Poderia usar a API fazendo uma requisição GET HTTP para a URL base para pesquisar tweets mencionando Microsoft, por exemplo. Isso pode ser feito usando `curl` com o seguinte comando:

```shell
$ curl "https://twitter-business-search.herokuapp.com/tweets?business=Microsoft&max_results=10"
```

## Executando localmente (development)

Para executar este aplicativo localmente, você precisará instalar as seguintes dependências:

- Node (v17.3)
- Yarn (v3.1.1)
- NestJS (v8.1.6)

Então, clonar o repositório e executar o seguinte comando dentro do diretório do projeto:
```shell
$ yarn install
```

Crie um arquivo `.env` no diretório raiz do projeto, seguindo a estrutura setada em `.env.example`. Você precisará de um token de autorização (Bearer Token) do Twitter para executar o aplicativo ([mais informações aqui](https://developer.twitter.com/en)).

Depois disso, você pode executar o aplicativo usando o seguinte comando:
```shell
$ yarn start:dev
```
