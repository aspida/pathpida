/* eslint-disable */
// prettier-ignore
import type { Query as Query0 } from '../../../pages'
// prettier-ignore
import type { OptionalQuery as OptionalQuery1 } from '../../../pages/[pid]'
// prettier-ignore
import type { Query as Query2 } from '../../../pages/blog/[...slug]'

// prettier-ignore
export const pagesPath = {
  _a: (a: string | number) => ({
    b: {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
      })
    }
  }),
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery1, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
  }),
  aaa: {
    _bbb: (bbb: string[]) => ({
      ccc: {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash })
      }
    }),
    api: {
      samples: {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/api/samples' as const, hash: url?.hash })
      }
    }
  },
  blog: {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query2, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    hoge: {
      _fuga: (fuga?: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  x: {
    $url: (url?: { hash?: string }) => ({ pathname: '/x' as const, hash: url?.hash }),
    _y: (y: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash }),
      z: {
        $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash })
      }
    })
  },
  $url: (url: { query: Query0, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
