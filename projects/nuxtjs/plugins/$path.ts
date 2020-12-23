/* eslint-disable */
type Query0 = { hoge: string }

type OptionalQuery1 = { hoge: string }

type Query2 = { hoge: string }


export const pagesPath = {
  _pid: (pid: number | string) => ({
    $path: (query?: OptionalQuery1) => ({ path: '/:pid/', params: { pid }, query })
  }),
  blog: {
    _slag: (slag: number | string) => ({
      $path: (query: Query2) => ({ path: '/blog/:slag/', params: { slag }, query })
    })
  },
  $path: (query: Query0) => ({ path: '/', query })
}

export type PagesPath = typeof pagesPath
