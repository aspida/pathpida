/* eslint-disable */
type Query0 = { hoge: string }

type OptionalQuery1 = { hoge: string }

type Query2 = { hoge: string }


export const pagesPath = {
  _pid: (pid: number | string) => ({
    $path: (query?: OptionalQuery1) => ({ path: '/:pid/' as const, params: { pid }, query })
  }),
  blog: {
    _slag: (slag: number | string) => ({
      $path: (query: Query2) => ({ path: '/blog/:slag/' as const, params: { slag }, query })
    })
  },
  $path: (query: Query0) => ({ path: '/' as const, query })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    cc_png: '/bb/cc.png'
  }
} as const

export type StaticPath = typeof staticPath
