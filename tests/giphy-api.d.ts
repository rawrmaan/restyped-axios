type LangCode =
  | 'es'
  | 'pt'
  | 'id'
  | 'fr'
  | 'ar'
  | 'tr'
  | 'th'
  | 'vi'
  | 'de'
  | 'it'
  | 'ja'
  | 'zh-CN'
  | 'zh-TW'
  | 'ru'
  | 'ko'
  | 'pl'
  | 'nl'
  | 'ro'
  | 'hu'
  | 'sv'
  | 'cs'
  | 'hi'
  | 'bn'
  | 'da'
  | 'fa'
  | 'tl'
  | 'fi'
  | 'iw'
  | 'ms'
  | 'no'
  | 'uk'

interface GIFObject {
  type: string
  id: string
  slug: string
  url: string
  bitly_gif_url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  rating: string
  caption: string
  content_url: string
  source_tld: string
  source_post_url: string
  import_datetime: string
  trending_datetime: string
  images: ImageObject
  meta: MetaObject
}

interface ImageObject {
  fixed_height: {
    url: string
    width: string
    height: string
    size: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
  }
  fixed_height_still: {
    url: string
    width: string
    height: string
  }
  fixed_height_downsampled: {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
  }
  fixed_width: {
    url: string
    width: string
    height: string
    size: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
  }
  fixed_width_still: {
    url: string
    width: string
    height: string
  }
  fixed_width_downsampled: {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
  }
  fixed_height_small: {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
  }
  fixed_height_small_still: {
    url: string
    width: string
    height: string
  }
  fixed_width_small: {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
  }
  fixed_width_small_still: {
    url: string
    width: string
    height: string
  }
  downsized: {
    url: string
    width: string
    height: string
    size: string
  }
  downsized_still: {
    url: string
    width: string
    height: string
  }
  downsized_large: {
    url: string
    width: string
    height: string
    size: string
  }
  original: {
    url: string
    width: string
    height: string
    size: string
    frames: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
  }
  original_still: {
    url: string
    width: string
    height: string
  }
}

interface MetaObject {
  msg: string
  status: number
  response_id: string
}

interface PaginationObject {
  offset: number
  total_count: number
  count: number
}

interface UserObject {
  avatar_url: string
  banner_url: string
  profile_url: string
  username: string
  display_name: string
  twitter: string
}

interface ChildPackObject {
  id: number
  parent: number
  type: 'community' | 'editorial'
  slug: string
  display_name: string
  short_display_name: string
  description: string
  banner_image: string
  has_children: boolean
  user: UserObject
  featured_gif: GIFObject
}

interface StickerPackMetadataObject {
  id: number
  display_name: string
  slug: string
  content_type: string
  short_display_name: string
  description: string
  banner_image: string
  has_children: boolean
  user: UserObject
  featured_gif: GIFObject
  tags: {tag: string; rank: number}[]
  ancestors: {
    id: number
    slug: string
    display_name: string
    short_display_name: string
    featured_gif_id: string
    parent: string
    has_children: boolean
    banner_image: string
  }[]
}

export interface GiphyAPI {
  '/gifs/search': {
    GET: {
      query: {
        api_key: string
        q: string
        limit?: number
        offset?: number
        rating?: string
        lang?: LangCode
        fmt?: string
      }
      response: {
        data: GIFObject[]
        pagination: PaginationObject
        meta: MetaObject
      }
    }
  }

  '/gifs/trending': {
    GET: {
      query: {
        api_key: string
        limit?: number
        offset?: number
        rating?: string
        fmt?: string
      }
      response: {
        data: GIFObject[]
        pagination: PaginationObject
        meta: MetaObject
      }
    }
  }

  '/gifs/translate': {
    GET: {
      query: {
        api_key: string
        s: string
      }
      response: {
        data: GIFObject[]
        meta: MetaObject
      }
    }
  }

  '/gifs/random': {
    GET: {
      query: {
        api_key: string
        tag?: string
        rating?: string
        fmt?: string
      }
      response: {
        data: GIFObject[]
        meta: MetaObject
      }
    }
  }

  '/gifs/:id': {
    GET: {
      params: {
        id: string
      }
      query: {
        api_key: string
      }
      response: {
        data: GIFObject[]
        meta: MetaObject
      }
    }
  }

  '/gifs': {
    GET: {
      query: {
        api_key: string
        ids: string
      }
      response: {
        data: GIFObject[]
        pagination: PaginationObject
        meta: MetaObject
      }
    }
  }

  '/stickers/search': {
    GET: {
      query: {
        api_key: string
        q: string
        limit?: number
        offset?: number
        rating?: string
        lang?: LangCode
        fmt?: string
      }
      response: {
        data: GIFObject[]
        pagination: PaginationObject
        meta: MetaObject
      }
    }
  }

  '/stickers/trending': {
    GET: {
      query: {
        api_key: string
        limit?: number
        rating?: string
        fmt?: string
      }
      response: {
        data: GIFObject[]
        meta: MetaObject
      }
    }
  }

  '/stickers/translate': {
    GET: {
      query: {
        api_key: string
        s: string
      }
      response: {
        data: GIFObject[]
        meta: MetaObject
      }
    }
  }

  '/stickers/random': {
    GET: {
      query: {
        api_key: string
        tag?: string
        rating?: string
        fmt?: string
      }
      response: {
        data: GIFObject[]
        meta: MetaObject
      }
    }
  }

  '/stickers/packs': {
    GET: {
      query: {
        api_key: string
      }
      response: {
        data: ChildPackObject[]
        meta: MetaObject
      }
    }
  }

  '/stickers/packs/:pack_id': {
    GET: {
      params: {
        pack_id: string
      }
      query: {
        api_key: string
        limit: number
        offset: number
      }
      response: {
        data: StickerPackMetadataObject[]
        meta: MetaObject
      }
    }
  }

  '/stickers/packs/:pack_id/stickers': {
    GET: {
      params: {
        pack_id: string
      }
      query: {
        api_key: string
        limit: number
        offset: number
      }
      response: {
        data: GIFObject[]
        pagination: PaginationObject
        meta: MetaObject
      }
    }
  }

  '/stickers/packs/:pack_id/children': {
    GET: {
      params: {
        pack_id: string
      }
      query: {
        api_key: string
      }
      response: {
        data: ChildPackObject[]
        meta: MetaObject
      }
    }
  }
}
