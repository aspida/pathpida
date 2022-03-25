export const pagesPath = {
  "custom_ext": {
    "_ignore": {
      $url: (url?: { hash?: string }) => ({ pathname: '/custom-ext/.ignore' as const, hash: url?.hash })
    },
    "hello": {
      $url: (url?: { hash?: string }) => ({ pathname: '/custom-ext/hello' as const, hash: url?.hash })
    },
    "post": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/custom-ext/post/[id]' as const, query: { id }, hash: url?.hash })
      })
    }
  },
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    _ignore: '/bb/.ignore',
    cc_png: '/bb/cc.png'
  },
  duplicate_json_0: {
    sample_json: '/duplicate-json/sample.json'
  },
  duplicate_json_1: '/duplicate.json',
  duplicate_json_2: '/duplicate_json'
} as const

export type StaticPath = typeof staticPath
