/* eslint-disable */
import { Query as Query0 } from '../pages'
import { OptionalQuery as OptionalQuery1 } from '../pages/[pid]'
import { Query as Query2 } from '../pages/blog/[...slug]'

export const pagesPath = {
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery1, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
  }),
  aaa: {

  },
  blog: {
    _slug: (slug: (string | number)[]) => ({
      $url: (url: { query: Query2, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    hoge: {
      _fuga: (fuga?: (string | number)[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  $url: (url: { query: Query0, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    cc_png: '/bb/cc.png'
  }
} as const

export type StaticPath = typeof staticPath
