# RESTyped Axios
Axios typings for consuming [RESTyped](/rawrmaan/restyped) APIs


## Usage

`npm install restyped-axios`

It's just like normal axios, except you'll need to provide a RESTyped API definition file for the API you want to use.

```typescript
import axios from 'restyped-axios'
import {GiphyAPI} from 'restyped-giphy-api'

const client = axios.create<GiphyAPI>({baseURL: 'http://api.giphy.com/v1'})

// You'll get a compile error if you call an invalid route or use incorrect query params. Yay!
client({
  url: '/gifs/trending',
  params: {
    api_key: 'Qr5fw...'
  }
}).then(...)

```

## Special cases

### GET with query params (e.g. `/gifs/trending?api_key=...`)

Use the `client({url: ..., params: ...})` syntax instead of `client.get` in order to have your params typechecked. See above.

### Routes with params in their paths (e.g. `/posts/:id/like`)

Explicitly declare the canonical route in angle brackets to avoid an invalid route error.

```typescript
client.post<'/posts/:id/like'>('/posts/3/like')
```
