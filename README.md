# RESTyped Axios

Axios typings for consuming [RESTyped](https://github.com/rawrmaan/restyped) APIs

## Usage

`npm install restyped-axios`

_Note: >=2.0.0 supports TypeScript 2.8 and higher. Use a lower version if you need TypeScript 2.4-2.7 support._

It's just like normal axios, except you'll need to provide a RESTyped API definition file for the API you want to use.

```typescript
import axios from 'restyped-axios'
import {GiphyAPI} from 'restyped-giphy-api'

const client = axios.create<GiphyAPI>({baseURL: 'http://api.giphy.com/v1'})

// You'll get a compile error if you call an invalid route or use incorrect query params. Yay!
client.request({
  url: '/gifs/trending',
  params: {
    api_key: 'Qr5fw...'
  }
}).then(...)
```

## Special cases

### GET with query params (e.g. `/gifs/trending?api_key=...`)

Use the `client.request({url: ..., params: ...})` syntax instead of `client.get` in order to have your params typechecked. See above.

### Routes with params in their paths (e.g. `/posts/:id/like`)

Explicitly declare the canonical route in angle brackets to avoid an invalid route error.

```typescript
client.post<'/posts/:id/like'>('/posts/3/like')
```

## Popular APIs to try out

- Giphy API: [`restyped-giphy-api`](https://github.com/rawrmaan/restyped-giphy-api)
