/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  custom_ext: {
    hello: {
      $url: (url?: { hash?: string }) => ({ pathname: '/custom-ext/hello' as const, hash: url?.hash })
    },
    post: {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/custom-ext/post/[id]' as const, query: { id }, hash: url?.hash })
      })
    }
  },
}

// prettier-ignore
export type PagesPath = typeof pagesPath
