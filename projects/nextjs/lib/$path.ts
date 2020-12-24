/* eslint-disable */
import { Query as Query0 } from '../pages'
import { OptionalQuery as OptionalQuery1 } from '../pages/[pid]'
import { Query as Query2 } from '../pages/blog/[...slug]'

export const pagesPath = {
  _pid: (pid: string | number) => ({
    $url: (query?: OptionalQuery1) => ({ pathname: '/[pid]' as const, query: { pid, ...query } })
  }),
  blog: {
    _slug: (slug: (string | number)[]) => ({
      $url: (query: Query2) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...query } })
    }),
    hoge: {
      _fuga: (fuga?: (string | number)[]) => ({
        $url: () => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga } })
      })
    }
  },
  $url: (query: Query0) => ({ pathname: '/' as const, query })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    cc_png: '/bb/cc.png'
  }
} as const

export type StaticPath = typeof staticPath
