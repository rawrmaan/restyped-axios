import axios from '../index'
import {GiphyAPI} from './giphy-api'

const api = axios.create<GiphyAPI>({
  baseURL: 'http://api.giphy.com/v1'
})

api.get('/stickers/packs').then(res => {
  const packsWithChildren = res.data.data.filter(pack => pack.has_children)
  return packsWithChildren
})

api
  .request({
    url: '/gifs/search',
    params: {
      api_key: 'x',
      q: 'y'
    }
  })
  .then(res => {
    const data = res.data
    return data.pagination
  })
