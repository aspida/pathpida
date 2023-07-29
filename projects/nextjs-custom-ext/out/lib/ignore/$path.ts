export const pagesPath = {
  "custom_ext": {
    "hello": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/custom-ext/hello' as const, hash: url?.hash })
    },
    "post": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/custom-ext/post/[id]' as const, query: { id }, hash: url?.hash })
      })
    }
  },
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    cc_png: '/bb/cc.png'
  },
  duplicate_json_0: {
    sample_json: '/duplicate-json/sample.json'
  },
  duplicate_json_1: '/duplicate.json',
  duplicate_json_2: '/duplicate_json'
} as const;

export type StaticPath = typeof staticPath;
